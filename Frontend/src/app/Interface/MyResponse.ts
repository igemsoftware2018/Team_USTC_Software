export class MyResponse<T> {
    meta: {
        success: boolean,
        message: string
    };
    data: Array<T>;
    // 使用数组装起来
}
