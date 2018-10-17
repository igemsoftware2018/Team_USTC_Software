export class Report {
    constructor (
        public id: number,
        public praises?: Array<number>,
        // 点赞的用户主键
        public title?: string,
        public abstract?: string,
        // 摘要
        public lable?: Array<number>,
        // 标签
        public comment?: Array<number>
    ) { }
}
