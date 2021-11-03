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

INSERT INTO products (name, price, url, description, category) VALUES('Book', 9.99, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'You can read it!', 'BOOKS');

INSERT INTO products (name, price, url, description, category) VALUES('Headphones', 249.99, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Listen to stuff!', 'ELECTRONICS');

INSERT INTO products (name, price, url, description, category) VALUES('Backpack', 79.99, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Carry things around town!', 'ACCESSORIES');

INSERT INTO products (name, price, url, description, category) VALUES('Glasses', 129.99, 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Now you can see!', 'ACCESSORIES');

INSERT INTO products (name, price, url, description, category) VALUES('Cup', 4.99, 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'Drink anything with it!', 'KITCHEN');

INSERT INTO products (name, price, url, description, category) VALUES('Shirt', 29.99, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80', 'Wear it with style!', 'CLOTHING');