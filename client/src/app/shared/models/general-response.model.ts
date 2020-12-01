import { BaseResponse } from "./base-response.model";

export interface GeneralResponse<T> extends BaseResponse {
    data: T;
}