import { Product } from "./Product";

export class CartItem {
    product: Product
    quantity: number

    constructor() {
        this.product = new Product
        this.quantity = 0
    }
}
