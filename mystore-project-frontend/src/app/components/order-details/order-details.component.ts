import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../models/Order';
import { OrderRes } from '../../models/OrderRes';
import { Product } from '../../models/Product';
import { CartItem } from '../../models/CartItem';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId: number = 0

  order: Order = new Order

  cartItems: CartItem[] = []

  backendError: boolean = false

  errorCode: number = -1

  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService, private productService: ProductService, private router: Router) {
    // inject the dependencies
  }

  ngOnInit(): void {
    this.orderId = ( this.activatedRoute.snapshot.paramMap.get("id") ? parseInt(this.activatedRoute.snapshot.paramMap.get("id") as string) : 0 )

    // component initialization: get order
    this.orderService.getOrder(this.orderId)
    .subscribe(
      res => {
        // subscribe to the service stream and assign data
        const orderRes: OrderRes = res
        const anOrder = new Order
        const theCartItems = []
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

          const aCartItem = new CartItem
          aCartItem.product = theProduct
          aCartItem.quantity = orderProduct.quantity
          theCartItems.push(aCartItem)
        }

        anOrder.totalAmount = totalAmount
        this.order = anOrder
        this.cartItems = theCartItems
        this.backendError = false
        this.errorCode = -1
      },
      error => {
        console.error('Error getting details for order '+this.orderId+': '+JSON.stringify(error))
        this.order = new Order
        this.cartItems = []
        this.backendError = true
        this.errorCode = error.status
      }
    )
  }
}
