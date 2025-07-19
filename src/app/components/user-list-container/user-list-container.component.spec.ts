import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListContainerComponent } from './user-list-container.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { User } from '../../models/user.model';

describe('UserListContainerComponent', () => {
  let component: UserListContainerComponent;
  let fixture: ComponentFixture<UserListContainerComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'addUser']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [UserListContainerComponent, NoopAnimationsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListContainerComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    userService.getUsers.and.returnValue(of([]));
    fixture.detectChanges();
    expect(userService.getUsers).toHaveBeenCalled();
  });

  it('should show error message when loading users fails', () => {
    userService.getUsers.and.returnValue(throwError(() => new Error('Failed to load')));
    fixture.detectChanges();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Error loading users',
      'Close',
      jasmine.any(Object)
    );
  });

  it('should handle add user success', () => {
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      companyName: 'Test Company'
    };

    const mockResponse: User = {
      id: 1,
      name: testUser.name,
      email: testUser.email,
      company: {
        name: testUser.companyName
      }
    };

    userService.addUser.and.returnValue(of(mockResponse));
    component.handleAddUser(testUser);

    expect(userService.addUser).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith(
      'User added successfully!',
      'Close',
      jasmine.any(Object)
    );
  });

  it('should handle add user error', () => {
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      companyName: 'Test Company'
    };

    userService.addUser.and.returnValue(throwError(() => new Error('Failed to add')));
    component.handleAddUser(testUser);

    expect(snackBar.open).toHaveBeenCalledWith(
      'Error adding user',
      'Close',
      jasmine.any(Object)
    );
  });
}); 