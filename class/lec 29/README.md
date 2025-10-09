# User and Tweet Management API

A Node.js REST API built with Express.js and Prisma for managing users and tweets.

## Features

- **User Management**: Create, read, update, and delete users
- **Tweet Management**: Create, read, update, and delete tweets
- **Database Relations**: Users can have multiple tweets
- **Error Handling**: Comprehensive error handling and validation
- **API Documentation**: Built-in endpoint documentation

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Built-in request validation

## Project Structure

```
├── controller/
│   └── userController.js    # API controllers for users and tweets
├── service/
│   └── userService.js       # Business logic and database operations
├── routes/
│   └── userRoutes.js        # API route definitions
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── index.js                 # Server entry point
└── package.json            # Dependencies and scripts
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
PORT=3000
NODE_ENV=development
```

### 3. Database Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

### 4. Start the Server

Development mode (with auto-restart):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create a new user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:email` | Get user by email |
| PUT | `/api/users/:id` | Update user by ID |
| DELETE | `/api/users/:id` | Delete user by ID |

### Tweets

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tweets` | Create a new tweet |
| GET | `/api/tweets` | Get all tweets |
| PUT | `/api/tweets/:id` | Update tweet by ID |
| DELETE | `/api/tweets/:id` | Delete tweet by ID |

## API Usage Examples

### Create User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "name": "John Doe"}'
```

### Create Tweet

```bash
curl -X POST http://localhost:3000/api/tweets \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "body": "This is my first tweet!"}'
```

### Get All Tweets

```bash
curl http://localhost:3000/api/tweets
```

## Database Schema

### User Model

```prisma
model User {
  id     Int     @id @default(autoincrement())
  email  String  @unique
  name   String?
  tweets Tweet[]
}
```

### Tweet Model

```prisma
model Tweet {
  id     Int      @id @default(autoincrement())
  userId Int
  date   DateTime @default(now())
  body   String
  user   User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Missing required fields
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server errors

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Development

For development with auto-restart:

```bash
npm run dev
```

This uses nodemon to automatically restart the server when files change.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

ISC