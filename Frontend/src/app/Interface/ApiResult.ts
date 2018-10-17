export class ApiResult {
    success: boolean;
    data: any; // store error messages when failed
    status: number;

    public isOK() {
        return this.success;
    }

    public getErrors() {
        return this.data;
    }

    public getData() {
        return this.data;
    }

    public getStatus() {
        return this.status;
    }
}
