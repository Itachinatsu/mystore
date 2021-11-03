import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class OrdersGuard implements CanActivate {
  constructor (private userService: UserService) {}

  canActivate(): boolean {
    const isUserLoggedIn = this.userService.isUserLoggedIn()

    // viewing orders is permitted only if user is logged in
    if (isUserLoggedIn) {
      return true
    } else {
      return false
    }
  }
}
