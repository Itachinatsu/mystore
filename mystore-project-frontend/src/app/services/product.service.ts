import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable } from 'rxjs'; //access to a stream of data returned from the API
import { HttpClient } from '@angular/common/http'; // access the HTTP methods to make requests to a server via an API

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = []

  // dependency injection of HttpClient
  constructor(private http: HttpClient) {
    this.getProductList()
      .subscribe(
        res => {
          this.products = res
        },
        error => {
          console.error('Error getting product list: '+JSON.stringify(error))
          this.products = []
        }
      )
  }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>('http://mystorebackend-env-2.eba-upfexrmm.us-east-1.elasticbeanstalk.com/products')
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>('http://mystorebackend-env-2.eba-upfexrmm.us-east-1.elasticbeanstalk.com/products/'+productId+'/details')
  }

  setProducts(products: Product[]): void {
    this.products = products
  }

  getProducts(): Product[] {
    return this.products
  }
}
