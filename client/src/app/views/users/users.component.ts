import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { checkResponse } from "app/shared/helpers/checkResponse";
import { BaseResponse } from "app/shared/models/base-response.model";
import { CategoryModel } from "app/shared/models/category.model";
import { GeneralResponse } from "app/shared/models/general-response.model";
import { TokenModel, TokenUtil } from "app/shared/models/token.model";
import { UserModel } from "app/shared/models/user.model";
import { AppConfirmService } from "app/shared/services/app-confirm/app-confirm.service";
import { UserData, UserModalComponent } from "./user-modal.component";

@Component({
    selector: 'users',
    templateUrl: 'users.component.html',
    styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

    rows: UserModel[];
    decodedToken: TokenModel;
    groups: CategoryModel[];

    constructor(
        private _http: HttpClient,
        @Inject('BASE_URL') private _baseUrl: string,
        private _confirmService: AppConfirmService,
        private _dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) {

    }

    ngOnInit(): void {
        this.decodedToken = TokenUtil.decode();
        this.getAll();
        this.getAllGroups();
    }

    getAll(): void {
        this._http.get<UserModel[]>(this._baseUrl + 'users/all').subscribe(data => this.rows = data);
    }

    getAllGroups() {
        this._http.get<CategoryModel[]>(this._baseUrl + 'categories/all').subscribe(data => this.groups = data);
    }

    delete(id) {
        const title = 'Confirm dialog';
        const text = 'Do you want to delete this user?';
        this._confirmService.confirm({ title: title, message: text }).subscribe((result) => {
            if (result === true) {
                this._http.delete<BaseResponse>(this._baseUrl + 'users/' + id)
                    .subscribe(result => {
                        checkResponse(this._snackBar, result, "User deleted"); 
                        this.getAll();
                     });
            }
        });
    }

    add() {
        const dialogRef = this._dialog.open(UserModalComponent, {
            width: '700px',
            data: <UserData>{
                title: "Add User",
                user: {} as UserModel,
                groups: this.groups,
                selectedGroups: []
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                var cl = <UserData>result;

                cl.user.categories = [];
                cl.selectedGroups.forEach(s => {
                    cl.user.categories.push({ userId: cl.user.userId, categoryId: s });
                });

                this._http.post<GeneralResponse<UserModel>>(this._baseUrl + 'users/add', cl.user)
                    .subscribe(result => {
                        checkResponse(this._snackBar, result, "User added");  
                        this.getAll(); 
                    }, error => console.error(error));
            }
        });
    }

    edit(user: UserModel) {
        this.groups.forEach(g => {
            g.isSelected = user.categories.filter(s => s.categoryId === g.categoryId).length > 0;
        });

        const dialogRef = this._dialog.open(UserModalComponent, {
            width: '700px',
            data: <UserData>{
                title: "Edit User",
                user: user,
                groups: this.groups,
                selectedGroups: user.categories.map(s => s.categoryId)
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                var cl = <UserData>result;

                cl.user.categories = [];
                cl.selectedGroups.forEach(s => {
                    cl.user.categories.push({ userId: cl.user.userId, categoryId: s });
                });

                this._http.put<GeneralResponse<UserModel>>(this._baseUrl + 'users/edit', cl.user)
                    .subscribe(result => {
                        checkResponse(this._snackBar, result, "User edited");   
                        this.getAll(); 
                    }, error => console.error(error));
            }
        });
    }
}