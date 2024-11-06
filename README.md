# Task Manager API

This is a simple task manager API where users can register, login, and manage tasks. Users can create, update, and delete tasks. The API is built using Node.js, Express, and MongoDB.

## API Endpoints

### 1. Authentication Routes

#### **POST** `/api/auth/register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **201**: User registered successfully.
    ```json
    {
      "message": "User registered successfully",
      "user": { "id": "userId", "username": "string", "email": "string" }
    }
    ```
  - **400**: User already exists.
    ```json
    { "message": "User already exists" }
    ```
  - **500**: Internal Server Error.

#### **POST** `/api/auth/login`
- **Description**: Logs in an existing user.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **201**: Login successful.
    ```json
    {
      "message": "Login successful",
      "token": "JWT_TOKEN"
    }
    ```
  - **401**: Invalid credentials.
    ```json
    { "message": "Invalid credentials" }
    ```
  - **500**: Internal Server Error.

---

### 2. Task Routes

#### **POST** `/api/tasks/:userId/create`
- **Description**: Creates a new task for the user with the specified `userId`.
- **Parameters**:
  - `userId` (required): The ID of the user creating the task.
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string"
  }
  ```
- **Response**:
  - **201**: Task created successfully.
    ```json
    {
      "message": "Task added successfully",
      "task": { "id": "taskId", "title": "string", "description": "string", "completed": false, "user": "userId" }
    }
    ```
  - **404**: User not found.
    ```json
    { "message": "User not found" }
    ```
  - **500**: Internal Server Error.

#### **GET** `/api/tasks/:userId/`
- **Description**: Gets all tasks for the user with the specified `userId`.
- **Parameters**:
  - `userId` (required): The ID of the user.
- **Response**:
  - **200**: Returns all tasks for the user.
    ```json
    {
      "tasks": [
        { "id": "taskId", "title": "string", "description": "string", "completed": false },
        { "id": "taskId", "title": "string", "description": "string", "completed": true }
      ]
    }
    ```
  - **404**: User not found.
    ```json
    { "message": "User not found" }
    ```
  - **500**: Internal Server Error.

#### **GET** `/api/tasks/:userId/:id`
- **Description**: Gets a specific task by ID for the user with the specified `userId`.
- **Parameters**:
  - `userId` (required): The ID of the user.
  - `id` (required): The ID of the task.
- **Response**:
  - **200**: Returns the task.
    ```json
    {
      "task": { "id": "taskId", "title": "string", "description": "string", "completed": false }
    }
    ```
  - **404**: User or task not found.
    ```json
    { "message": "User not found" } or { "message": "Task not found" }
    ```
  - **500**: Internal Server Error.

#### **PUT** `/api/tasks/:userId/:id`
- **Description**: Updates an existing task for the user with the specified `userId`.
- **Parameters**:
  - `userId` (required): The ID of the user.
  - `id` (required): The ID of the task.
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "completed": true/false
  }
  ```
- **Response**:
  - **201**: Task updated successfully.
    ```json
    {
      "message": "Task updated successfully",
      "task": { "id": "taskId", "title": "string", "description": "string", "completed": true }
    }
    ```
  - **404**: User or task not found.
    ```json
    { "message": "User not found" } or { "message": "Task not found" }
    ```
  - **403**: Unauthorized access (if the user is trying to edit a task not belonging to them).
    ```json
    { "message": "Unauthorized" }
    ```
  - **500**: Internal Server Error.

#### **DELETE** `/api/tasks/:userId/:id`
- **Description**: Deletes a task for the user with the specified `userId`.
- **Parameters**:
  - `userId` (required): The ID of the user.
  - `id` (required): The ID of the task.
- **Response**:
  - **200**: Task deleted successfully.
    ```json
    { "message": "Task deleted successfully" }
    ```
  - **404**: User or task not found.
    ```json
    { "message": "User not found" } or { "message": "Task not found" }
    ```
  - **403**: Unauthorized access (if the user is trying to delete a task not belonging to them).
    ```json
    { "message": "Unauthorized" }
    ```
  - **500**: Internal Server Error.

---

## Authentication

- All routes for tasks require the user to be authenticated. The `Authorization` header should contain the JWT token obtained from the login endpoint.

```bash
Authorization: Bearer <JWT_TOKEN>
```

---

## Notes

- All tasks are associated with a user by the `userId`. 
- Tasks can be created, updated, or deleted by the user who created them.
- Ensure the user has valid authentication before accessing task-related routes.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

## Setup

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Set up environment variables in a `.env` file:
   - `PORT=5000`
   - `MONGO_URI=mongodb://127.0.0.1:27017/task-manager`
   - `JWT_SECRET=your_jwt_secret_key`
4. Run the app with `npm start`.
