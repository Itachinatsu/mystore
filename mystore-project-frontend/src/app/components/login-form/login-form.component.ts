import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  firstName: string = ''
  lastName: string = ''
  password: string = ''

  hidePassword: boolean = true;

  errorCode: number = -1

  // @Output decorator allows data to travel from child component to parent component
  @Output() userUpdated: EventEmitter<void> = new EventEmitter

  constructor(private userService: UserService, private spinner: NgxSpinnerService, private el: ElementRef) { }

  ngOnInit(): void {
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  errorExists(): boolean {
    return this.errorCode !== -1
  }

  submitForm(): void {
    const spinnerName = "signin-spinner"

    /** spinner starts on submitForm */
    this.spinner.show(spinnerName)
  
    setTimeout(() => {
      this.userService.login(this.firstName, this.lastName, this.password)
      .subscribe(
        (response) => {
          this.spinner.hide(spinnerName)
          this.userService.setUser(response)
          this.errorCode = -1

          this.userUpdated.emit()

          this.el.nativeElement
          .dispatchEvent(new CustomEvent('user-logged-in', {
            bubbles: true
          }))
        },
        (error) => {
          this.spinner.hide(spinnerName)
          this.errorCode = error.status
        }
      )
    }, 1000)
    //this delay is needed for visual effect only because the service call actually finishes very quickly; without this delay, the spinner and its message does not get ample time to be shown and read properly
  }
}
