import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update dataSource when users input changes', () => {
    const testUsers = [
      { id: 1, name: 'Test User', email: 'test@example.com', company: { name: 'Test Co' } }
    ];
    
    component.users = testUsers;
    expect(component.dataSource.data).toEqual(testUsers);
  });

  it('should filter users based on input', () => {
    const testUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', company: { name: 'Company A' } },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: { name: 'Company B' } }
    ];
    
    component.users = testUsers;
    
    const event = new Event('keyup');
    Object.defineProperty(event, 'target', { value: { value: 'john' } });
    
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('john');
  });
});
