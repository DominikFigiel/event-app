import { AlertifyService } from 'src/app/services/alertify.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data['roles'] as Array<string>;
    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(['/events']);
        this.alertify.error('Brak dostępu!');
      }
    }
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('Brak dostępu!');
    this.router.navigate(['/home']);
    return false;
  }
}
