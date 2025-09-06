import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly apiUrl = environment.apiUrl; 
  // private readonly apiUrl = import.meta.env.VITE_API_URL;
  private readonly TOKEN_KEY = 'crm_auth_token';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log('API URL being used:', this.apiUrl);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        if (this.isBrowser) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      this.router.navigate(['/login']);
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false; // No token exists
    }

    try {
      const decoded: { exp: number } = jwtDecode(token);
      
      // The 'exp' claim is in SECONDS. Date.now() is in MILLISECONDS.
      // We must convert the 'exp' to milliseconds to compare them correctly.
      const expirationDate = decoded.exp * 1000;
      const now = Date.now();

      return expirationDate > now; // Returns true if the token is not expired
      
    } catch (error) {
      // If the token is malformed, it's invalid.
      console.error("Failed to decode JWT", error);
      return false;
    }
  }
}