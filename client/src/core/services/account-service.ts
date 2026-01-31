import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  User,
  UserLoginModel,
  UserRegisterModel,
} from '../../shared/models/User';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);

  baseUrl = 'https://localhost:5001/api/';
  currentUser = signal<User | null>(null);

  register(registerCreds: UserRegisterModel): Observable<User> {
    return this.http
      .post<User>(this.baseUrl + 'account/register', registerCreds)
      .pipe(
        tap((user) => {
          this.setCurrentUser(user);
        }),
      );
  }

  login(userData: UserLoginModel): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'account/login', userData).pipe(
      tap((user) => {
        this.setCurrentUser(user);
      }),
    );
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
