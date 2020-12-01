import { MatSnackBar } from "@angular/material";
import { BaseResponse, ResponseType } from "../models/base-response.model";

export function checkResponse(snackBar: MatSnackBar, result: BaseResponse, successMessage: string): void {
    if (result.type === ResponseType[ResponseType.OK]) {
        snackBar.open(successMessage, "Close", { duration: 2000 });
    } else if (result.type === ResponseType[ResponseType.DuplicatedUsername]) {
        snackBar.open("Duplicated username", "Close", { duration: 4000 });
    } else if (result.type === ResponseType[ResponseType.DuplicatedEmail]) {
        snackBar.open("Email Already Assigned", "Close", { duration: 4000 });
    } else {
        snackBar.open("An error occurred! Please try again!", "Close", { duration: 2000 });
    }
}