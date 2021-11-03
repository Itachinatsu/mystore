import { Product } from "./Product"

export class Order {
    id: number
    totalAmount: number
    status: number
    products: Product[]

    constructor() {
        this.id = 0
        this.totalAmount = 0.00
        this.status = 0
        this.products = []
    }
}
