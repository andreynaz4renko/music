import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);
  const currentUser = authenticationService.currentUserValue;

  req = req.clone({
    setHeaders: {
      'ngrok-skip-browser-warning': 'semen gay',
    },
  });

  if (currentUser && currentUser.user && currentUser.user.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.user.token}`,
      },
    });
  }

  return next(req);
};
