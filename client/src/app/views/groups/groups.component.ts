import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { GroupModel } from "app/shared/models/group.model";
import { AppConfirmService } from "app/shared/services/app-confirm/app-confirm.service";

@Component({
    selector: 'groups',
    templateUrl: 'groups.component.html',
    styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
    
    public rows : GroupModel[];

    constructor(
        private _http: HttpClient,
        @Inject('BASE_URL') private _baseUrl: string,
        private _confirmService: AppConfirmService
    ) {
        
    }
    
    ngOnInit(): void {
        this.getAll();
    }

    getAll() {
        this._http.get<GroupModel[]>(this._baseUrl + 'groups/all').subscribe(data => this.rows = data);
    }

    delete(id) {
        const title = 'Confirm dialog';
        const text = 'Do you want to delete this group?';
        this._confirmService.confirm({ title: title, message: text }).subscribe((result) => {
            if (result === true) {
                this._http.delete(this._baseUrl + 'groups/' + id).subscribe(data => this.getAll());
            }
        });
    }
}