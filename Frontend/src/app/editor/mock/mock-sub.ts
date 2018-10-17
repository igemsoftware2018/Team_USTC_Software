import { EditorSubroutineHeader } from '../headers/steps';

export let mockSub: Array<EditorSubroutineHeader> = [
    {
        id: '1',
        name: 'Gel Extraction',
        desc: 'Gel Extraction',
        steps: ['9', '2', '2', '5', '1', '3', '2',
                '1', '3', '6', '1', '7', '5', '2',
                '7', '1', '8'],
        default: [
            {'Text': 'Cut off the Gel part containing the target band and weigh the cut off Gel part'},
            {'Volume': '@v1', 'Name': 'Buffer B2', 'Notes': '300 times weight of Gel'},
            {'Name': 'isopropanol', 'Volume': '@v2', 'Notes': '1/3 volume of the Buffer B2'},
            {'container2': 'adsorption column', 'container1': 'EP tube', 'name': 'solution'},
            {'Speed': '11000', 'Time': '30'},
            {'option': 'filtrate'},
            {'Name': 'wash solution', 'Volume': '500', 'container': 'adsorption column'},
            {'Speed': '12000', 'Time': '30'},
            {'option': 'filtrate'},
            {'last': '3', 'times': '1'},
            {'Speed': '12000', 'Time': '60'},
            {'Time': '10', 'Notes': 'Waiting for wash solution evaporate spontaneously'},
            {'name': 'adsorption column', 'container1': 'old EP tube', 'container2': 'new EP tube'},
            {'Name': 'ddH20', 'Volume': '20', 'container': 'adsorption column'},
            {'Time': '10'},
            {'Speed': '12000', 'Time': '60'},
            {'container': 'EP tube', 'Temp': '4', 'Time': '24'}
        ],
    },
    {
        id: '2',
        name: 'purification of PCR product',
        desc: 'purification of PCR product',
        steps: ['2', '2', '4', '5', '1', '3', '2', '1',
                '3', '6', '1', '7', '5', '2', '7', '1', '8'],
        default: [
            {'Name': 'Buffer B3', 'Volume': '225'},
            {'Name': 'PCR product', 'Volume': '25'},
            {'option': 'mix_up'},
            {'name': 'solution', 'container1': 'EP tube', 'container2': 'adsorption column'},
            {'Speed': '11000', 'Time': '30'},
            {'option': 'filtrate'},
            {'Name': 'wash solution', 'Volume': '500', 'container': 'adsorption column'},
            {'Speed': '12000', 'Time': '30'},
            {'option': 'filtrate'},
            {'last': '3', 'times': '1'},
            {'Speed': '12000', 'Time': '30'},
            {'Time': '10', 'Notes': 'Waiting for wash solution evaporate spontaneously'},
            {'name': 'adsorption column', 'container1': 'old EP tube', 'container2': 'new EP tube'},
            {'Name': 'ddH20', 'Volume': '20', 'container': 'adsorption column'},
            {'Time': '10'},
            {'Speed': '12000', 'Time': '30'},
            {'container': 'EP tube', 'Temp': '4', 'Time': '24'}
        ],
    },
    {
        id: '3',
        name: 'Plasmid Extraction',
        desc: 'Plasmid Extraction',
        steps: ['2', '1', '3', '6', '2', '4', '2', '4', '7', '2',
                '4', '1', '5', '1', '3', '2', '1', '3', '2',
                '1', '3', '6', '1', '7', '5', '2', '7', '1', '8'],
        default: [
            {'Name': 'bacterium solution', 'Volume': '1500'},
            {'Speed': '11000', 'Time': '120'},
            {'option': 'supernatant'},
            {'last': '3', 'times': '2'},
            {'Name': 'Buffer P1', 'Volume': '250'},
            {'option': 'resuspend'},
            {'Name': 'Buffer P2', 'Volume': '250'},
            {'option': 'mix_up'},
            {'Time': '3'},
            {'Name': 'Buffer P3', 'Volume': '350'},
            {'option': 'mix_up'},
            {'Speed': '13400', 'Time': '600'},
            {'Name': 'supernatant', 'container1': 'EP tube', 'container2': 'adsorption column'},
            {'Speed': '11000', 'Time': '30'},
            {'option': 'filtrate'},
            {'Name': 'Buffer DW1', 'Volume': '500', 'container': 'adsorption column'},
            {'Speed': '12000', 'Time': '30'},
            {'option': 'filtrate'},
            {'Name': 'Wash Solution', 'Volume': '500', 'container': 'adsorption column'},
            {'Speed': '12000', 'Time': '30'},
            {'option': 'filtrate'},
            {'last': '3', 'times': '1'},
            {'Speed': '12000', 'Time': '60'},
            {'Time': '10', 'Notes': 'Waiting for wash solution evaporate spontaneously'},
            {'Name': 'supernatant', 'container1': 'old EP tube', 'container2': 'new EP tube'},
            {'Name': 'ddH2O', 'Volume': '50', 'container': 'adsorption column'},
            {'Time': '10', 'Temp': '50'},
            {'Speed': '12000', 'Time': '60'},
            {'container': 'EP tube', 'Temp': '4', 'Time': '∞',
             'Notes': 'Measure the OD A260/A280, OD A260/A230 and the density of plasmids after extraction'},
        ],
    }
];

const mockSub_6 = new EditorSubroutineHeader();
mockSub_6.id = '6';
mockSub_6.name = 'Test env';
mockSub_6.desc = 'Test env';
mockSub_6.steps = ['12'];
mockSub_6.default = [
    {'test': '@proc'},
];

const mockSub_1: EditorSubroutineHeader = {
    id: '1',
    name: 'Single digestion(8h)',
    desc: 'Single digestion(8h)',
    steps: ['2', '2', '2', '4', '9'],
    default: [
        {'Name': 'template'},
        {'Name': 'buffer'},
        {'Name': 'enzyme'},
        {'Type': '摇晃'},
        {'Num': '37'},
    ]
};

const mockSub_2: EditorSubroutineHeader = {
    id: '2',
    name: 'Single digestion(30min)',
    desc: 'Single digestion(30min)',
    steps: ['2', '2', '2', '2', '2', '4', '9'],
    default: [
        {'Name': 'template'},
        {'Name': 'template'},
        {'Name': 'buffer'},
        {'Name': 'ligase'},
        {'Name': 'ddH20'},
        {},
        {'Num': '37'},
    ],
};


const mockSub_3: EditorSubroutineHeader = {
    id: '3',
    name: 'Dpuble digestion',
    desc: 'Dpuble digestion',
    steps: ['2', '2', '2', '2', '2', '4', '9'],
    default: [
        {'Name': 'enzyme1'},
        {'Name': 'enzyme2'},
        {'Name': 'ddH2O'},
        {'Name': 'buffer'},
        {'Name': 'template'},
        {},
        {'Num': '37'},
    ],
};

