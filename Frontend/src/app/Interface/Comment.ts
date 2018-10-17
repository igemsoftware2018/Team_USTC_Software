export class Comment {
    constructor (
        public id: number,
        public from: number,
        // 评论者id
        public to: number,
        // 报告id
        public content?: string
    ) { }
}
