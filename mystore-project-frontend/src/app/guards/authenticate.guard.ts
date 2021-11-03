import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {
  constructor (private userService: UserService) {}
  
  canActivate(): boolean {
    const isUserLoggedIn = this.userService.isUserLoggedIn()

    // only allow login for logged out users
    if (!isUserLoggedIn) {
      return true
    } else {
      return false
    }
  }
}
