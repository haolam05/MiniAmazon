# MiniAmazon

  - Inspired by the remarkable impact and success of Amazon in the online retail industry, MiniAmazon was built to replicate the essence of Amazon's success while catering to a more specific market or specific user needs. Miniamazon aims to provide a scaled-down yet effective platform for online shopping.

  - On the other hand, as Amazon grows larger and larger, its website becomes extrememly complex and sometimes is hard to navigate. Instead of creating an all-in-one app, MiniAmazon focus more on user experience using a single-page application with a few core features:
    - Shopping (Orders & Checkout)
    - Bookmark
    - Reviews
    - Searchbox
    - Chatbot (customer service)
    - Product Magnifying & Download (for details view)
    - Simultaneous checkouts (Websocket)

  - Customers can quickly find products by name via searchbox, or sort the products by categories. The customer can easily add or bookmark a product from any page, simple user interface to update each product quantity and checkout. Besides that, each product can be magnified for details view.

  - More importantly, product's quantity will be update in real-time when someone checks out, which ensures data integrity.

  - Miniamazon's future plan includes implementing delivery services and adding more product categories, aiming to enhance convenience and broaden the selection available to customers.

## Hosted On
[![Render](https://img.shields.io/badge/Render-%46E3B7.svg?logo=render&logoColor=white)](https://miniamazon.onrender.com)

## Contact Me
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hao-lam-378065196/)
![Gmail](https://img.shields.io/badge/Gmail-D14836?logo=gmail&logoColor=white)
![Gmail](https://img.shields.io/badge/tuonghao2001@gmail.com-gray?logoColor=white)

## Tech Stack
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?logo=google-cloud&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?logo=python&logoColor=ffdd54)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?logo=css3&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?logo=npm&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?logo=markdown&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?logo=reacthookform&logoColor=white)
![Semantic UI React](https://img.shields.io/badge/Semantic%20UI%20React-%2335BDB2.svg?logo=SemanticUIReact&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?logo=eslint&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?logo=flask&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?logo=ubuntu&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?logo=amazon-aws&logoColor=white)
![Static Badge](https://img.shields.io/badge/Amazon%20S3-green?logo=amazon%20s3&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?logo=sqlite&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?logo=postgresql&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?logo=docker&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?logo=socket.io&badgeColor=010101)
![Dependabot](https://img.shields.io/badge/dependabot-025E8C?logo=dependabot&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?logo=SASS&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?logo=render&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?logo=visual-studio-code&logoColor=white)
![MDN Web Docs](https://img.shields.io/badge/MDN_Web_Docs-black?logo=mdnwebdocs&logoColor=white)
![Vim](https://img.shields.io/badge/VIM-%2311AB00.svg?logo=vim&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?logo=github&logoColor=white)
![Static Badge](https://img.shields.io/badge/SQLAlchemy-white?logo=sqlalchemy&logoColor=blue)

## Database Schema Design

![miniamazon-database-schema]

[miniamazon-database-schema]: https://miniamazon.s3.us-west-2.amazonaws.com/miniamazon-database-schema.png

## Installation guide

### Clone the project

### Install dependencies
  * run `pipenv install -r requirements.txt` in the root project folder
  * run `npm install` in `react-vite` folder

### Create and ensure that the .env file has the following fields
  * SECRET_KEY
  * DATABASE_URL
  * SCHEMA
  * S3_BUCKET
  * S3_KEY
  * S3_SECRET

### Migration
  * run `pipenv run flask db upgrade` in the root project folder

### Optional seedings
  * run `pipenv run flask seed reset` in the root project folder

### Start up the servers
  * run `pipenv run flask run` in the root project folder
  * run `npm run dev` in `react-vite` folder

# Demo

## Sign up
![alt text](<demo/signup.gif>)

## Login
![alt text](<demo/login.gif>)

## User profile
![alt text](<demo/user profile.gif>)

## Magnifying and download image
![alt text](<demo/magnifying-and-image-download.gif>)

## Checkout simultaneously with different users
![alt text](<demo/checkout simultaneously with different users.gif>)

## Checkout while product owners update/delete product
![alt text](<demo/checkout while product owners update or delete product.gif>)

## Chatbot
![alt text](<demo/chatbot.gif>)

## Search
![alt text](<demo/search.gif>)

## Reviews
![alt text](<demo/reviews.gif>)

## Bookmarks
![alt text](<demo/bookmarks.gif>)

## Create a product
![alt text](<demo/create product.gif>)

## Technologies
* PPFR Stack
  * Postgres (Sqlite in development)
  * Python
  * Flask
  * React (Redux for state management)
* SQLAlchemy
  * ORM for easier CRUD operations on the database
* AWS
  * Cloud hosting service for image(s) uploading & downloading
* Boto3 & Botocore
  * Used to create, configure, and manage AWS services
* Dyanmic seedings
  * A variety of seeds are dynamically created for testing and demo purposes without hard-coding
* Flask-socketio
  * Allows for real-time notifications, messaging(chabot), and authorization changes (e.g. simultaneous checkout among different users)
* Redux State Hydration
  * Avoid unecessary fetches from the database, speed up application, and increase users' experience while ensuring data integrity across pages
* CSRF Protection
  * By exchanging tokens for non-GET requests
* Prevent SQL injections
  * By sanitize queries input
* Prevent Rainbow Table attacks
  * By salt and hash passwords before storing in the database
  * Prevent XSS attacks
  * Force all inputs to be text
  * Also applied csrf practice mentioned above for extra layer of protection
* CORS
  * Enabled during development
* Eslint
  * Used for consistent styling
* DBDiagram
  * Used for design and sketch database schema, assign associations amongst tables
* Data Racing
  * Avoid false positive due to fast button clicks
  * Avoid multiple CUD records being sent to the database by ensuring CUD signals are only processed once


## Features
  * See github wiki page

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Unauthorized"
      }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Forbidden"
      }
    ```

## USERS

### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/auth
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "user": {
          "id": 1,
          "first_name": "John",
          "last_name": "Smith",
          "email": "john1.smith@gmail.com",
          "username": "JohnSmith,",
          "profile_image_url": null
        }
      }
    ```

* Successful Response when there is no logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "user": null
      }
    ```

### Log In a User

Logs in a user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/auth/login
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "email": "john1.smith@gmail.com",
        "password": "secret_password"
      }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "user": {
          "id": 1,
          "first_name": "John",
          "last_name": "Smith",
          "email": "john1.smith@gmail.com",
          "username": "JohnSmith,",
          "profile_image_url": null
        }
      }
    ```

* Error response: Inccorect Password
  * Status code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "password": [
          "Password was incorrect."
        ]
      }
    ```

* Error response: Bad request
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "email": [
          "This field is required" || "Email provided not found."
        ],
        "password": [
          "This field is required" || "Password was incorrect."
        ]
      }
    ```

### Log Out a User

Logs out the current user, ending their session.

* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/auth/logout
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "User logged out"
      }
    ```


### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/auth/signup
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "first_name": "John",
        "last_name": "Smith",
        "email": "john1.smith@gmail.com",
        "username": "JohnSmith",
        "password": "secret_password",
        "profile_image_url": "https://meetup2024.s3.us-west-2.amazonaws.com/avatar2.png" || null
      }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "user": {
          "id": 1,
          "first_name": "John",
          "last_name": "Smith",
          "email": "john1.smith@gmail.com",
          "username": "JohnSmith,",
          "profile_image_url": "https://meetup2024.s3.us-west-2.amazonaws.com/avatar2.png" || null,
        }
      }
    ```

* Error response: User already exists with the specified email or username
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": [
        "Email address is already in use."
      ],
      "username": [
        "Username is already in use."
      ]
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "email": [
          "This field is required" || "Email is invalid."
        ],
        "first_name": [
          "This field is required."
        ],
        "last_name": [
          "This field is required."
        ],
        "password": [
          "This field is required" || "Password must be at least 6 characters."
        ],
        "username": [
          "This field is required" || "Username must be at least 4 characters."
        ],
        "profile_image_url": [
          "Photo must be a valid image URL!"
        ],
      }
    ```

### Get all users

Returns all users

* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/users
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "customers": [
          {
              "email": "haolam@user.io",
              "first_name": "Hao",
              "id": 1,
              "last_name": "Lam",
              "profile_image_url": "https://miniamazon.s3.us-west-2.amazonaws.com/avatar1.png",
              "username": "haolam"
          }
        ]
      }
    ```

### Get a user by Id

Returns a specific user by id

* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/user/:id
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "email": "haolam@user.io",
        "first_name": "Hao",
        "id": 1,
        "last_name": "Lam",
        "profile_image_url": "https://miniamazon.s3.us-west-2.amazonaws.com/avatar1.png",
        "username": "haolam"
      }
    ```

* Error response: User not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "User couldn't be found"
      }
    ```

### Update User

Update user's information

* Require Authentication: True
* Request
  * Method: PUT
  * URL: /api/auth/update
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "first_name": "John 2",
        "last_name": "Smith 2",
        "email": "john1.smith@gmail.com",
        "username": "JohnSmith",
        "password": "secret_password",
        "profile_image_url": "https://meetup2024.s3.us-west-2.amazonaws.com/avatar2.png" || null
      }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "user": {
          "id": 1,
          "first_name": "John 2",
          "last_name": "Smith 2",
          "email": "john1.smith@gmail.com",
          "username": "JohnSmith,",
          "profile_image_url": "https://meetup2024.s3.us-west-2.amazonaws.com/avatar2.png" || null,
        }
      }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "email": [
          "This field is required." || "User could not be found"
        ],
        "username": [
          "This field is required." || "User could not be found"
        ],
        "first_name": [
          "This field is required."
        ],
        "last_name": [
          "This field is required."
        ],
        "password": [
          "This field is required."
        ]
      }
    ```

* Error response: Inccorect Password
  * Status code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "password": [
          "Password was incorrect."
        ]
      }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "email": [
          "This field is required" || "Email is invalid."
        ],
        "first_name": [
          "This field is required."
        ],
        "last_name": [
          "This field is required."
        ],
        "password": [
          "This field is required" || "Password must be at least 6 characters."
        ],
        "username": [
          "This field is required" || "Username must be at least 4 characters."
        ],
        "profile_image_url": [
          "Photo must be a valid image URL!"
        ]
      }
    ```


### Update User Password

Update user's password. User is force to login again when password is updated successfully.

* Require Authentication: True
* Request
  * Method: PUT
  * URL: /api/auth/password
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "password": "haolam@user.io",
        "new_password": "new_password"
      }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Successfully updated your password. Please log in again."
      }
    ```

* Error response: Inccorect Password
  * Status code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "password": [
          "Password was incorrect."
        ]
      }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "password": [
          "This field is required" || "Password must be at least 6 characters."
        ],
        "new_password": [
          "This field is required" || "Password must be at least 6 characters."
        ],
      }
    ```

### Delete User

Delete current user

* Require Authentication: True
* Request
  * Method: PUT
  * URL: /api/auth/password
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Successfully updated your password. Please log in again."
      }
    ```

## PRODUCTS

### Get all products
* Require Authentication: False
* Request
  * Method: GET
  * URL: /api/products
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "products": [
          {
            "category": "Groceries",
            "created_at": "2024-02-28 08:19:56.093091",
            "description": "The Hass avocado is known as the 'year-round avocado' because of its seasonal availability. Mexico is the world's largest producer of Hass avocados, best known for their creamy texture and great taste!",
            "id": 1,
            "name": "Meidum Hass Avocado",
            "price": "1.29",
            "product_image": "https://miniamazon.s3.us-west-2.amazonaws.com/avocado.jpg",
            "remaining": 22,
            "seller": {
              "email": "haolam@user.io",
              "first_name": "Hao",
              "id": 1,
              "last_name": "Lam",
              "profile_image_url": "https://miniamazon.s3.us-west-2.amazonaws.com/avatar1.png",
              "username": "haolam"
            },
            "seller_id": 1
          }
        ]
      }
    ```

### Get a product by id
* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/products/:id
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
          "category": "Handmade",
          "created_at": "2024-02-28 08:19:56.093877",
          "description": "Make your gift unforgettable. We will write your wish on the puzzle and keep the memory of you and your gift for many years. ABSOLUTELY FREE. A personalized name puzzle is a hand-made toy that combines the Montessori technique, helping toddlers to learn how to spell their names, learn colors and develop motoric skills.",
          "id": 14,
          "name": "Personalized Wooden Name Puzzle for Kids Personalized Name Puzzle for Toddlers Personalized Baby Gifts First Birthday Gift Personalized Puzzle Wooden Puzzles Custom Name Puzzle Baby & Toddler Toys",
          "price": "13.96",
          "product_image": "https://miniamazon.s3.us-west-2.amazonaws.com/puzzle.jpg",
          "remaining": 50,
          "seller_id": 1
      }
    ```

* Error response: Product not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Product couldn't be found"
      }
    ```

### Create a product
* Require Authentication: True
* Request
  * Method: POST
  * URL: /api/products
  * Body:
    ```json
      {
        "name": "Banana",
        "category": "Groceries",
        "description": "This is a very very very very very very delicious banana. It's also very very very very very very cheap",
        "price": 3.23,
        "remaining": 4,
        "product_image": "Image URL"
      }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
          "category": "Groceries",
          "created_at": "2024-02-28 10:36:18.872389",
          "description": "This is a very very very very very very delicious banana. It's also very very very very very very cheap",
          "id": 16,
          "name": "Banana",
          "price": "3.23",
          "product_image": "Image URL",
          "remaining": 4,
          "seller_id": 1
      }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "category": [
          "This field is required." || "Invalid category! Here is a list of allowed categories: ['Groceries', 'Electronics', 'Books', 'Beauty & Health', 'Handmade']"
        ],
        "description": [
          "This field is required." || "Description must be at least 50 characters"
        ],
        "name": [
          "This field is required." || "Name must be at least 4 characters"
        ],
        "price": [
          "This field is required." || "Price must be greater than 0"
        ],
        "product_image": [
          "This field is required."
        ],
        "remaining": [
          "This field is required." || "Remaining must be greater than 0"
        ]
      }
    ```

### Update a product
* Require Authentication: True
* Request
  * Method: PUT
  * URL: /api/products/:id
  * Body:
    ```json
      {
        "name": "Banana 2",
        "category": "Health & Beauty",
        "description": "This is a very very very very very very delicious banana. It's also very very very very very very cheap 2",
        "price": 13.23,
        "remaining": 3,
        "product_image": "Image URL"
      }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
          "category": "Health & Beauty",
          "created_at": "2024-02-28 10:36:18.872389",
          "description": "This is a very very very very very very delicious banana. It's also very very very very very very cheap 2",
          "id": 16,
          "name": "Banana 2",
          "price": "13.23",
          "product_image": "Image URL",
          "remaining": 3,
          "seller_id": 1
      }
    ```

* Error response: Product not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Product couldn't be found"
      }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "category": [
          "This field is required." || "Invalid category! Here is a list of allowed categories: ['Groceries', 'Electronics', 'Books', 'Beauty & Health', 'Handmade']"
        ],
        "description": [
          "This field is required." || "Description must be at least 50 characters"
        ],
        "name": [
          "This field is required." || "Name must be at least 4 characters"
        ],
        "price": [
          "This field is required." || "Price must be greater than 0"
        ],
        "product_image": [
          "This field is required."
        ],
        "remaining": [
          "This field is required." || "Remaining must be greater than 0"
        ]
      }
    ```

### Delete a product by id

Delete an existing product by id. Deleted product can still be view in past orders.

* Require Authentication: True
* Require Authorization: True. (Must be the seller of the product)
* Request
  * Method: DELETE
  * URL: /api/products/:id
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Successfully deleted product"
      }
    ```

* Error response: Product not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Product couldn't be found"
      }
    ```

## REVIEWS

### Get all reviews belonged to a product by id
* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/products/:id/reviews
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      [
        {
          "created_at": "2024-02-28 11:14:48.613574",
          "customer_id": 2,
          "id": 1,
          "product_id": 1,
          "rating": 5,
          "review": "Delicious avocado!!!"
        }
      ]
    ```

* Error response: Product not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Product couldn't be found"
      }
    ```

### Get all reviews belonged to a user by id
* Require Authentication: True
* Require Authorization: True - current user must be the same as the request user
* Request
  * Method: GET
  * URL: /api/users/:id/reviews
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      [
        {
          "created_at": "2024-02-28 11:14:48.613574",
          "customer_id": 2,
          "id": 1,
          "product_id": 1,
          "rating": 5,
          "review": "Delicious avocado!!!"
        }
      ]
    ```

* Error response: User not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "User couldn't be found"
      }
    ```

### Get a review by id
* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/reviews/:id
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "created_at": "2024-02-28 11:14:48.613574",
        "customer_id": 2,
        "id": 1,
        "product_id": 1,
        "rating": 5,
        "review": "Delicious avocado!!!"
      }
    ```

* Error response: Review not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Review couldn't be found"
      }
    ```

### Create a review for a product

Each user can only comment 1 time on a product

* Require Authentication: True
* Request
  * Method: POST
  * URL: /api/products/:id/reviews
  * Body:
    ```json
      {
        "review": "good good good",
        "rating": 4
      }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "created_at": "2024-02-28 13:04:07.345591",
        "customer_id": 1,
        "id": 10,
        "product_id": 1,
        "rating": 4,
        "review": "Good good good"
      }
    ```

* Error response: Product not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Product couldn't be found"
      }
    ```

* Error response: Duplicate review
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "You already had a review on this product"
      }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "review": [
          "This field is required."
        ],
        "rating": [
          "This field is required." || "Rating must be between 1 and 5"
        ]
      }
    ```

### Update a review by id
* Require Authentication: True
* Require Authorization: True - Current user must be the owner of the review
* Request
  * Method: PUT
  * URL: /api/reviews/:id
  * Body:
    ```json
      {
        "review": "bad bad bad",
        "rating": 1
      }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "created_at": "2024-02-28 13:04:07.345591",
        "customer_id": 1,
        "id": 10,
        "product_id": 1,
        "rating": 1,
        "review": "Bad bad bad2"
      }
    ```

* Error response: Review not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Review couldn't be found"
      }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "review": [
          "This field is required."
        ],
        "rating": [
          "This field is required." || "Rating must be between 1 and 5"
        ]
      }
    ```

### Delete a review by id

Delete an existing review by id.

* Require Authentication: True
* Require Authorization: True. - Current user must be the owner of the review
* Request
  * Method: DELETE
  * URL: /api/reviews/:id
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Successfully deleted review"
      }
    ```

* Error response: Review not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Review couldn't be found"
      }
    ```

## BOOKMARKS

### Get a bookmark by id
* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/bookmarks/:id
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "created_at": "2024-02-28 11:14:48.622326",
        "customer_id": 1,
        "id": 5,
        "note": "Coding too much, needs eyedrop. Looking for a larger pack.",
        "product_id": 10
      }
    ```

* Error response: Bookmark not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Bookmark couldn't be found"
      }
    ```

### Get all bookmarks belonged to a product by id
* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/products/:id/bookmarks
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    [
      {
        "created_at": "2024-02-28 11:14:48.621960",
        "customer_id": 1,
        "id": 1,
        "note": "This seems reasonable. Looking to see if there is a better deal.",
        "product_id": 4
      }
    ]
    ```

* Error response: Product not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found"
    }
    ```

### Get all bookmarks belonged to a user by id
* Require Authentication: True
* Require Authorization: True - Current user must be the same as the requested user
* Request
  * Method: GET
  * URL: /api/users/:id/bookmarks
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    [
      {
        "created_at": "2024-02-28 11:14:48.621960",
        "customer_id": 1,
        "id": 1,
        "note": "This seems reasonable. Looking to see if there is a better deal.",
        "product_id": 4
      }
    ]
    ```

* Error response: User not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User couldn't be found"
    }
    ```

### Create a bookmark for a product

A product can only be bookmarked once by a user

* Require Authentication: True
* Request
  * Method: POST
  * URL: /api/products/:id/bookmarks
  * Body:
    ```json
      {
        "note": "This is cool! Will buy on Black Friday!"
      }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "created_at": "2024-02-28 14:06:21.128037",
        "customer_id": 1,
        "id": 6,
        "note": "This is cool! Will buy on Black Friday!",
        "product_id": 5
      }
    ```

* Error response: Product not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Product couldn't be found"
      }
    ```

* Error response: Duplicate bookmark
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "You already had a bookmark on this product"
      }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "note": [
          "This field is required."
        ]
      }
    ```

### Update a bookmark for a product
* Require Authentication: True
* Require Authorization: True - Current user must be the owner of the bookmark
* Request
  * Method: PUT
  * URL: /api/bookmarks/:id
  * Body:
    ```json
      {
        "note": "This is cool! Will buy on Black Friday! 222"
      }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
          "created_at": "2024-02-28 11:14:48.622326",
          "customer_id": 1,
          "id": 5,
          "note": "This is cool! Will buy on Black Friday! 222",
          "product_id": 10
      }
    ```

* Error response: Bookmark not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Bookmark couldn't be found"
      }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "note": [
          "This field is required."
        ]
      }
    ```

### Delete a bookmark by id
* Require Authentication: True
* Require Authorization: True. - Current user must be the owner of the bookmark
* Request
  * Method: DELETE
  * URL: /api/bookmarks/:id
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Successfully deleted bookmark"
      }
    ```

* Error response: Bookmark not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Bookmark couldn't be found"
      }

    ```

## ORDERS

### Get an order by id
* Require Authentication: True
* Require Authorization: True - Current user must be the owner of the order
* Request
  * Method: GET
  * URL: /api/orders/:id
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
          "created_at": "2024-02-28 11:14:48.629002",
          "customer_id": 1,
          "id": 1,
          "is_checkout": false,
          "items": [
              {
                  "created_at": "2024-02-28 11:14:48.636667",
                  "id": 1,
                  "order_id": 1,
                  "product_id": 1,
                  "quantity": 2
              },
              {
                  "created_at": "2024-02-28 11:14:48.636885",
                  "id": 2,
                  "order_id": 1,
                  "product_id": 2,
                  "quantity": 1
              },
              {
                  "created_at": "2024-02-28 11:14:48.636938",
                  "id": 3,
                  "order_id": 1,
                  "product_id": 13,
                  "quantity": 3
              }
          ]
      }
    ```

* Error response: Order not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Order couldn't be found"
      }
    ```

### Get all orders for the current user

At any point in time, there shuold be one and only 1 current checkout (meaning only 1 order with is_checkout = false)

* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/orders
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    [
      {
        "created_at": "2024-02-28 11:14:48.629002",
        "customer_id": 1,
        "id": 1,
        "is_checkout": false, // current items in the cart
        "items": [
          {
            "created_at": "2024-02-28 11:14:48.636667",
            "id": 1,
            "order_id": 1,
            "product_id": 1,
            "quantity": 2
          },
          {
            "created_at": "2024-02-28 11:14:48.636885",
            "id": 2,
            "order_id": 1,
            "product_id": 2,
            "quantity": 1
          },
          {
            "created_at": "2024-02-28 11:14:48.636938",
            "id": 3,
            "order_id": 1,
            "product_id": 13,
            "quantity": 3
          }
        ]
      },
      {
        "created_at": "2024-02-28 11:14:48.629298",
        "customer_id": 1,
        "id": 2,
        "is_checkout": true,  // past orders
        "items": [
          {
            "created_at": "2024-02-28 11:14:48.636979",
            "id": 4,
            "order_id": 2,
            "product_id": 3,
            "quantity": 4
          },
          {
            "created_at": "2024-02-28 11:14:48.637017",
            "id": 5,
            "order_id": 2,
            "product_id": 6,
            "quantity": 1
          }
        ]
      },
    ]
    ```

### Create an order for the current user
* Require Authentication: True
* Request
  * Method: POST
  * URL: /api/orders
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "created_at": "2024-02-28 15:33:50.491564",
        "customer_id": 2,
        "id": 4,
        "is_checkout": false,
        "items": []
      }
    ```

* Error response: Duplicate cart
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Please checkout first before creating another order"
      }
    ```

### Update the current order(in cart) for current user

If the product item is not yet in the cart(order), it will be added with the specified quantity.
If the product item is already in the cart, the quantity will be updated.

* Require Authentication: True
* Require Authorization: True - Current user must be the owner of the order
* Request
  * Method: PUT
  * URL: /api/orders/:id
  * Body:
    ```json
      {
        "product_id": 2,
        "quantity": 4
      }
    ```

* Successful Response (Quantity > 0)
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "created_at": "2024-02-28 16:22:35.357897",
      "id": 9,
      "order_id": 4,
      "product_id": 2,
      "quantity": 4
    }
    ```

* Successful Response (Quantity = 0)
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted item in the order"
    }
    ```

* Error response: Order not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Order couldn't be found"
      }
    ```

* Error response: Product not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Product couldn't be found"
      }
    ```

* Error response: Item not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      { // if quantity = 0 (trying to delete), but not found item in order
        "message": "Item couldn't be found"
      }
    ```

* Error response: Invalid quantity
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Quantity must be 1 when an item is first added to cart" || "Product has sold out" || "Not enough products to add to cart"
      }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "product_id": [
          "This field is required." || "Product ID must be positive"
        ],
        "quantity": [
          "This field is required." || "Quantity can not be negative"
        ]
      }
    ```

### Checkout order for current user
* Require Authentication: True
* Require Authorization: True - Current user must be the owner of the order
* Request
  * Method: GET
  * URL: /api/orders/:id/checkout
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Successfully checkout out"
      }
    ```

* Error response: Order not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "Order couldn't be found"
      }
    ```

* Error response: Duplicate checkout
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "This order is already checked out"
      }
    ```

* Error response: Empty order (cart)
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "message": "You have nothing to checkout"
      }
    ```
