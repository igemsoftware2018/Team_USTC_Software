// This is the step of the article

export class EditorStepHeader {
    id: string; // ID 号码
    ico: string; // 标题 url
    name: string;
    desc: string; // step 描述
    template: string; // 模板
    yield_method: string;
    material?: Array<string>;
}

// This is the step of the article


export class EditorSubroutineHeader {
    id: string; // ID 号码
    ico?: string; // 标题 url
    name: string;
    default: any[];
    desc: string; // Subroutine 描述
    steps: Array<string>; // 包含的 step id
    yield_method?: string;
    constructor () {
        this.default = [];
    }
}
