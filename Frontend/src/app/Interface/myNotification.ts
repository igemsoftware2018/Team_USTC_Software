enum NotificationAction {
    praise,
    follow,
    compose
}

export class MyNotification {
    constructor (
        public id: number,
        // 通知主键
        public isread?: boolean,
        // 已读？
        public content?: NotificationAction,
        public time?: Date,
        // 发送时间
        public to?: number
        // 发送对象主键
    ) { }
}
