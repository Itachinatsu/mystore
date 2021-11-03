import { Component, OnInit } from '@angular/core';
import { PlacedOrder } from '../../models/PlacedOrder';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  placedOrder: PlacedOrder = new PlacedOrder

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.placedOrder = this.orderService.getPlacedOrder()
  }
}
