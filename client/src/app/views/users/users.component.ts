import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
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
    
    constructor(
        private _http: HttpClient,
        @Inject('BASE_URL') private _baseUrl: string,
        private _confirmService: AppConfirmService,
        private _dialog: MatDialog
    ) {

    }

    ngOnInit(): void {
        this.decodedToken = TokenUtil.decode();
        this.getAll();
    }

    getAll(): void {
        this._http.get<UserModel[]>(this._baseUrl + 'users/all').subscribe(data => this.rows = data);
    }

    delete(id) {
        const title = 'Confirm dialog';
        const text = 'Do you want to delete this user?';
        this._confirmService.confirm({ title: title, message: text }).subscribe((result) => {
            if (result === true) {
                this._http.delete(this._baseUrl + 'users/' + id).subscribe(data => this.getAll());
            }
        });
    }

    add() {
        const dialogRef = this._dialog.open(UserModalComponent, {
            width: '700px',
            data: <UserData>{
                title: "Add Group",
                user: { } as UserModel
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                var cl = <UserData>result;

                this._http.post<UserModel>(this._baseUrl + 'users/add', cl.user).subscribe(data => this.getAll(), error => console.error(error));
            }
        });    
    }
}