export interface OrderRes {
    order: {
        id: number
        status: number
        user_id: number
        products: [
            {
                product_id: number
                quantity: number
            }
        ]
    }
}
