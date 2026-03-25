# 📚 Student Management System API

## Overview

A **professional-grade REST API** for comprehensive student management built with **Node.js**, **Express.js**, and **MongoDB**. This API implements clean architecture principles, enterprise-level security, full input validation, and production-ready error handling. Perfect for educational institutions requiring a scalable student information management system.

**Status:** ✅ Production Ready | **Version:** 1.0.0 | **License:** ISC

---

## 🎯 Key Features

| Feature | Description |
|---------|-------------|
| 🔄 **Full CRUD Operations** | Create, read, update, and delete student records with comprehensive validation |
| 📊 **Pagination & Search** | Advanced filtering, pagination, and full-text search across student records |
| 🔐 **Enterprise Security** | Helmet.js security headers, CORS protection, rate limiting, and input sanitization |
| ⚡ **Rate Limiting** | 100 requests per 15 minutes per IP to prevent API abuse |
| 🛡️ **Input Validation** | Strict validation rules using express-validator with detailed error messages |
| 📝 **Comprehensive Logging** | Morgan HTTP logger for request tracking and debugging |
| ❌ **Error Handling** | Centralized global error handler with consistent response format |
| 🔧 **Clean Architecture** | Well-organized, maintainable code with separation of concerns (MVC pattern) |
| 📱 **REST API Standards** | Follows RESTful conventions with proper HTTP status codes |
| 🏥 **Health Monitoring** | Dedicated health-check endpoint for monitoring API availability |

---

## 🛠️ Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Runtime** | Node.js | 14+ | JavaScript execution environment |
| **Framework** | Express.js | 4.18.2 | Web framework and routing |
| **Database** | MongoDB | - | NoSQL database for flexible data storage |
| **ODM** | Mongoose | 7.5.0 | MongoDB object modeling and validation |
| **Validation** | express-validator | 7.0.1 | Input validation and sanitization |
| **Security** | Helmet.js | 7.1.0 | HTTP headers security |
| **CORS** | cors | 2.8.5 | Cross-origin resource sharing |
| **Logging** | Morgan | 1.10.0 | HTTP request logging middleware |
| **Rate Limit** | express-rate-limit | 7.1.5 | API throttling and rate limiting |
| **Env Config** | dotenv | 16.3.1 | Environment variable management |
| **Dev Tool** | nodemon | 3.0.1 | Auto-reload during development |

---

## 📁 Project Architecture

```
Assignment 01 Student Management System API/
│
├── src/
│   ├── app.js                          # Express app initialization & middleware setup
│   │
│   ├── config/
│   │   └── database.js                 # MongoDB connection & configuration
│   │
│   ├── models/
│   │   └── Student.js                  # Mongoose schema with validation rules
│   │
│   ├── controllers/
│   │   └── studentController.js        # Route handlers & business logic layer
│   │
│   ├── services/
│   │   └── studentService.js           # Database operations & data manipulation
│   │
│   ├── routes/
│   │   └── studentRoutes.js            # API endpoint definitions
│   │
│   └── middleware/
│       ├── validation.js               # Request validation middleware
│       ├── errorHandler.js             # Global error handling middleware
│       ├── logger.js                   # HTTP request logging (Morgan)
│       └── rateLimiter.js              # Rate limiting middleware
│
├── package.json                         # Dependencies and npm scripts
├── .env                                 # Environment variables (local config)
├── .gitignore                           # Git ignore patterns
└── README.md                            # Project documentation

```

### Architecture Pattern: **MVC (Model-View-Controller)**

- **Model** → `Student.js` - Database schema definition
- **Controller** → `studentController.js` - Request handling and response formatting
- **Service** → `studentService.js` - Business logic and database queries
- **Routes** → `studentRoutes.js` - API endpoint definitions

---

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB Atlas Account** - [Create Free Cluster](https://www.mongodb.com/cloud/atlas)

### Step 1: Clone & Install

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd "Assignment 01 Student Management System API"

# Install all dependencies
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Atlas Connection
MONGO_URI=mongodb+srv://username:password@cluster-name.mongodb.net/student_management?appName=StudentAPI
```

**How to get MongoDB URI:**

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Login to your account or create a new one
3. Create a new cluster or select existing one
4. Click **"Connect"** button
5. Choose **"Drivers"** option
6. Copy the connection string
7. Replace `username` with your database user
8. Replace `password` with your database password
9. Replace `cluster-name` with your cluster name
10. ⚠️ **CRITICAL:** Whitelist your IP address in Network Access settings

### Step 3: Start the Application

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start

# Verify server is running
curl http://localhost:3000/health
```

You should see:
```json
{
  "status": "OK...",
  "message": "Server is running..."
}
```

---

## 📡 Complete API Reference

### Base URL
```
http://localhost:3000/api/v1/students
```

### Endpoints Summary

| HTTP Method | Endpoint | Status | Response | Purpose |
|-------------|----------|--------|----------|---------|
| **POST** | `/student-create` | 201 | Created student | Create new student record |
| **GET** | `/all-students` | 200 | List of students | Retrieve all students with pagination |
| **GET** | `/student-get-one-student/:id` | 200 | Single student | Get specific student by ID |
| **PUT** | `/student-update/:id` | 200 | Updated student | Modify student information |
| **DELETE** | `/student-delete/:id` | 200 | Success message | Remove student record |

---

## 📝 Detailed API Examples

### 1️⃣ CREATE Student - `POST /student-create`

Creates a new student record in the database.

**Request:**
```bash
curl -X POST http://localhost:3000/api/v1/students/student-create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gothama Thero",
    "email": "gothama@university.edu",
    "age": 19,
    "phone": "0705453790",
    "address": "Colombo, Sri Lanka",
    "gender": "Male",
    "course": "Computer Science"
  }'
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "65e8a9c2d4b1f2e8c9a1b2c3",
    "name": "Gothama Thero",
    "email": "gothama@university.edu",
    "age": 19,
    "phone": "0705453790",
    "address": "Colombo, Sri Lanka",
    "gender": "Male",
    "course": "Computer Science",
    "createdAt": "2026-03-19T07:19:17.628Z",
    "updatedAt": "2026-03-19T07:19:17.628Z"
  }
}
```

**Validation Rules:**
- `name`: 2-50 characters, required
- `email`: Valid email format, unique, required
- `age`: 16-100 years old, required
- `phone`: Unique phone number, required
- `address`: Min 2 characters, required
- `gender`: Required, trimmed
- `course`: Min 2 characters, required

---

### 2️⃣ READ All Students - `GET /all-students`

Retrieve paginated list of students with optional search and filtering.

**Request with All Options:**
```bash
GET http://localhost:3000/api/v1/students/all-students?page=1&limit=10&search=Gothama
```

**Query Parameters:**
- `page` - Page number (default: 1, min: 1)
- `limit` - Records per page (default: 10, min: 1, max: 100)
- `search` - Search query (searches name and email, max: 100 chars)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65e8a9c2d4b1f2e8c9a1b2c3",
      "name": "Gothama Thero",
      "email": "gothama@university.edu",
      "age": 19,
      "phone": "0705453790",
      "address": "Colombo, Sri Lanka",
      "gender": "Male",
      "course": "Computer Science",
      "createdAt": "2026-03-19T07:19:17.628Z",
      "updatedAt": "2026-03-19T07:19:17.628Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "pages": 2
  }
}
```

---

### 3️⃣ READ Single Student - `GET /student-get-one-student/:id`

Retrieve a specific student by their MongoDB ID.

**Request:**
```bash
curl http://localhost:3000/api/v1/students/student-get-one-student/65e8a9c2d4b1f2e8c9a1b2c3
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65e8a9c2d4b1f2e8c9a1b2c3",
    "name": "Gothama Thero",
    "email": "gothama@university.edu",
    "age": 19,
    "phone": "0705453790",
    "address": "Colombo, Sri Lanka",
    "gender": "Male",
    "course": "Computer Science",
    "createdAt": "2026-03-19T07:19:17.628Z",
    "updatedAt": "2026-03-19T07:19:17.628Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Student not found..."
}
```

---

### 4️⃣ UPDATE Student - `PUT /student-update/:id`

Modify student information. Only include fields you want to update.

**Request:**
```bash
curl -X PUT http://localhost:3000/api/v1/students/student-update/65e8a9c2d4b1f2e8c9a1b2c3 \
  -H "Content-Type: application/json" \
  -d '{
    "course": "Information Technology",
    "age": 20,
    "address": "Galle, Sri Lanka"
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65e8a9c2d4b1f2e8c9a1b2c3",
    "name": "Gothama Thero",
    "email": "gothama@university.edu",
    "age": 20,
    "phone": "0705453790",
    "address": "Galle, Sri Lanka",
    "gender": "Male",
    "course": "Information Technology",
    "createdAt": "2026-03-19T07:19:17.628Z",
    "updatedAt": "2026-03-19T09:30:45.123Z"
  }
}
```

---

### 5️⃣ DELETE Student - `DELETE /student-delete/:id`

Remove a student record from the database.

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/v1/students/student-delete/65e8a9c2d4b1f2e8c9a1b2c3
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully..."
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Student not found..."
}
```

---

### 🏥 Health Check - `GET /health`

Check if the API is running and accessible.

**Request:**
```bash
curl http://localhost:3000/health
```

**Response (200 OK):**
```json
{
  "status": "OK...",
  "message": "Server is running..."
}
```

---

## ❌ Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Please provide a valid email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": 15,
      "msg": "Age must be between 16 and 100",
      "path": "age",
      "location": "body"
    }
  ]
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "message": "Student not found..."
}
```

### Rate Limit Exceeded (429)
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## HTTP Status Codes Reference

| Code | Status | Meaning |
|------|--------|---------|
| **200** | OK | Request successful, data returned |
| **201** | Created | New resource successfully created |
| **400** | Bad Request | Validation failed or invalid input |
| **404** | Not Found | Resource (student) not found |
| **429** | Too Many Requests | Rate limit exceeded (100/15min) |
| **500** | Server Error | Internal server error occurred |

---

## 🔒 Security Implementation

### 1. **Helmet.js** - HTTP Headers Security
Protects against common vulnerabilities:
- XSS (Cross-Site Scripting) attacks
- Clickjacking attacks
- MIME type sniffing
- Content Security Policy (CSP)

### 2. **CORS (Cross-Origin Resource Sharing)**
Controls which domains can access the API
- Configurable origin whitelist
- Prevents unauthorized cross-origin requests

### 3. **Rate Limiting**
```
Configuration: 100 requests per 15 minutes per IP
Purpose: Prevents DoS attacks and API abuse
```

### 4. **Input Validation & Sanitization**
- All inputs validated using express-validator
- Data trimmed and sanitized
- Type checking and format validation
- Unique field enforcement (email, phone)

### 5. **MongoDB Atlas IP Whitelist**
Only whitelisted IP addresses can access the database

### 6. **Environment Variables**
Sensitive data stored in `.env` file (never committed to git)

---

## 📊 Database Schema

### Student Model

```javascript
{
  _id: ObjectId,                    // Unique identifier (auto-generated)
  
  name: {
    type: String,
    required: true,
    trim: true,                     // Removes whitespace
    minlength: 2,
    maxlength: 50
  },
  
  email: {
    type: String,
    required: true,
    unique: true,                   // No duplicate emails
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/  // Valid email format
  },
  
  age: {
    type: Number,
    required: true,
    min: 16,
    max: 100
  },
  
  phone: {
    type: String,
    required: true,
    unique: true,                   // No duplicate phone numbers
    trim: true
  },
  
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  
  gender: {
    type: String,
    required: true,
    trim: true
  },
  
  course: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  
  createdAt: {
    type: Date,
    default: Date.now               // Auto-set to current time
  },
  
  updatedAt: {
    type: Date,
    default: Date.now               // Auto-updated on modifications
  }
}
```

---

## 🧪 Testing & Debugging

### Using Postman (Recommended)

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new request collection
3. Add requests for each endpoint
4. Set base URL: `http://localhost:3000/api/v1/students`
5. Test all endpoints

### Using cURL Commands

**Create Student:**
```bash
curl -X POST http://localhost:3000/api/v1/students/student-create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 20,
    "phone": "0701234567",
    "address": "Colombo",
    "gender": "Male",
    "course": "Engineering"
  }'
```

**Get All Students:**
```bash
curl http://localhost:3000/api/v1/students/all-students?page=1&limit=10
```

**Search Students:**
```bash
curl http://localhost:3000/api/v1/students/all-students?search=John&limit=5
```

**Get Specific Student (replace ID):**
```bash
curl http://localhost:3000/api/v1/students/student-get-one-student/65e8a9c2d4b1f2e8c9a1b2c3
```

**Update Student (replace ID):**
```bash
curl -X PUT http://localhost:3000/api/v1/students/student-update/65e8a9c2d4b1f2e8c9a1b2c3 \
  -H "Content-Type: application/json" \
  -d '{"course": "Data Science", "age": 21}'
```

**Delete Student (replace ID):**
```bash
curl -X DELETE http://localhost:3000/api/v1/students/student-delete/65e8a9c2d4b1f2e8c9a1b2c3
```

---

## 🔧 Middleware Pipeline

API request flow through middleware in order:

```
1. helmet()           → Add security headers
   ↓
2. cors()             → Check CORS policy
   ↓
3. morgan()           → Log HTTP request
   ↓
4. rateLimiter        → Check rate limit
   ↓
5. express.json()     → Parse JSON body
   ↓
6. express.urlencoded()  → Parse URL-encoded data
   ↓
7. validation MW      → Validate request data
   ↓
8. Route Handler      → Execute business logic
   ↓
9. errorHandler       → Catch and format errors
```

---

## 🌍 Troubleshooting Guide

### ❌ MongoDB Connection Error
```
Error: Could not connect to any servers in your MongoDB Atlas cluster
```

**Solutions:**
1. Go to [MongoDB Atlas Console](https://cloud.mongodb.com)
2. Navigate to: **Network Access** → **Add IP Address**
3. Add your current IP address (get it from `ipify.org`)
4. Or click **Allow Access from Anywhere** (for development only)
5. Wait 2-5 minutes for changes to propagate

---

### ❌ Port Already in Use Error
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

**Windows:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with the number from above)
taskkill /PID 12345 /F

# Or change port in .env
PORT=3001
```

**Mac/Linux:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill process (replace PID)
kill -9 12345

# Or change port in .env
PORT=3001
```

---

### ❌ Validation Errors

**Email validation failed:**
```json
{
  "msg": "Please provide a valid email"
}
```
✅ Use format: `user@domain.com`

**Age validation failed:**
```json
{
  "msg": "Age must be between 16 and 100"
}
```
✅ Age must be minimum 16 and maximum 100

**Duplicate email/phone:**
```json
{
  "msg": "Duplicate field value entered"
}
```
✅ Email and phone must be unique across all students

---

### ❌ Rate Limit Exceeded
```
Error: Too many requests from this IP, please try again later.
```

**Solution:**
- Limit: 100 requests per 15 minutes
- Wait 15 minutes or change your IP address
- Contact API administrator for higher limits

---

## 📚 npm Scripts

```bash
# Start application in production mode
npm start

# Start application in development mode (auto-reload on changes)
npm run dev
```

---

## 📖 Code Walkthrough

### app.js - Application Entry Point
```javascript
- Initializes Express application
- Sets up middleware in order
- Defines routes
- Error handling
- Starts server on specified port
```

### studentController.js - Request Handlers
```javascript
- createStudent()     → Handles POST requests
- getAllStudents()    → Handles GET with pagination
- getStudentById()    → Handles GET by ID
- updateStudent()     → Handles PUT requests
- deleteStudent()     → Handles DELETE requests
```

### studentService.js - Business Logic
```javascript
- Contains all database queries
- Handles data manipulation
- Implements search and pagination logic
```

### validation.js - Input Validation
```javascript
- Defines validation rules for each endpoint
- Checks data types and formats
- Ensures data integrity
```

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork the repository**
   ```bash
   git clone <your-fork-url>
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Make your changes and commit**
   ```bash
   git add .
   git commit -m "Add: Brief description of changes"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/YourFeatureName
   ```

5. **Open a Pull Request**
   - Describe changes clearly
   - Include any relevant issue numbers

---

## 🎯 Future Roadmap

- [ ] **Authentication (JWT)** - Secure user login and authorization
- [ ] **Role-Based Access Control** - Admin, teacher, student roles
- [ ] **File Upload** - Support for profile pictures and documents
- [ ] **Email Notifications** - Send confirmation emails for enrollments
- [ ] **Advanced Analytics** - Student enrollment statistics and reports
- [ ] **API Documentation (Swagger)** - Interactive API documentation
- [ ] **Unit Tests** - Jest/Mocha test coverage
- [ ] **Docker Support** - Containerization for easy deployment
- [ ] **Caching Layer** - Redis integration for performance
- [ ] **GraphQL Support** - Alternative to REST API
- [ ] **Internationalization (i18n)** - Multi-language support
- [ ] **Audit Logging** - Track all data modifications

---

## 📄 License

This project is licensed under the **ISC License** - see package.json for details.

---

## 👨‍💼 Project Information

| Detail | Value |
|--------|-------|
| **Project Name** | Student Management System API |
| **Version** | 1.0.0 |
| **Created** | March 2026 |
| **Status** | ✅ Production Ready |
| **Maintenance** | Active |
| **Node.js Version** | 14+ |

---

## 📞 Support & Questions

Have questions or need help?

1. **Check the documentation** - This README covers most scenarios
2. **Review error messages** - They provide detailed troubleshooting info
3. **Check logs** - Look at console output and Morgan logs
4. **Create an issue** - Include:
   - Error message/code
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version)

---

## 🙏 Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)
- Powered by [Node.js](https://nodejs.org/)
- Thanks to the open-source community

---

**Happy Coding! 🚀** | Questions? Check the troubleshooting section above
