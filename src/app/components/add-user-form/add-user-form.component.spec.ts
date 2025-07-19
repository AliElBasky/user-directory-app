import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserFormComponent } from './add-user-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AddUserFormComponent', () => {
  let component: AddUserFormComponent;
  let fixture: ComponentFixture<AddUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserFormComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with invalid form', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const form = component.userForm;
    expect(form.get('name')?.errors?.['required']).toBeTruthy();
    expect(form.get('email')?.errors?.['required']).toBeTruthy();
    expect(form.get('companyName')?.errors?.['required']).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.userForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.errors?.['email']).toBeTruthy();

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.errors?.['email']).toBeFalsy();
  });

  it('should emit form data when valid', () => {
    spyOn(component.submitUser, 'emit');
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      companyName: 'Test Company'
    };

    component.userForm.setValue(testData);
    component.onSubmit();

    expect(component.submitUser.emit).toHaveBeenCalledWith(testData);
  });

  it('should not emit form data when invalid', () => {
    spyOn(component.submitUser, 'emit');
    component.onSubmit();
    expect(component.submitUser.emit).not.toHaveBeenCalled();
  });

  it('should handle loading state correctly', () => {
    component.setLoading(true);
    expect(component.loading).toBeTrue();
    expect(component.userForm.disabled).toBeTrue();

    component.setLoading(false);
    expect(component.loading).toBeFalse();
    expect(component.userForm.disabled).toBeFalse();
  });
}); 