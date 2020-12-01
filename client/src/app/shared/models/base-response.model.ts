export interface BaseResponse {
    message: string;
    type: string
}

export enum ResponseType {
    OK,
    Exception,
    NotFound,
    Unauthorized,
    DuplicatedUsername,
    DuplicatedEmail
}