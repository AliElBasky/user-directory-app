import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);
  
  // Signals for state management
  users = signal<User[]>([]);
  loading = signal<boolean>(false);

  getUsers(): Observable<User[]> {
    this.loading.set(true);
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap({
        next: (users) => {
          this.users.set(users);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      })
    );
  }

  addUser(user: User): Observable<User> {
    this.loading.set(true);
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap({
        next: (newUser) => {
          this.users.update(users => [...users, newUser]);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      })
    );
  }
}