import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const toastr = inject(ToastrService);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // This is an unauthorized error (e.g., expired token)
        toastr.error('Your session has expired. Please log in again.');
        authService.logout();
      }
      // Pass the error along to be handled by the component
      return throwError(() => error);
    })
  );
};