import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/User';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;

  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient,
    private router: Router) {
    const user = sessionStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(user ? JSON.parse(user) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }


  private updateUser(user: User) {

    if (user && user.user.token) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
    return user;
  }

  register(username: string, email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/registration/`,
      {
        user: {
          username: username,
          email: email,
          password: password
        }
      })
      .pipe(
        map((user: User) => {
          return this.updateUser(user);
        }));
  }

  authorize(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login/`,
      {
        user: {
          email: email,
          password: password
        }
      })
      .pipe(
        map((user: User) => {
          return this.updateUser(user);
        }));
  }

  public logout(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
