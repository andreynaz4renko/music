import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.currentUserValue) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
