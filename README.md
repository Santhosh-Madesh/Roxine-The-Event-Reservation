# Roxine Event Reservation API

This project is a Node.js + Express backend for event browsing, ticket billing, booking, and organiser/organisation management.

## Base URL

- Local development: <will_be_revealed_soon_lol>
- The server also exposes a health endpoint at /health.

## Environment Variables

Create a .env file in the project root with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

## Running the Project

```bash
npm install
npm run dev
```

## Authentication

Most protected routes require a JWT bearer token in the Authorization header:

```http
Authorization: Bearer <token>
```

Tokens are issued by the login endpoint after successful authentication.

## Response Conventions

- Success responses usually return `success: true`.
- Validation and business-rule failures return `4xx` status codes.
- Server errors return `5xx` status codes.

---

## 1) Health Check

### GET /health
Returns a simple server health status.

Response:

```json
{
  "success": true,
  "message": "Server is healthy"
}
```

---

## 2) User Endpoints

### POST /user/register
Create a new user account.

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "strongpassword"
}
```

Validation rules:
- `name`: minimum 8 characters
- `email`: valid email
- `password`: minimum 8 characters

Response: `201 Created`

### POST /user/login
Authenticate a user and receive a JWT token.

Request body:

```json
{
  "email": "john@example.com",
  "password": "strongpassword"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "<jwt_token>"
}
```

### GET /user/profile
Get authenticated user profile details.

Requires authentication.

Response:

```json
{
  "success": true,
  "message": "User data retrieved successfully",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "active": true
  }
}
```

### DELETE /user
Delete the authenticated user's account.

Requires authentication.

Response: `204 No Content`

### PUT /user/changePassword
Change the authenticated user's password.

Requires authentication.

Request body:

```json
{
  "password": "newstrongpassword"
}
```

Response: `204 No Content`

---

## 3) Organisation Request Endpoints

### POST /organiser/request
Submit an organisation request for the authenticated user.

Requires authentication.

Request body:

```json
{
  "name": "Roxine Events"
}
```

### GET /organiser/request/status
Check the status of the authenticated user's organisation request.

Requires authentication.

### PUT /organiser/request/update
Update an organisation request status. This route is restricted to admin users.

Requires authentication and admin privileges.

Request body:

```json
{
  "userId": "<mongodb_object_id>",
  "newObj": {
    "status": "accepted"
  }
}
```

Allowed statuses:
- `pending`
- `rejected`
- `accepted`

---

## 4) Event Management Endpoints (Organiser/Admin)

These routes are mounted under `/organiser` in the current server configuration.

### POST /organiser/event
Create a new event.

Requires authentication and organiser/admin permission.

Request body:

```json
{
  "name": "Summer Festival",
  "date": "2026-08-15",
  "duration": 4,
  "description": "A full-day music and food festival with exciting performances.",
  "photo": "/images/summer-festival.jpg",
  "available_tickets": 200,
  "cost": 1500
}
```

Notes:
- `date` should be a valid ISO date string.
- `duration` and `cost` must be positive numbers.
- `available_tickets` must be a positive number.

### PUT /organiser/event/:eventId
Update an existing event.

Requires authentication, organiser/admin permission, and ownership of the event.

### DELETE /organiser/event/:eventId
Delete an existing event.

Requires authentication, organiser/admin permission, and ownership of the event.

---

## 5) Event Discovery and Booking Endpoints

These routes are mounted under `/event` in the current server configuration.

### GET /event
Retrieve all events.

Requires authentication.

### GET /event/:name
Retrieve events whose name matches the provided route parameter.

Example:

```http
GET /event/Summer%20Festival
```

Requires authentication.

### GET /event/filter/query
Filter events by query parameters.

Example:

```http
GET /event/filter/query?name=Summer&date=2026-08-15&cost=1500
```

Accepted query parameters:
- `name`
- `date`
- `cost`

### GET /event/paginate/event
Retrieve events with pagination.

Example:

```http
GET /event/paginate/event?offset=0&limit=5
```

Requires authentication.

### POST /event/bill
Generate a bill for a ticket purchase without completing the booking.

Requires authentication.

Request body:

```json
{
  "event_id": "<mongodb_object_id>",
  "no_of_tickets": 2
}
```

### POST /event/payment
Book tickets and complete payment.

Requires authentication.

Request body:

```json
{
  "event_id": "<mongodb_object_id>",
  "no_of_tickets": 2,
  "amount": 3000
}
```

The server checks:
- whether the event exists
- whether enough tickets are available
- whether the provided amount matches the generated bill total

### GET /event/filter/search
Search events by name using a simple search query.

Example:

```http
GET /event/filter/search?search=Summer
```

---

## 6) Organisation User Management Endpoints

These routes are defined in the codebase under the organisation user route file, but they are not currently mounted in the main server entrypoint.

### POST /organisation/organiser
Create an organiser account.

### PUT /organisation/organiser
Update organiser information.

### DELETE /organisation/organiser
Delete an organiser account.

These routes require authentication and organisation-level permission handling.

---

## Notes

- The project uses Zod for request validation.
- The authentication middleware expects JWTs signed with the `JWT_SECRET_KEY` environment variable.
- The current implementation uses MongoDB through Mongoose.
