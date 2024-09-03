# Shopify Product Fetcher

This project is a Node.js application that interacts with the Shopify GraphQL API to fetch product information based on a provided name. It uses TypeScript for type safety and `ts-node` for running TypeScript files directly.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [What I would do next](#what-i-would-do-next)

## Installation

1. Clone the repository:
   ```sh
   git clone 
   cd shopify-product-fetcher```

2. Install dependencies
  ```npm install```

3. Run the application in development mode:
  ```npm run dev -- --name product-name```

4. Run the built application:
  ```npm run dev -- --name product-name```

## Configuration

The application uses environment variables to configure the Shopify shop domain and access token. These should be set in a .env file in the root directory.

Example .env file:
  ```
  SHOP=your-shop-domain.myshopify.com
  ADMIN_TOKEN=your-access-token
  ```

## Scripts

* ```npm run dev: Runs the application in development mode using ts-node.```
* ```npm run build: Compiles the TypeScript files to JavaScript.```
* ```npm run start: Runs the compiled JavaScript files.```

## What I would do next

- Create tests
- Handle Shopify rate limits
- Improve error handling for more graceful failures