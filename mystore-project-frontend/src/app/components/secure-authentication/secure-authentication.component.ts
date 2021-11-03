import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-secure-authentication',
  templateUrl: './secure-authentication.component.html',
  styleUrls: ['./secure-authentication.component.css']
})
export class SecureAuthenticationComponent implements OnInit {

  authenticationMode: string = 'sign-in'

  // @Output decorator allows data to travel from child component to parent component
  @Output() userUpdated: EventEmitter<void> = new EventEmitter

  constructor() { }

  ngOnInit(): void {
  }

  userAuthenticated(): void {
    this.userUpdated.emit()
  }
}
