# API and Database

---

## API Endpoints

### Products

- Get a list of products: **`'/products' [GET]`**

```
Response Body: [
    {
        "id": number,
        "name": string,
        "price": number,
        "url": string,
        "description": string,
        "category": string
    }
]
```

- Show details of a product: **`'/products/:id/details' [GET]`**

```
Response Body: {
    "id": number,
    "name": string,
    "price": number,
    "url": string,
    "description": string,
    "category": string
}
```

- Create a product [token required]: **`'/products' [POST]`**

```
Request Body: {
    "name": string,
    "url": string,
    "description": string,
    "price": number,
    "category": string
}
Response Body: {
    "id": number,
    "name": string,
    "url": string,
    "description": string,
    "price": number,
    "category": string
}
```

- Products by category (args: product category): **`'/products?category=productCategory' [GET]`**

```
Response Body: [
    {
        "id": number,
        "name": string,
        "url": string,
        "description": string,
        "price": number,
        "category": string
    }
]
```

### Users

- Create a user account (a user registers to the app): **`'/users/register' [POST]`**

```
Request Body: {
    "firstname": string,
    "lastname": string,
    "password": string
}
Response Body: {
    "user": {
        "id": number,
        "firstname": string,
        "lastname": string,
        "password": string
    },
    "token": string
}
```

- Authenticate a user account (a user signs in to the app): **`'/users/login' [POST]`**

```
Request Body: {
    "firstname": string,
    "lastname": string,
    "password": string
}
Response Body: {
    "user": {
        "id": number,
        "firstname": string,
        "lastname": string,
        "password": string
    },
    "token": string
}
```

- Get a list of users [token required]: **`'/users' [GET]`**

```
Response Body: [
    {
        "id": number,
        "firstname": string,
        "lastname": string,
        "password": string
    }
]
```

- Show details of a user [token required]: **`'/users/:id/details' [GET]`**

```
Response Body: {
    "id": number,
    "firstname": string,
    "lastname": string,
    "password": string
}
```

### Orders

- Current Order by user (args: user id)[token required]:
  **`'/users/:id/order' [GET]`**

NOTE: the user can view own order, not another user's order; a check is done on the user ID parameter and the JWT token provided

```
Response Body: {
    "id": number,
    "status": number,
    "user_id": number,
    "products: [
      {
        "product_id": number,
        "quantity": number
      }
    ]
}
```

- Add a product to Current Order by user (args: user id, product id, quantity)[token required]:

**`'/users/:id/order/addProduct' [POST]`**

NOTES:

- the user can add a product to own order, not another user's order; a check is done on the user ID parameter and the JWT token provided
- adding the same product to the order increments its quantity value and does not create another product entry in the order

```
Request Body: {
    "product_id": number,
    "quantity": number
}
Response Body: {
    "order" : {
        "id": number,
        "status": number,
        "user_id": number,
        "products": [
            {
                "product_id": number,
                "quantity": number
            }
        ]
    }
}
```

- Create a new order for the user (args: user id)[token required]:

**`'/users/:id/order/new' [POST]`**

NOTES:

- the user can add products to own order, not another user's order; a check is done on the user ID parameter and the JWT token provided
- adding the same product to the order increments its quantity value and does not create another product entry in the order

```
Request Body: {
    "products": [
        {
            "product_id": number,
            "quantity": number
        }
    ]
}
Response Body: {
    "order": {
        "id": number,
        "status": number,
        "user_id": number,
        "products": [
            {
                "product_id": number,
                "quantity": number
            }
        ]
    }
}
```

- Get all orders by user (args: user id)[token required]:

  **`'/users/:id/orders' [GET]`**

NOTE: the user can view own order, not another user's order; a check is done on the user ID parameter and the JWT token provided

```
Response Body: {
    [
        {
            "order": {
                "id": number,
                "status": number,
                "user_id": number,
                "products": [
                    {
                        "product_id": number,
                        "quantity": number
                    }
                ]
            }
        }
    ]
}
```

- Get details of a specific order by user (args: user id)[token required]:

  **`'/users/:userId/orders/:orderId' [GET]`**

NOTE: the user can view own order, not another user's order; a check is done on the user ID parameter and the JWT token provided

```
Response Body: {
    "order" : {
        "id": number,
        "status": number,
        "user_id": number,
        "products": [
            {
                "product_id": number,
                "quantity": number
            }
        ]
    }
}
```

---

## Data Shapes

#### Product

- id: number
- name: string
- price: number
- url: string
- description: string
- category: string

#### User

- id: number
- firstName: string
- lastName: string
- password: string

#### Order

- id: number
- user_id: number
- status of order (active - 0, or complete - 1): number
- products: array of OrderProduct

#### OrderProduct

(represents each product in the order)

- product_id: number
- quantity: number

---

## Database Schema

```
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price NUMERIC(18,2) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description VARCHAR(64) NOT NULL,
    category VARCHAR(64) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password VARCHAR
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status INTEGER,
    user_id BIGINT REFERENCES users(id)
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id),
    quantity INTEGER,
    order_id BIGINT REFERENCES orders(id)
);
```
