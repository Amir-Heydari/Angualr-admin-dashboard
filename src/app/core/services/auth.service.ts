// core/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'api/auth';

  // User authentication state
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  // Token storage
  private tokenKey = 'auth_token';

  constructor() {
    this.loadUserFromStorage();
  }

  // Check if user is logged in
  get isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Get current user
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Login user
  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => this.handleAuthentication(response)),
        map(response => response.user),
        catchError(error => {
          console.error('Login failed', error);
          return throwError(() => new Error('Invalid email or password'));
        })
      );
  }

  // Register user
  register(user: any): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user)
      .pipe(
        tap(response => this.handleAuthentication(response)),
        map(response => response.user),
        catchError(error => {
          console.error('Registration failed', error);
          return throwError(() => new Error('Registration failed. Please try again.'));
        })
      );
  }

  // Logout user
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  // Check if user has required role
  hasRole(role: string | string[]): boolean {
    const user = this.currentUser;
    if (!user) return false;

    if (Array.isArray(role)) {
      return role.includes(user.role);
    }

    return user.role === role;
  }

  // Handle storing authentication data
  private handleAuthentication(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    this.currentUserSubject.next(response.user);
  }

  // Load user from storage on app initialization
  private loadUserFromStorage(): void {
    const token = this.getToken();
    if (token) {
      // In a real app, you might want to validate the token with the server
      // or decode a JWT token to get the user information
      // Here we'll simulate getting the user from local storage
      const userJson = localStorage.getItem('user');
      if (userJson) {
        try {
          const user = JSON.parse(userJson);
          this.currentUserSubject.next(user);
        } catch (e) {
          this.logout();
        }
      }
    }
  }


  mockLogin(email: string, password: string): Observable<User> {

    if (email === 'admin@example.com' && password === 'password') {
      const mockUser: User = {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin'
      };

      const mockResponse: AuthResponse = {
        token: 'mock-jwt-token',
        user: mockUser
      };

      this.handleAuthentication(mockResponse);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return of(mockUser);
    }

    return throwError(() => new Error('Invalid email or password'));
  }
}