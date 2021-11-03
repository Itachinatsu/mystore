import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []

  backendError: boolean = false

  constructor(private productService: ProductService) {
    // inject the ProductService as a dependency
  }

  ngOnInit(): void {
    // component initialization: get list of products
    this.productService.getProductList()
      .subscribe(
        res => {
          // subscribe to the service stream and assign data
          this.productService.setProducts(res)
          this.backendError = false
          this.products = this.productService.getProducts()
        },
        error => {
          console.error('Error getting product list: '+JSON.stringify(error))
          this.productService.setProducts([])
          this.backendError = true
          this.products = this.productService.getProducts()
        }
      )
  }
}
