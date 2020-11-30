import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenUtil } from 'app/shared/models/token.model';

@Injectable()
export class AuthGuard implements CanActivate {
  public authToken;
  private isAuthenticated = true; // Set this value dynamically
  
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var tokenModel = TokenUtil.decode();
    
    if (tokenModel) {
      return true
    }
    this.router.navigate(['/sessions/signin']);
    return false;
  }
}