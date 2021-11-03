export class PlacedOrder {
    orderId: number
    orderFullName: string
    orderTotalAmount: number

    constructor() {
        this.orderId = 0
        this.orderFullName = ''
        this.orderTotalAmount = 0
    }
}
