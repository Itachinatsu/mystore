import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/Order';
import { OrderRes } from '../../models/OrderRes';
import { Product } from '../../models/Product';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  orders: Order[] = []

  backendError: boolean = false

  constructor(private orderService: OrderService, private productService: ProductService, private router: Router) {
    // inject the dependencies
  }

  ngOnInit(): void {
    // component initialization: get list of orders
    this.orderService.getOrders()
    .subscribe(
      res => {
        // process the Order items
        for (let index = 0; index < res.length; index++) {
          const orderRes: OrderRes = res[index];
          const anOrder = new Order
          anOrder.id = orderRes.order.id
          anOrder.status = orderRes.order.status

          let totalAmount = 0
          const orderProducts = orderRes.order.products
          for (let index = 0; index < orderProducts.length; index++) {
            const orderProduct = orderProducts[index]
            const orderProductId = orderProduct.product_id

            const products = this.productService.getProducts()
            if (products.length == 0) {
              // if for some reason the backend could not retrieve the product list, the order details cannot be completed
              this.backendError = true
              break
            }
  
            const theProduct:Product = products.filter( aProduct => aProduct.id == orderProductId )[0]
            totalAmount += theProduct.price * orderProduct.quantity
            anOrder.products.push(theProduct)
          }

          anOrder.totalAmount = totalAmount
          this.orders.push(anOrder)
          this.backendError = false
        }
      },
      error => {
        console.error('Error getting orders: '+JSON.stringify(error))
        this.backendError = true
        this.orders = []
      }
    )
  }
}
