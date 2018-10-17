class LabelParser:
    
    def __init__(self, s):
        self.s = s

    def _fake_parse(self, s):
        return "some_label"

    def parse(self):
        return self._fake_parse(self.s)