import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {

  productId: number = 0

  product: Product = new Product

  quantity: string = '1'

  backendError: boolean = false

  errorCode: number = -1
  
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private cartService: CartService, private spinner: NgxSpinnerService, private router: Router, private el: ElementRef) { }

  ngOnInit(): void {
    this.productId = ( this.activatedRoute.snapshot.paramMap.get("id") ? parseInt(this.activatedRoute.snapshot.paramMap.get("id") as string) : 0 )

    // component initialization: get product
    this.productService.getProduct(this.productId).subscribe(
      res => {
        // subscribe to the service stream and assign data
        this.product = res
        this.backendError = false
        this.errorCode = -1
      },
      error => {
        console.error('Error getting details for product '+this.productId+': '+JSON.stringify(error))
        this.product = new Product
        this.backendError = true
        this.errorCode = error.status
      }
    )
  }

  addToCart(): void {
    /** spinner starts on addToCart */
    this.spinner.show()

    /** spinner ends after 1 second */
    setTimeout(() => {
      this.cartService.addProductToCart(this.product, parseInt(this.quantity))

      this.spinner.hide()
  
      this.el.nativeElement
        .dispatchEvent(new CustomEvent('cart-updated', {
          bubbles: true
        }))
      }, 1000)
  }
}
