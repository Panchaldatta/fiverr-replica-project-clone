
# Fiverr Clone Backend

This is the backend API for the Fiverr Clone project. It provides endpoints for user authentication, gigs, orders, and earnings management.

## Setup Instructions

1. **Install dependencies**

```bash
cd backend
npm install
```

2. **Configure environment variables**

Create a `.env` file in the root directory and add the following:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fiverr-clone
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

Replace the `MONGODB_URI` with your MongoDB connection string and set a secure `JWT_SECRET`.

3. **Start the server**

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user (protected)

### User Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)
- `GET /api/users/:id/gigs` - Get user's gigs
- `GET /api/users/:id/earnings` - Get user's earnings (protected)

### Gig Endpoints

- `GET /api/gigs` - Get all gigs
- `GET /api/gigs/category/:category` - Get gigs by category
- `GET /api/gigs/:id` - Get a specific gig
- `POST /api/gigs` - Create a new gig (protected)
- `PUT /api/gigs/:id` - Update a gig (protected)
- `DELETE /api/gigs/:id` - Delete a gig (protected)

### Order Endpoints

- `GET /api/orders` - Get all orders (protected)
- `GET /api/orders/:id` - Get a specific order (protected)
- `POST /api/orders` - Create a new order (protected)
- `PUT /api/orders/:id` - Update an order (protected)
- `GET /api/orders/buyer` - Get buyer orders (protected)
- `GET /api/orders/seller` - Get seller orders (protected)

## Models

- **User**: Handles user accounts and profiles
- **Gig**: Manages services offered by sellers
- **Order**: Tracks purchases between buyers and sellers
- **Review**: Stores ratings and feedback for gigs
- **Earnings**: Tracks seller earnings and payment status

## Authentication

The API uses JWT (JSON Web Token) authentication. Protected routes require a valid token sent in the Authorization header:

```
Authorization: Bearer <token>
```

## Error Handling

The API uses a centralized error handler middleware that formats error responses consistently:

```json
{
  "success": false,
  "error": "Error message here"
}
```
