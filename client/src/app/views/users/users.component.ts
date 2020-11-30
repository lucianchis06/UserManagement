import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { UserModel } from "app/shared/models/user.model";
import { AppConfirmService } from "app/shared/services/app-confirm/app-confirm.service";

@Component({
    selector: 'users',
    templateUrl: 'users.component.html',
    styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

    rows: UserModel[];

    constructor(
        private _http: HttpClient,
        @Inject('BASE_URL') private _baseUrl: string,
        private _confirmService: AppConfirmService
    ) {

    }

    ngOnInit(): void {
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
}