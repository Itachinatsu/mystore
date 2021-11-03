# MyStore Frontend Web App

This is the capstone project of Udacity's Full Stack JavaScript Nanodegree program.  It showcases usage of the Angular development platform in building a typical e-commerce single-page application.

Core functionalities:
- Display a list of products
- View details of a particular product
- Add products to, or remove products from, the shopping cart
- Manage the number of items in the shopping cart
- Create a store account or login with an existing store account to place an order
- Checkout the items in the shopping cart and place an order
- Display a list of orders
- View details of an order

---

## Prerequisites
- Node.js:  https://nodejs.org/en/
- AngularJS:  https://angularjs.org/

## Installation and Setup
The MyStore frontend web application requires connectivity to the [MyStore backend API](https://github.com/markdeleon01/mystore-project-backend).

Both frontend and backend applications need to be installed and set up properly.

Follow **ALL** the instructions described in the MyStore backend API [README.md](https://github.com/markdeleon01/mystore-project-backend/blob/main/README.md)

When the backend API is up and running, download the MyStore frontend web application:

1.  Clone the repository:  https://github.com/markdeleon01/mystore-project-frontend
2.  `cd` into the directory
3.  Execute `npm install`
4.  Execute `ng serve`
5.  The application will be served on:  http://localhost:4200

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

Application code techniques (routing, router guards, forms, HTTP client, etc.) were derived from various examples described in the [Angular Documentation](https://angular.io/docs).

Spinner behaviour provided by [NgxSpinner](https://www.npmjs.com/package/ngx-spinner).

Service wrappers for the Web Storage API provided by [Webstorage services for Angular](https://www.npmjs.com/package/ngx-webstorage-service).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
