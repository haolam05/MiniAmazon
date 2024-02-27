# MiniAmazon

## https://miniamazon.onrender.com

## Database Schema Design

![miniamazon-database-schema]

[miniamazon-database-schema]: https://miniamazon.s3.us-west-2.amazonaws.com/public/mini-amazon-database-schema.png

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
* Error response: Bad request
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": [
          "Email provided not found."
      ]
    }

    or

    {
      "password": [
        "Password was incorrect."
      ]
    }
    ```

### Log Out a User

Logs out the current user, ending their session.

* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/auth/logout
  * Headers:
    * Content-Type: application/json
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
          "Email is invalid."
      ],
      "first_name": [
          "This field is required."
      ],
      "last_name": [
          "This field is required."
      ],
      "password": [
          "Password must be at least 6 characters."
      ],
      "username": [
          "Username must be at least 4 characters."
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
  * Headers:
    * Content-Type: application/json
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
  * Headers:
    * Content-Type: application/json
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
