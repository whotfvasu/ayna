# Feedback Form Application

A full-stack web application for creating and managing feedback forms with user authentication and admin dashboard.

## Features

- 🔐 **User Authentication**: JWT-based login/register system
- 📋 **Form Management**: Create, edit, and manage feedback forms
- 📊 **Response Collection**: Collect and view form submissions
- 👤 **Admin Dashboard**: Admin-only access to view all responses
- 🎨 **Modern UI**: Clean and responsive design

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ayna
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

## Environment Setup

1. **Backend Environment Variables:**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/feedback-app
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

2. **MongoDB Setup:**
   - **Local MongoDB**: Install and start MongoDB service
   - **MongoDB Atlas**: Create a cluster and get connection string

## Running the Application

### Development Mode

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on http://localhost:3000

2. **Start the frontend (in a new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on http://localhost:5173

### Production Build

1. **Build frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start production server:**
   ```bash
   cd backend
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Forms
- `GET /api/forms` - Get all forms
- `POST /api/forms` - Create a new form
- `GET /api/forms/:id` - Get specific form
- `PUT /api/forms/:id` - Update form
- `DELETE /api/forms/:id` - Delete form

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback (admin only)
- `GET /api/feedback/:formId` - Get feedback for specific form

## Project Structure

```
ayna/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── index.js         # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── styles/          # CSS files
│   │   └── main.jsx         # App entry point
│   └── package.json
└── README.md
```

## Usage

1. **Register/Login**: Create an account or login
2. **Create Forms**: Use the dashboard to create feedback forms
3. **Share Forms**: Share form links with users
4. **Collect Responses**: View submitted feedback in the dashboard
5. **Admin Access**: Admins can view all responses across forms







