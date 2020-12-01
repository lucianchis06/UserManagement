import { HttpClient } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { CategoryModel } from "app/shared/models/category.model";

export interface GroupData {
    group: CategoryModel;
    title: string;
}

@Component({
    selector: 'group-modal',
    templateUrl: 'group-modal.component.html',
})
export class GroupModalComponent {

    public types = [];
    public clients = [];

    constructor(
        public dialogRef: MatDialogRef<GroupModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: GroupData,
        public _snackBar: MatSnackBar
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
