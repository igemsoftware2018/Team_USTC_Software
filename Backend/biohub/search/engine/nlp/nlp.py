from jpype import *
import tempfile
import os

stanford_path = '/root/NLP/stanford-corenlp/'
jars = ['ejml-0.23.jar', 'javax.activation-api-1.2.0.jar', 'javax.activation-api-1.2.0-sources.jar', 'javax.json-api-1.0-sources.jar', 'javax.json.jar', 'jaxb-api-2.4.0-b180830.0359.jar', 'jaxb-api-2.4.0-b180830.0359-sources.jar', 'jaxb-core-2.3.0.1.jar', 'jaxb-core-2.3.0.1-sources.jar', 'jaxb-impl-2.4.0-b180830.0438.jar', 'jaxb-impl-2.4.0-b180830.0438-sources.jar', 'joda-time-2.9-sources.jar', 'joda-time.jar', 'jollyday-0.4.9-sources.jar', 'jollyday.jar', 'protobuf.jar', 'slf4j-api.jar', 'slf4j-simple.jar', 'stanford-corenlp-3.9.2.jar', 'stanford-corenlp-3.9.2-javadoc.jar', 'stanford-corenlp-3.9.2-models.jar', 'stanford-corenlp-3.9.2-sources.jar', 'xom-1.2.10-src.jar', 'xom.jar']

classpath=':'.join([stanford_path + jar for jar in jars])+':'+'/root/NLP'
jpath = getDefaultJVMPath()

def JVM_init():
    if not isJVMStarted():
        startJVM(jpath, '-ae', '-Djava.class.path=%s' % (classpath))

    if not isThreadAttachedToJVM():
        attachThreadToJVM()

def parse(text):
    JVM_init()
    BiohubNLP = JClass('BiohubNLP')
    start, end, match = BiohubNLP.Parse(text)
    start = start[:]
    end = end[:]
    match = match[:]
    return start, end, match

if __name__ == "__main__":
    #print(parse("I will leave for the US next month."))
    print(parse("yesterday"))