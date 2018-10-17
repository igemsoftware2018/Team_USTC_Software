class BlastParser:
    def __init__(self, s):
        self.s = s

    def _fake_parse(self, s):
        return True

    def parse(self, s):
        return self._fake_parse(self.s)