import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { UserFormData } from '../../models/user.model';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent {
  @Output() submitUser = new EventEmitter<UserFormData>();
  loading = false;

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddUserFormComponent>, { optional: true });

  userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    companyName: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.userForm.valid) {
      if (this.dialogRef) {
        this.dialogRef.close(this.userForm.value);
      } else {
        this.submitUser.emit(this.userForm.value);
      }
    }
  }

  onCancel() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  setLoading(isLoading: boolean) {
    this.loading = isLoading;
    if (isLoading) {
      this.userForm.disable();
    } else {
      this.userForm.enable();
    }
  }
} 