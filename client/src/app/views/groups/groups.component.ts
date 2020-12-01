import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { CategoryModel } from "app/shared/models/category.model";
import { AppConfirmService } from "app/shared/services/app-confirm/app-confirm.service";
import { GroupData, GroupModalComponent } from "./group-modal.component";

@Component({
    selector: 'groups',
    templateUrl: 'groups.component.html',
    styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
    
    public rows : CategoryModel[];

    constructor(
        private _http: HttpClient,
        @Inject('BASE_URL') private _baseUrl: string,
        private _confirmService: AppConfirmService,
        private _dialog: MatDialog
    ) {
        
    }
    
    ngOnInit(): void {
        this.getAll();
    }

    getAll() {
        this._http.get<CategoryModel[]>(this._baseUrl + 'categories/all').subscribe(data => this.rows = data);
    }

    delete(id) {
        const title = 'Confirm dialog';
        const text = 'Do you want to delete this group?';
        this._confirmService.confirm({ title: title, message: text }).subscribe((result) => {
            if (result === true) {
                this._http.delete(this._baseUrl + 'categories/' + id).subscribe(data => this.getAll());
            }
        });
    }

    add() {
        const dialogRef = this._dialog.open(GroupModalComponent, {
            width: '700px',
            data: <GroupData>{
                title: "Add Group",
                group: {
                    name: ""
                } as CategoryModel
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                var cl = <GroupData>result;

                this._http.post<CategoryModel>(this._baseUrl + 'categories/add', cl.group).subscribe(data => this.getAll(), error => console.error(error));
            }
        });    
    }
}