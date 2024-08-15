# Online Pharmacy Application
Overview
This is an online pharmacy application developed using NestJS. The application provides functionality for user registration and login, managing products, and placing orders. It uses JWT for authentication and is containerized using Docker.

# Technologies Used
#### NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
#### TypeORM: An ORM that works with TypeScript and JavaScript.
#### PostgreSQL: A powerful, open-source object-relational database system.
#### JWT (JSON Web Token): Used for authentication and authorization.
#### Swagger: For API documentation and testing.
#### Docker: Containerization of the application and database.
### Main Entities
#### User: Represents a user in the system with properties such as id, username, email, and password.
#### Product: Represents a product available in the pharmacy with properties such as id, name, description, and price.
#### Order: Represents an order placed by a user, which includes properties such as id, userId, and productId.
#### Authentication
The application uses JWT (JSON Web Token) for user authentication. Users can register and log in to obtain a token, which must be included in the Authorization header for protected routes.

## API Documentation
The Swagger documentation for the API is available at:
http://localhost:3000/swagger-ui

## Docker Setup
The application uses Docker for containerization. The docker-compose.yml file sets up both the application and the PostgreSQL database.

Docker Compose File
```
version: '3.8'

services:
  postgres:
    image: postgres:13
    container_name: postgres_db
    environment:
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  app:
    image: your-app-image
    container_name: nest_app
    ports:
      - '3000:3000'
    depends_on:
      - postgres
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USERNAME: ${DB_USERNAME}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}

volumes:
  postgres_data:
  ```
## Environment Configuration
Create a .env file in the root directory with the following content:

```
DB_NAME=your_db_name
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
```
## Running the Application
Build and Start Containers:

```
docker-compose up --build
```
### Access the Application:

Swagger Documentation: http://localhost:3000/swagger-ui
Application: http://localhost:3000
Contribution
Feel free to contribute to this project by submitting issues or pull requests.