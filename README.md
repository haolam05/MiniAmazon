# MiniAmazon

## https://miniamazon.onrender.com

## Database Schema Design

![miniamazon-database-schema]

[miniamazon-database-schema]: https://miniamazon.s3.us-west-2.amazonaws.com/public/miniAmazon-database-schema.png

# Demo

## Sign up

## Login

## Logout


## Technologies

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
      "profile_image_url": "https://meetup2024.s3.us-west-2.amazonaws.com/public/avatar2.png" || null
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
        "profile_image_url": "https://meetup2024.s3.us-west-2.amazonaws.com/public/avatar2.png" || null,
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
            "profile_image_url": "https://miniamazon.s3.us-west-2.amazonaws.com/public/avatar1.png",
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
      "profile_image_url": "https://miniamazon.s3.us-west-2.amazonaws.com/public/avatar1.png",
      "username": "haolam"
    }
    ```

* Error response: Workspace not found
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
      "profile_image_url": "https://meetup2024.s3.us-west-2.amazonaws.com/public/avatar2.png" || null
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
        "profile_image_url": "https://meetup2024.s3.us-west-2.amazonaws.com/public/avatar2.png" || null,
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
            "product_image": "https://miniamazon.s3.us-west-2.amazonaws.com/public/avocado.jpg",
            "remaining": 22,
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
          "product_image": "https://miniamazon.s3.us-west-2.amazonaws.com/public/puzzle.jpg",
          "remaining": 50,
          "seller_id": 1
      }
    ```

* Error response: Workspace not found
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

Delete an existing product by id.

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
