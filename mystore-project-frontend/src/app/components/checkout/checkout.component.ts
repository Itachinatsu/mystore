import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  user: User = new User

  isUserLoggedIn: boolean = false

  authenticationMode: string = 'sign-in'

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userUpdated()
  }

  userUpdated(): void {
    // determine if user is logged in
    this.isUserLoggedIn = this.userService.isUserLoggedIn()
    this.user = this.userService.getUser()
  }
}
