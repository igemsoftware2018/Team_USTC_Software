// 这里是文章的定义

export class ReportStepsHeader {
    idx: number; // 废弃
    id: string;
    name: string; // 类型 对应 EditorSubroutine 中的id
    data: any;
    ico: string;
    yield_method?: string;

    temp?: string; // 删除
    fields?: any; // 删除
    desc: string; // 删除
    remark: string;
}

// subroutine 类型

export enum subType {
    steps = 'Steps',
    info = 'Info',
    result = 'Result',
    pictures = 'Pictures',
    list = 'List',
    text = 'Text',
    table = 'Table',
}

export class ReportSubroutineHeader {
    id: string; // 类型 对应 EditorStep 中的id
    name: string;
    subType: subType; // 废弃
    idx: number; // 位置，废弃
    steps?: Array<ReportStepsHeader>; // 包含的step
    desc?: string; // 废弃
    list?: ReportListHeader[]; // 废弃
    remark?: string; // 废弃
    pic?: Array<ReportGraphHeader>; // 废弃
    table?: any[]; // 废弃

    constructor() {
        this.subType = subType.steps;
    }
}

export class ReportResultHeader {
    subType: subType;
    desc?: string;
    list?: ReportListHeader[];
    remark?: string; // 废弃
    pic?: Array<ReportGraphHeader>;
    table?: any[];
}


export class ReportHeader {
    // 元数据部分
    id: number; // 约定 id 是 0 就新建
    title: string;  // 标题
    author: string[];   // 作者
    mdate: string;  // 修改时间 后端
    ndate: string;  // 创建时间 后端
    introduction: string;   // 介绍
    material?: string[];
    envs: {};
    result: ReportResultHeader[]; // 结果部分
    label: string[];    // 标签部分
    subroutines: Array<ReportSubroutineHeader>;
    constructor () {}
}


// 图片

export class ReportGraphHeader {
    name: string;
    url: string;

    constructor(url: string, name?: string) {
        this.name = name ? name : '';
        this.url = url;
    }
}

export class ReportListHeader {
    str: string;
    idx: number;
}
