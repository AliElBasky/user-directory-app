import { Routes } from '@angular/router';
import { UserListContainerComponent } from './components/user-list-container/user-list-container.component';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserListContainerComponent }
];
