import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatProgressBarModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from "@angular/material";
import { RouterModule, Routes } from "@angular/router";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SharedModule } from "app/shared/shared.module";
import { ColorPickerModule } from "ngx-color-picker/dist";
import { QuillModule } from "ngx-quill/src/quill.module";
import { GroupModalComponent } from "./group-modal.component";
import { GroupsComponent } from "./groups.component";


const accountRoutes : Routes = [
    {
        path: '',
        component: GroupsComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatMenuModule,
        MatInputModule,
        MatDialogModule,
        MatListModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatExpansionModule,
        MatCardModule,
        MatTabsModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSliderModule,
        FlexLayoutModule,
        QuillModule,
        SharedModule,
        MatProgressBarModule,
        ColorPickerModule,
        NgxDatatableModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        RouterModule.forChild(accountRoutes)
    ],
    declarations: [
        GroupsComponent,
        GroupModalComponent
    ],
    entryComponents: [
        GroupModalComponent
    ],
    exports: []
})
export class GroupsModule {

}