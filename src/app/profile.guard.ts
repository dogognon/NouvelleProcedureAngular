import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

export const profileGuard: CanActivateChildFn = (childRoute, state) => {
      // Use dependency injection to get an instance of the AuthService
const authService =  inject(AuthService);
const router =  inject(Router);


  if (authService.hasRole('Administrateur') || (authService.hasRole('Utilisateur') && state.url == '/procedure')) {
    return true;
    } else {
      router.navigate(['/procedure']);
      return false;
      }
   
    
};
