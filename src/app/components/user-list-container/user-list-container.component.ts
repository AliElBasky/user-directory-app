import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { UserListComponent } from '../user-list/user-list.component';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { UserFormData, mapFormDataToUser } from '../../models/user.model';

@Component({
  selector: 'app-user-list-container',
  standalone: true,
  imports: [
    CommonModule,
    UserListComponent,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.css']
})
export class UserListContainerComponent implements OnInit {
  userService = inject(UserService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.userService.getUsers().subscribe({
      error: () => {
        this.snackBar.open('Error loading users', 'Close', {
          duration: 3000,
          horizontalPosition: 'end'
        });
      }
    });
  }

  openAddUserModal() {
    const dialogConfig: MatDialogConfig = {
      width: '600px',
      maxWidth: '98vw',
      maxHeight: '90vh',
      disableClose: true,
      position: { top: '80px' },
      panelClass: ['add-user-dialog', 'no-scroll'],
      autoFocus: 'first-tabbable'
    };

    const dialogRef = this.dialog.open(AddUserFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleAddUser(result);
      }
    });
  }

  handleAddUser(formData: UserFormData) {
    const user = mapFormDataToUser(formData);
    this.userService.addUser(user).subscribe({
      next: () => {
        this.snackBar.open('User added successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end'
        });
      },
      error: () => {
        this.snackBar.open('Error adding user', 'Close', {
          duration: 3000,
          horizontalPosition: 'end'
        });
      }
    });
  }
} 