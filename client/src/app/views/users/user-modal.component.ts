import { HttpClient } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { UserModel } from "app/shared/models/user.model";

export interface UserData {
    user: UserModel;
    title: string;
}

@Component({
    selector: 'user-modal',
    templateUrl: 'user-modal.component.html',
})
export class UserModalComponent {

    public types = [];
    public clients = [];

    constructor(
        public dialogRef: MatDialogRef<UserModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UserData,
        public _snackBar: MatSnackBar
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
