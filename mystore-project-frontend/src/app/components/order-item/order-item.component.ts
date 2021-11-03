import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  // @Input decorator allows to pass data from parent component to child component
  @Input() order: Order
  
  constructor() { 
    this.order = new Order
  }

  ngOnInit(): void {
  }

}
