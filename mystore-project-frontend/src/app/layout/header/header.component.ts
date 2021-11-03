import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Input decorator allows to pass data from parent component to child component
  @Input() totalCartQuantity: number
  @Input() userIsLoggedIn: boolean

  // @Output decorator allows data to travel from child component to parent component
  @Output() userLoggedOut: EventEmitter<void> = new EventEmitter

  constructor() {
    this.totalCartQuantity = 0
    this.userIsLoggedIn = false
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userLoggedOut.emit()
  }
}
