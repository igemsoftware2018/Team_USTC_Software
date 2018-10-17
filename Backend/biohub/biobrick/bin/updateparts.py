#!/usr/bin/env python

import os
import sys
import functools
import argparse
import pymysql
import pymysql.err
import pymysql.constants.ER
import pymysql.cursors
import re
import json

seq_features_re = re.compile(
    r"var\s+seqFeatures\s+=\s+new\s+Array\((?P<seq_features>.+?)\);"
)
sub_part_re = re.compile(
    r"new\s+Part\s(?P<sub_part>\(.+?\))[,\)]"
)
ac_re = re.compile(
    r"<li\s+class='boxctrl\s+box_(?P<color>green|red)'>(?P<RFC>\d+)",
    re.IGNORECASE
)


make_path = functools.partial(os.path.join, os.path.dirname(__file__))


def _display_error(exc, abort=True):
    """
    Displays error message of `exc`.
    If `abort` was set to `True`, the script will be aborted.
    """
    print(exc.args[1])
    if abort:
        sys.exit(1)


def _check_error(exc, detail):
    """
    Check if error code of `exc` equals to constant `pymysql.constants.ER.<detail>`.
    If yes, displays error message and aborts the script.
    """
    if exc.args[0] == getattr(pymysql.constants.ER, detail):
        _display_error(exc)


def no_table(exc):
    _check_error(exc, 'NO_SUCH_TABLE')


connection = None


def make_connection(args):
    """
    Factory function to create and return a connection object.

    `args` is the parsed result from main arguments parser.
    """

    try:
        return pymysql.connect(
            host=args.host,
            port=args.port,
            user=args.user,
            password=args.password,
            db='igem',
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )
    except pymysql.err.DatabaseError as e:
        _display_error(e)


def prepare_table(args):
    """
    To ensure the table structure was prepared.
    """

    with connection.cursor() as cursor:
        try:
            print('Checking if `parts_filtered` exists...')
            cursor.execute("DESCRIBE parts_filtered")
            structures = cursor.fetchall()
        except pymysql.err.ProgrammingError as e:
            existence = False
            print('`parts_filtered` does not exist')
        else:
            existence = True
            print('`parts_filtered` exists')

        if not existence or args.force_rebuild_table:
            print(
                'Rebuilding `parts_filtered` due to {}...'.format(
                    'non-existence'
                    if not existence
                    else '`force-rebuild-table` flag'
                )
            )

            print('Reinstalling stored procedure...')
            return_code = os.system(' '.join([
                'mysql',
                '-h{}'.format(args.host),
                '-P{}'.format(args.port),
                '-u{}'.format(args.user),
                '-p{}'.format(args.password) if args.password else '',
                '<',
                make_path('..', 'sql', 'igem', 'preprocess.sql')
            ]))
            if return_code != 0:
                print('Stored procedure installation failed with exit code {}'.format(return_code))
                sys.exit(return_code)

            print('Stored procedure installed')
            cursor.execute('CALL filter_parts')
        else:
            fields = {'ruler', 'ac'}
            wrong_types = [x['Field'] for x in structures if x['Field'] in fields and x['Type'] != 'longtext']

            if wrong_types:
                print("Fields %s have wrong types, dropping..." % ', '.join(wrong_types))
                for field in wrong_types:
                    cursor.execute('ALTER TABLE parts_filtered DROP COLUMN %s' % field)

            missing = fields - set(x['Field'] for x in structures)

            if missing:
                print('Fields %s missing, altering table...' % ', '.join(missing))
                for field in missing:
                    cursor.execute("ALTER TABLE parts_filtered ADD COLUMN %s longtext" % field)

    connection.commit()
    print('Table structure prepared')


def iterate_table(chunk, force):
    """
    The generator fetches and yields `chunk` rows at a time, until the result set exhausts.

    If `force` was set to `True`, fields `ruler` and `ac` will not be fetched.
    """

    SQL = """
    SELECT `part_id`, `seq_edit_cache` {} FROM parts_filtered ORDER BY `part_id`
    """.format(', `ruler`, `ac`' if not force else '')

    with connection.cursor() as cursor:
        cursor.execute(SQL)
        while True:
            result = cursor.fetchmany(chunk)
            if not result:
                break
            yield result


def build_seq_features(string):
    return [
        dict(zip('type first last label reverse'.split(), item))
        for item in eval('[%s]' % string)
    ]


def build_sub_parts(strings):
    return [
        dict(zip('id short_name nick_name icon_url'.split(), eval(item)))
        for item in strings
    ]


def build_ac(items):
    return {
        rfc: color == 'green'
        for color, rfc in items
    }


def process(data, force, connection):
    """
    The function iterates, parses each row specified in `data`, and stores the
    processed results back.

    If `force` was set to `False`, processed rows will be skipped.

    `connection` will be used to update table and should not be identical as the
    one used for fetching.
    """
    if not data:
        return

    print('Processing parts %s ~ %s...' % (data[0]['part_id'], data[-1]['part_id']))

    with connection.cursor() as cursor:
        for item in data:

            if not force and item['ruler'] and item['ac']:
                continue

            html = item['seq_edit_cache'] or ''
            ruler = {
                'seq_features': build_seq_features(
                    (seq_features_re.findall(html) or [''])[0]
                ),
                'sub_parts': build_sub_parts(sub_part_re.findall(html)),
                'part_id': item['part_id']
            }
            ac = build_ac(ac_re.findall(html))

            cursor.execute(
                "UPDATE parts_filtered SET `ruler`=%s, `ac`=%s, `has_subpart`=%s, `ac_w`=%s WHERE `part_id`=%s",
                (
                    json.dumps(ruler),
                    json.dumps(ac),
                    1 if ruler['sub_parts'] else 0,
                    sum(ac.values()) / len(ac),
                    item['part_id']
                )
            )

    connection.commit()


def main(args):

    global connection
    connection = make_connection(args)
    prepare_table(args)

    update_connection = make_connection(args)
    for data in iterate_table(args.chunk, args.force):
        process(data, args.force, update_connection)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='The script iterates table `parts`, parses `seq_edit_cache` of '
        'each row and stores the results in `ruler` and `ac` fields.'
    )
    parser.add_argument(
        '--host',
        dest='host',
        default='localhost',
        help='host of database, default to "localhost"'
    )
    parser.add_argument(
        '--port', '-p',
        dest='port',
        type=int, default=3306,
        help='port of database, default to 3306'
    )
    parser.add_argument(
        '--user', '-u',
        dest='user',
        default='root',
        help='user name of database, default to "root"'
    )
    parser.add_argument(
        '--password', '-pw',
        dest='password',
        default='',
        help='password of database, default to empty string'
    )
    parser.add_argument(
        '--chunk', '-c',
        dest='chunk',
        type=int, default=300,
        help='numbers of items fetched from database at a time, default to 300'
    )
    parser.add_argument(
        '--force', '-f',
        dest='force',
        action='store_true', default=False,
        help='if set, the script will parse all rows, otherwise it will skip '
        'processed rows'
    )
    parser.add_argument(
        '--force-rebuild-table', '-frt',
        dest='force_rebuild_table', action='store_true', default=False
    )

    main(parser.parse_args())
