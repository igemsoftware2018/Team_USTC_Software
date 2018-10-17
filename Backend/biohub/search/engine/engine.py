from .parser import PeopleParser, TimeParser, LabelParser
import re

def test(debug=None):
    s = "reports by some_people from 2017/01/23 to 2018/10/28 #some_label"
    time_parser = TimeParser(s)
    people_parser = PeopleParser(s)
    label_parser = LabelParser(s)
    filters = {
        "time": time_parser.parse(),
        "people": people_parser.parse(),
        "label": label_parser.parse()
    }

    data = {
        "users" : [],
        "reports" : [],
    }

    ranks = {
        "users": 1,
        "reports": 2,
        "db": -1,
    }

    return {
        "filters": filters,
        "ranks": ranks,
        "data": data,
        "debug": debug
    }


class EngineBase:
    type = 'base'

    def __init__(self, s):
        self.s = s

    def _result(self):
        return []

    def _rank(self):
        return -1

    def result(self):
        return {
            "type": self.type,
            "rank": self._rank(),
            "data": self._result()
        }


class EngineUser(EngineBase):
    type = 'user'

    def _rank(self):
        return 1

    def _result(self):
        return [{"id":1,"followed":False,"stat":{"star_count":0,"report_count":17,"following_count":10,"follower_count":6,"experience_count":0},"avatar_url":"https://api.biohub.tech/media/2.jpg","last_login":"2018-10-16T22:37:00.808568+08:00","username":"test","actualname":"","organization":"MIT","email":"test@email.com","location":"Boston","site_url":"","description":"description"},
{"id":2,"followed":False,"stat":{"star_count":0,"report_count":0,"following_count":2,"follower_count":3,"experience_count":0},"avatar_url":"https://www.gravatar.com/avatar/94fba03762323f286d7c3ca9e001c541?s=328&r=g&d=identicon","last_login":"2018-10-12T15:55:23.252976+08:00","username":"test1","actualname":"","organization":"","email":"test1@test.com","location":"","site_url":"","description":""}]


class EngineReport(EngineBase):
    type = 'report'

    def _rank(self):
        return 2

    def _result(self):
        return [
{"id":16,"title":"16","author":{"id":1,"avatar_url":"https://api.biohub.tech/media/2.jpg","description":"description","followed":False,"username":"test"},"iscollected":False,"abstract":"WOASN DJFAS\nsanifoanf","commentsnum":13,"labels":[{"id":12,"report_count":1,"name":"hello"},{"id":13,"report_count":1,"name":"babababababa"},{"id":14,"report_count":1,"name":"fhdksjhfkjdsahfkjsadhkjfhsdakj"}],"likesnum":0,"isliked":False},
{"id":4,"title":"asdfbaisdf","author":{"id":1,"avatar_url":"https://api.biohub.tech/media/2.jpg","description":"description","followed":False,"username":"test"},"iscollected":False,"abstract":"fasbdfhjabef","commentsnum":5,"labels":[],"likesnum":2,"isliked":False}]


class EngineDB(EngineBase):
    type = 'db'

    def _rank(self):
        if self._check():
            return 4
        else:
            return -1

    def _check(self):
        return len(self.s.split()) == 1 and len(self.s) < 50

    def _result(self):
        if not self._check(): return []
        from .db.SpiderMonitor import SpiderMonitor
        result = SpiderMonitor().spiders(keyword=self.s, timeout=5)
        return result

class EngineBLAST(EngineBase):
    type = 'blast'

    def _check(self):
        return len(self.s.split()) == 1 and len(self.s) > 100 and set("ATCG") == set(self.s.upper())

    def _rank(self):
        if self._check():
            return 0
        else:
            return -1

    def _result(self):
        return []

class FilterType:
    TIME = 'time'
    TITLE = 'title'
    NAME = 'name'
    ADDR = 'addr'
    USER = 'user'
    LABEL = 'label'


class FilterRel:
    # scales & time
    EQ = 'eq'
    GT = 'gt'
    LT = 'lt'
    # like
    LIKE = 'like'
    # in
    IN = 'in'


class FilterItem:
    def __init__(self, type, rel, value):
        self.type = type
        self.rel = rel
        self.value = value

    def data(self):
        return {
            "type": self.type,
            "rel": self.rel,
            "value": self.value
        }


class Filters:
    def __init__(self, s):
        self.s = s
        self.__filters = list()

    def add_filter(self, filter):
        if filter: self.__filters.append(filter)

    def rule_user_in_address(self):
        p = re.compile(r'users? in (\w+)', re.I)
        match_obj = p.search(self.s)
        if match_obj:
            addr = match_obj.group(1)
            self.add_filter(FilterItem(FilterType.USER, FilterRel.IN, addr))

    def rule_reports_by_user(self):
        p = re.compile(r'reports? by (\w+)', re.I)
        match_obj = p.search(self.s)
        if match_obj:
            user = match_obj.group(1)
            self.add_filter(FilterItem(FilterType.USER, FilterRel.EQ, user))

    def rule_label(self):
        p = re.compile(r'#(\w+)', re.I)
        match_obj = p.search(self.s)
        if match_obj:
            label = match_obj.group(1)
            self.add_filter(FilterItem(FilterType.LABEL, FilterRel.EQ, label))

    def _mktime(self, t):
        import time
        t = float(t)
        local_str_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(t / 1000.0))
        return local_str_time

    def rule_time(self):
        if len(self.s.split()) <= 1:
            return None
        try:
            from .nlp.nlp import parse
            start, end, match = parse(self.s)
            self.add_filter(FilterItem(FilterType.TIME, FilterRel.GT, self._mktime(start)))
            self.add_filter(FilterItem(FilterType.TIME, FilterRel.LT, self._mktime(end)))
        except:
            return

    def filters(self):
        self.rule_label()
        self.rule_reports_by_user()
        self.rule_user_in_address()
        self.rule_time()
        f = self.__filters
        f = [x.data() for x in f]
        return f


class Engine:
    def __init__(self, s):
        self.s = s

    def _filters(self):
        filters = Filters(self.s).filters()

        return filters

    def _result(self):
        data = list()

        data.append(EngineUser(self.s).result())
        data.append(EngineReport(self.s).result())
        data.append(EngineDB(self.s).result())
        data.append(EngineBLAST(self.s).result())

        return data

    def get_debug(self):
        return self.s

    def data(self):
        data = {
            "filters": self._filters(),
            "data": self._result(),
            "debug": self.get_debug()
        }
        return data


def main():
    pass

if __name__ == "__main__":
    main()