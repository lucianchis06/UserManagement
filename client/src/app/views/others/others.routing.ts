import { Routes } from '@angular/router';
import { AppBlankComponent } from './app-blank/app-blank.component';
import { AppUsersComponent } from './app-users/app-users.component';


export const OthersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AppBlankComponent,
        data: { title: 'Blank', breadcrumb: 'BLANK' }
      }
    ]
  }
];