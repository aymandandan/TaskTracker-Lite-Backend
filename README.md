# TaskTracker Lite - Backend

This is the backend for TaskTracker Lite, a full-stack task management application. The backend is built with Node.js, Express.js, and MongoDB, providing a RESTful API for the frontend application.

## ✨ Features

- **User Authentication**
  - JWT-based authentication with HTTP-only cookies
  - Secure password hashing with bcrypt
  - Role-based access control
  - Password reset functionality via email

- **Task Management**
  - CRUD operations for tasks
  - Task filtering, sorting and search
  - Data validation and sanitization

- **Security**
  - Rate limiting
  - Data sanitization
  - CORS protection
  - XSS protection

- **API Documentation**
  - OpenAPI/Swagger documentation
  - Request/response validation
  - Example requests

## 🚀 Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher) or yarn (v1.22 or higher)
- MongoDB (v5.0 or higher) or MongoDB Atlas account
- Git

## 🛠️ Setup Instructions

1. **Clone the repository** (if you haven't already)
   ```bash
   git clone https://github.com/aymandandan/tasktracker-lite.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the server directory with the following variables:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # Authentication
   JWT_SECRET=your_secure_jwt_secret_key
   JWT_EXPIRES_IN=30d
   JWT_COOKIE_EXPIRES_IN=30
   
   # Email (for password reset)
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USERNAME=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   EMAIL_FROM=TaskTracker <noreply@tasktracker.com>
   
   # Frontend URL (for CORS and email templates)
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   This will start the development server at [http://localhost:5000](http://localhost:5000)

## 🚀 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier

## 🛠️ Tech Stack

### Core
- Node.js
- Express.js
- MongoDB with Mongoose ODM

### Authentication & Security
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- Express Rate Limit
- Express Validator
- Express Mongo Sanitize
- XSS protection

### Development Tools
- Nodemon for development
- ESLint + Prettier for code quality
- Jest for testing
- Swagger/OpenAPI for API documentation

## 🧪 Testing

Run the test suite with:

```bash
npm test
# or
yarn test
```

Run tests with coverage report:

```bash
npm test -- --coverage
# or
yarn test --coverage
```

## 📦 Building for Production

1. **Set environment to production**
   ```bash
   NODE_ENV=production
   ```

2. **Install production dependencies**
   ```bash
   npm install --production
   # or
   yarn install --production
   ```

3. **Start the production server**
   ```bash
   npm start
   # or
   yarn start
   ```

## 🔍 API Documentation

API documentation is available at `/api-docs` when running in development mode. The documentation is generated using Swagger/OpenAPI.

To view the API documentation:
1. Start the development server
2. Visit `http://localhost:5000/api-docs`

## 🔒 Security Best Practices

1. Always use HTTPS in production
2. Keep dependencies up to date
3. Use environment variables for sensitive data
4. Implement rate limiting
5. Use HTTP security headers
6. Sanitize user input
7. Validate request data
8. Use parameterized queries
9. Implement proper error handling
10. Regular security audits

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework
- [MongoDB](https://www.mongodb.com/) - The database for modern applications
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling
- [JWT](https://jwt.io/) - JSON Web Tokens
- [Nodemailer](https://nodemailer.com/) - Send emails from Node.js
