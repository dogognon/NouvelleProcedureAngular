import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    // Use dependency injection to get an instance of the AuthService
const authService =  inject(AuthService);
const router =  inject(Router);

// Check if the user is logged in using the AuthService
if (authService.isAuthenticated()) {
  return true; // If logged in, allow access to the route
} else {
  router.navigateByUrl("/login")
  return false; // If not logged in, deny access to the route
}
};
