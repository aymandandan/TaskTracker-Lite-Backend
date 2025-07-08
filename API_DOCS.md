# TaskTracker Lite API Documentation

## Authentication

### Register a New User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**:
    ```json
    {
      "status": "success",
      "token": "jwt_token_here",
      "data": {
        "user": {
          "_id": "user_id_here",
          "username": "testuser",
          "email": "test@example.com"
        }
      }
    }
    ```

### Login User
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "status": "success",
      "token": "jwt_token_here",
      "data": {
        "user": {
          "_id": "user_id_here",
          "username": "testuser",
          "email": "test@example.com"
        }
      }
    }
    ```

### Get Current User
- **URL**: `/api/auth/me`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer your_jwt_token_here`
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "status": "success",
      "data": {
        "user": {
          "_id": "user_id_here",
          "username": "testuser",
          "email": "test@example.com"
        }
      }
    }
    ```

## Error Responses

### 400 Bad Request
- **Condition**: Invalid input data
- **Response**:
  ```json
  {
    "status": "error",
    "message": "Validation failed",
    "errors": [
      "Username must be between 3 and 30 characters",
      "Please provide a valid email"
    ]
  }
  ```

### 401 Unauthorized
- **Condition**: Invalid or missing token
- **Response**:
  ```json
  {
    "status": "error",
    "message": "You are not logged in! Please log in to get access."
  }
  ```

### 500 Internal Server Error
- **Condition**: Server error
- **Response**:
  ```json
  {
    "status": "error",
    "message": "Something went wrong!"
  }
  ```

## Environment Variables

Make sure to set up the following environment variables in your `.env` file:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tasktracker
JWT_SECRET=your_ultra_secure_jwt_secret_key_here
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
CLIENT_URL=http://localhost:3000
```
