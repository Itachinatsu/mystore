import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { OrderService } from '../services/order.service';

@Injectable()
export class ConfirmationGuard implements CanActivate {
  constructor (private orderService: OrderService) {}

  canActivate(): boolean {
    const placedOrderId = this.orderService.getPlacedOrder().orderId

    // confirmation permitted only if there was an order placed by a logged in user
    if (placedOrderId !== 0) {
      return true
    } else {
      return false
    }
  }
}
