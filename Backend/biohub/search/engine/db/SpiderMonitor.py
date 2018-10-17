# coding=utf-8
import requests
import json
from bs4 import BeautifulSoup
from urllib.parse import urlencode
import re
import urllib.request

import datetime
import threading


def threaded(fun):
    def wrapper(*args, **kwargs):
        th = threading.Thread(target=fun, args=args, kwargs=kwargs, name=args[0].name)
        th.start()
        return th

    return wrapper


def extend(fun):
    def wrapper(spider, results, tasks, *args, **kwargs):
        stime = datetime.datetime.now()
        try:
            ret = fun(spider, *args, **kwargs)
        except Exception:
            ret = spider.output(-1)
        tasks[0] = tasks[0] - 1
        if (isinstance(ret, list)):
            for result in ret:
                results.append(result)
        else:
            results.append(ret)
        print('\t' + spider.name + ' ended after %d seconds' % (datetime.datetime.now() - stime).seconds)

    return wrapper


class RCSBCount:
    def __init__(self, keyword: str, timeout):
        super(RCSBCount, self).__init__()
        self.keyword = keyword
        self.name = 'rcsb'
        self.timeout = timeout

    @threaded
    @extend
    def get_info(self):
        query_text = """
            <orgPdbQuery>
            <queryType>org.pdb.query.simple.AdvancedKeywordQuery</queryType>
            <keywords>%s</keywords>
            </orgPdbQuery>""" % self.keyword
        data = query_text.encode('utf-8')
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        url = 'https://www.rcsb.org/pdb/rest/search'
        self.search_url = 'http://www.rcsb.org/pdb/search/navbarsearch.do?f=&q=%s' % self.keyword
        req = urllib.request.Request(url, data=data, headers=headers)
        result = urllib.request.urlopen(req, timeout=self.timeout).read()
        try:
            self.count = str(result).count('\\n')
        except Exception:
            self.count = 0
        return self.output(0)

    def output(self, error):
        if (not error):
            return {
                'title': 'RCSB',
                'url': self.search_url,
                'count': self.count,
            }
        else:
            return {
                'title': 'RCSB',
                'url': self.search_url,
                'count': error,
            }


class iGEMPartsCount:
    def __init__(self, keyword, timeout):
        super(iGEMPartsCount, self).__init__()
        self.keyword = keyword
        self.name = 'iGEM parts'
        self.timeout = timeout

    @threaded
    @extend
    def get_info(self):
        # 因为igem的query service(看起来是10年的一个参赛项目)已经挂掉了,    没办法用API获得模糊搜索的结果, 目前爬取的是原网站.
        url = 'http://parts.igem.org/Special:Search?search=%s' % self.keyword
        self.search_url = url
        headers = {
            'accept': 'text / html, application / xhtml + xml, application /    xml; q = 0.9, image / webp, image / apng, * / *;q = 0.8'
        }
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req, timeout=self.timeout).read()
        soup = BeautifulSoup(html, 'lxml')
        div = soup.find(attrs={'class': 'results-info'})
        try:
            self.count = int(div.find_all('strong')[-1].text)
        except Exception:
            self.count = 0
        return self.output(0)

    def output(self, error):
        if (not error):
            return {
                'title': 'iGEM Parts',
                'url': self.search_url,
                'count': self.count,
            }
        else:
            return {
                'title': 'iGEM Parts',
                'url': self.search_url,
                'count': error,
            }


class NLMCount:
    def __init__(self, keyword, timeout):
        super(NLMCount, self).__init__()
        self.keyword = keyword
        self.name = 'NLM'
        self.timeout = timeout

    @threaded
    @extend
    def get_info(self):
        url = 'https://ghr.nlm.nih.gov/search?query=%s&show=xml&count=1' % self.keyword
        xml = urllib.request.urlopen(url, timeout=self.timeout).read()
        soup = BeautifulSoup(xml, 'lxml')
        try:
            self.count = int(soup.find('search_results').attrs['count'])
        except Exception:
            self.count = 0
        return self.output(0)

    def output(self, error):
        if (not error):
            return {
                'title': 'NLM',
                'url': 'https://ghr.nlm.nih.gov/search?query=%s' % self.keyword,
                'count': self.count,
            }
        else:
            return {
                'title': 'NLM',
                'url': 'https://ghr.nlm.nih.gov/search?query=%s' % self.keyword,
                'count': error,
            }


class NCBICount:

    def __init__(self, term, timeout):
        self.term = term
        self.name = 'NCBI'
        self.timeout = timeout

    @threaded
    @extend
    def get_info(self):  # find all databases which are concerning with the item
        self.name_dic = {'gquery': 'All Databases', 'assembly': 'Assembly', 'biocollections': 'Biocollections',
                         'bioproject':
                             'BioProject', 'biosample': 'BioSample', 'biosystems': 'BioSystems', 'books': 'Books',
                         'clinvar': 'ClinVar',
                         'clone': 'Clone', 'cdd': 'Conserved Domains', 'gap': 'dbGaP', 'dbvar': 'dbVar',
                         'nucest': 'EST',
                         'gene': 'Gene', 'genome': 'Genome', 'gds': 'GEO DataSets', 'geoprofiles': 'GEO Profiles',
                         'nucgss':
                             'GSS', 'gtr': 'GTR', 'homologene': 'HomoloGene', 'ipg': 'Identical Protein Groups',
                         'medgen':
                             'MedGen', 'mesh': 'MeSH', 'ncbisearch': 'NCBI Web Site', 'nlmcatalog': 'NLM Catalog',
                         'nuccore':
                             'Nucleotide', 'omim': 'OMIM', 'pmc': 'PMC', 'popset': 'PopSet', 'probe': 'Probe',
                         'protein':
                             'Protein', 'proteinclusters': 'Protein Clusters', 'pcassay': 'PubChem BioAssay',
                         'pccompound':
                             'PubChem Compound', 'pcsubstance': 'PubChem Substance', 'pubmed': 'PubMed', 'pubmedhealth':
                             'PubMed Health', 'snp': 'SNP', 'sparcle': 'Sparcle', 'sra': 'SRA',
                         'structure': 'Structure',
                         'taxonomy': 'Taxonomy', 'toolkit': 'ToolKit', 'toolkitall': 'ToolKitAll', 'toolkitbookgh':
                             'ToolKitBookgh', 'unigene': 'UniGene'}

        url_query = 'https://eutils.ncbi.nlm.nih.gov/gquery' + '?term=' + self.term + '&retmode=xml'
        webdata = requests.get(url=url_query, timeout=self.timeout).text
        soup = BeautifulSoup(webdata, 'lxml')
        self.names = soup.select('dbname')
        self.nums = soup.select('count')

        return self.output(0)

    def output(self, error):
        results = []
        if (not error):
            result = {}

            for name, num in zip(self.names, self.nums):
                join_name = self.name_dic[name.get_text()]
                result['title'] = join_name
                try:
                    result['count'] = int(num.get_text())
                except Exception:
                    result['count'] = 0
                result['url'] = 'https://www.ncbi.nlm.nih.gov/' + name.get_text() + '/?term=' + self.term
                temp_results = json.dumps(result)
                join_result = json.loads(temp_results)
                results.append(join_result)
                result.clear()
            return results
        else:
            for key in self.name_dic.keys():
                results.append(
                    {
                        'title': self.name_dic[key],
                        'count': error,
                        'url': 'https://www.ncbi.nlm.nih.gov/' + key + '/?term=' + self.term
                    }
                )
            return results


class UniProtCount:

    def __init__(self, keyword: str, timeout):
        self.keyword = keyword
        self.name = 'UniProt'
        self.timeout = timeout

    @threaded
    @extend
    def get_info(self):
        query_string = urlencode({'query': self.keyword})
        self.query_url = 'https://www.uniprot.org/uniprot/?%s&sort=score' % query_string
        response = requests.get(self.query_url, timeout=self.timeout)
        bs = BeautifulSoup(response.content, features='html.parser')
        try:
            self.count = int(re.findall("\d+", bs.find('div', class_='main-aside').find('script').text)[0])
        except Exception:
            self.count = 0
        return self.output(0)

    def output(self, error):
        if (not error):
            return {
                'title': 'UniProt',
                'url': self.query_url,
                'count': self.count,
            }
        else:
            return {
                'title': 'UniProt',
                'url': self.query_url,
                'count': error,
            }


class TaxonomyCount:

    def __init__(self, keyword: str, timeout):
        self.keyword = keyword
        self.name = 'Taxonomy'
        self.timeout = timeout

    @threaded
    @extend
    def get_info(self):
        query_string = urlencode({'query': self.keyword})
        self.query_url = 'https://www.uniprot.org/taxonomy/?%s&sort=score' % query_string
        response = requests.get(self.query_url, timeout=self.timeout)
        bs = BeautifulSoup(response.content, features='html.parser')
        try:
            self.count = int(re.findall("\d+", bs.find('div', class_='main-aside').find('script').text)[0])
        except Exception:
            self.count = 0
        return self.output(0)

    def output(self, error):
        if (not error):
            return {
                'title': 'Taxonomy',
                'url': self.query_url,
                'count': self.count
            }
        else:
            return {
                'title': 'Taxonomy',
                'url': self.query_url,
                'count': error
            }


condition = threading.Condition()


class SpiderMonitor:
    name = 'SpiderMonitor'
    all_spiders = [iGEMPartsCount, RCSBCount, NLMCount, NCBICount, UniProtCount, TaxonomyCount]

    def __init__(self):
        self.results = []
        self.tasks = [0]
        self.thread_pool = []

    def __crawl(self):
        # each spider should be wrapped by the wrappers 'threaded' and 'extend'
        self.tasks[0] = len(self.all_spiders)
        for spider in self.all_spiders:
            th = spider(self.keyword, self.delay).get_info(self.results, self.tasks)
            self.thread_pool.append(th)

    def __end(self):
        for th in self.thread_pool:
            th.join()

    @threaded
    def __check_finished(self):
        while True:
            if (self.tasks[0] == 0 or not threading.main_thread().is_alive()):
                if (condition.acquire()):
                    condition.notify()
                    condition.release()
                    print('All work finished.')
                    return

    def __not_timeout(self):
        if (condition.acquire()):
            return condition.wait(timeout=self.delay)

    def __run(self):
        self.stime = datetime.datetime.now()
        self.__crawl()
        self.__check_finished()

        if (not self.__not_timeout()):
            print(self.timeout_msg)

        # self.__end()
        condition.release()
        return self.results

    # 主要API, 工作模式: 为每个爬虫创建一个线程并行抓取网站的内容, 另外创建一个线程(__check_finished)判断是否所有的爬虫都完成工作. 主进程等待
    # check_finished线程发出完成的信号或者timeout, 信号发出或者timeout时主进程发出一次结果, 然后退出. 爬虫也会在timeout的两倍时间(因为网络请
    # 求API的timeout项控制的是连接建立的timeout和传输数据的timeout两部分, 而不是整个过程)内全部退出. 另外当爬虫遇到异常时会主动返回结果, 约定此时结果中的count是-1.
    def spiders(self, keyword='', timeout=5):
        self.keyword = keyword
        self.delay = timeout
        self.timeout_msg = '%d seconds time out.' % timeout
        return self.__run()


if __name__ == '__main__':
    print(SpiderMonitor().spiders(keyword='p53', timeout=20))