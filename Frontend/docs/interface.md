# Interface
**version:1.0.1**
>为了方便后端使用更新资源请求，不区别PATCH和PUT,由后端判断后使用

# 响应类
**定义**
```typescript
class MyResponse<T> {
    meta: {
        success: boolean,
        message: string
    };
    data: Array<T>;
    // 使用数组装起来
}
```

# 用户类
**定义**
```typescript
class User {
    constructor (
        public id: number,
        public username?: string,
        public actualname?: string,
        public location?: string,
        public organization?: string,
        public email?: string,
        public img?: string,
        // 头像
        public about_me?: string,
        // 关于我
        public info?: {
            followings: Array<number>;
            // 本用户关注的主键列表
            followers: Array<number>;
            // 关注本用户的主键列表
            praises: Array<number>;
            // 被点赞列表
            reports: Ａrray<number>;
            // 报告列表
        },
        public collections: Array<number>;
        // 收藏列表
        public favourites: Array<number>;
        // 自己点赞列表
    ) { }
    // 声明构造函数和公有属性，并在使用时初始化
}
let response = new MyResponse<User>();
let user = new User(1);
// 进行一些操作之后
let UserData = JSON.stringify([user]); 
let ResponseData = JSON.stringify(response);
```

**请求方法**

|URL|Method|Request|Response|Description|
|:--:|:--:|:--:|:--:|:--:|
|./users|GET|null|ResponseData|管理员查看所有用户|
|./users|POST|idUserData|ResponseData| 创建新用户|
|./users/{id}|GET|null|ResponseData| 主键查用户|
|./users|PUT|UserData|ResponseData| 修改信息 |
|./users/{id}|DELETE|null|ResponseData| 删除用户|
|./users/followers|POST|{“user_id”:number}|ResponseData|关注用户|
|./users/followers/{id}|DELETE|null|ResponseData|通过想要取消的用户主键取消关注|


# 通知类
**定义**
```typescript
enum NotificationAction {
    praise,
    follow,
    compose
}

class MyNotification {
    constructor (
        public id: number,
        // 通知主键
        public isread?: boolean,
        // 已读？|URL|Method|Request|Response|Description|

|:--:|:--:|:--:|:--:|:--:|
|./reports/{id}|GET|null|ResponseData|文章主键拿到文章
|./reports/likes|POST|{"report_id": number}|ResponseData|为文章点赞
|./reports/likes/{id}|DELETE|null|ResponseData|通过文章主键取消点赞|URL|Method|Request|Response|Description|

|:--:|:--:|:--:|:--:|:--:|
|./reports/{id}|GET|null|ResponseData|文章主键拿到文章
|./reports/likes|POST|{"report_id": number}|ResponseData|为文章点赞
|./reports/likes/{id}|DELETE|null|ResponseData|通过文章主键取消点赞
        public content?: NotificationAction,
        public time?: Date,
        // 发送时间
        public to?: number
        // 发送对象主键
    ) { }
}

let response = new MyResponse<Notifi>();
let notification = new MyNotification();
// 进行一些操作之后

let NotificationData = JSON.stringify([notification]);
// 用数组封装
let ResponseData = JSON.stringify(response);
```
**请求方法**

|URL|Method|Request|Response|Description|
|:--:|:--:|:--:|:--:|:--:|
|./notifications|GET|null|ResponseData| 拿到用户的所有通知消息|
|./notifications|POST|NotificationData|ResponseData|创建一个新的消息|
|./notifications/{id}|DELETE|null|ResponseData|通过消息主键删除一条消息|


# 报告类
**定义**
```typescript
class Report {
    constructor (
        public id: number,
        // 通知主键
        public like?: Array<number>,
        // 点赞了的用户id数组
        public title?: string,
        // 标题
        public abstract?: string,
        // 摘要
        public label?: Array<number>,
        // 所属标签
        public comment？: Array<number>
        // 评论主键
    ) { }
}
let report = new Report();
let response = new MyResponse<Report>();

// 进行一些操作之后
let ReportData = JSON.stringify([report]);
let ResponseData = JSON.stringify(response);
```

**请求方法**


|URL|Method|Request|Response|Description|
|:--:|:--:|:--:|:--:|:--:|
|./reports/{id}|GET|null|ResponseData|文章主键拿到文章|
|./reports/likes|POST|{"report_id": number}|ResponseData|为文章点赞|
|./reports/likes/{id}|DELETE|null|ResponseData|通过文章主键取消点赞|

# 评论类
**定义**

```typescript
class Comment {
    constructor (
        public id: number,
        public from?: number,
        // 评论者id
        public to?: number,
        // 报告id
        public content?: string
    ) { }
}
let comment = new Comment(1);
let response = new MyResponse<Comment>();
// 一些操作之后>>>>>>>
let CommentData = JSON.stringify([comment]);
let ResponseData = JSON.stringify(response);
```

**请求方法**

|URL|Method|Request|Response|Description|
|:--:|:--:|:--:|:--:|:--:|
|.reports/{report_id}/comments|GET|null|ResponseData|从文章主键拿到文章下的所有评论|
|./comments|POST|CommentData|ResponseData|创建评论|
|./comments/{id}|PUT|CommentData|ResponseData|用主键更新评论|
|./comments/{id}|DELETE|null|ResponseData|删除评论|

# 动作类
**定义**

>待补充

**请求方法**

|URL|Method|Request|Response|Description|
|:--:|:--:|:--:|:--:|:--:|
|./signin/comfirm/{token}|GET|null|{"status":boolean}|激活账号|
|./forget-passwd|POST|{"email":string}|{"status":boolean}|忘记密码|
|./signin|POST|{"username":string,"passwd":string}|{"status":boolean}|登录|
|./signup|POST|{“email”:string,"username":string,"passwd":string}|{"status":boolean}|注册|
|./search|POST|待定|{"meta":{"success":boolean,"message":string},"data":{"users":Array<number>,"reports":Array<number>,"thesis":待定,"protein":待定,'bio-brick':待定}}|搜索功能|
|./get-feeds|GET|null|{"meta":{"success":boolean,"message":string},"data":{"reports":Array<number>}}|热门文章|


# 编辑器类

|URL|Method|Request|Response|Description|
|:--:|:--:|:--:|:--:|:--:|
|./editor/picture|POST|.png、.jpg|{"meta":{"success":boolean,"message":string},"data":{"url":string}}|上传图片|
|./editor/step|GET|null|{"meta":{"success":boolean,"message":string},"data":{"step":Array<step>}}|获取step|
|./editor/subroutine|GET|null|{"meta":{"success":boolean,"message":string},"data":{"step":Array<subroutine>}}|获取subroutine|
|./editor/report/{id}|GET|null|{"meta":{"success":boolean,"message":string},"data":{"step":Array<report>}}|获取report|
|./editor/report|GET|null|{"meta":{"success":boolean,"message":string},"data":{"step":Array<report>}}|获取report|
|./editor/step|POST|JSON[step]|{"meta":{"success":boolean,"message":string},"data":{"id":number}}|获取step|
|./editor/subroutine|POST|JSON[subroutine]|{"meta":{"success":boolean,"message":string},"data":{"id":number}}|获取subroutine|
|./editor/report/|POST|JSON[report]|{"meta":{"success":boolean,"message":string},"data":[]}|获取report|
|./editor/report/|PUT|JSON[report]|{"meta":{"success":boolean,"message":string},"data":[]}|更新report|

