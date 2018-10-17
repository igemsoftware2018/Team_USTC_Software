import time

class TimeParser:

    T1 = (2017, 1, 23, 8, 15, 30, 0, 0, 0)
    T2 = (2018, 10, 30, 9, 27, 40, 0, 0, 0)
    T3 = (2018, 10, 12, 6, 0, 0, 0, 0, 0)
    T4 = (2018, 10, 12, 23, 59, 59, 0, 0, 0)

    def __init__(self, s):
        self.s = s

    def duration(self, t1, t2):
        return {
            "start": time.mktime(t1),
            "end": time.mktime(t2)
        }

    def _fake_parse(self, s):
        if "from" in s:
            # from T1 to T2
            return self.duration(self.T1, self.T2)
        if "on":
            # on T
            return self.duration(self.T3, self.T4)
        return self.duration(self.T3, self.T4)

    def parse(self):
        return self._fake_parse(self.s)