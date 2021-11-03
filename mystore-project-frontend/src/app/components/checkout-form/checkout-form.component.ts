import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {

  fullname: string = ''
  address: string = ''
  creditCard: string = ''

  errorCode: number = -1

  constructor(private orderService: OrderService, private spinner: NgxSpinnerService, private router: Router, private el: ElementRef) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

  ngOnInit(): void {
  }

  errorExists(): boolean {
    return this.errorCode !== -1
  }

  submitForm(): void {
    const spinnerName = "place-order-spinner"

    /** spinner starts on submitForm */
    this.spinner.show(spinnerName)

    setTimeout(() => {
      // save the order payment details for the confirmation page
      this.orderService.placeOrder(this.fullname, this.address, this.creditCard)
      .subscribe(
        (response) => {
          this.spinner.hide(spinnerName)
          this.orderService.setPlacedOrder(response)
          this.errorCode = -1

          this.el.nativeElement
          .dispatchEvent(new CustomEvent('cart-updated', {
            bubbles: true
          }))
    
          // navigate to the confirmation route
          this.router.navigateByUrl('/confirmation')
        },
        (error) => {
          this.spinner.hide(spinnerName)
          this.errorCode = error.status
        }
      )
    }, 3000)
    //this delay is needed for visual effect only because the service call actually finishes very quickly; without this delay, the spinner and its message does not get ample time to be shown and read properly
  }
}
