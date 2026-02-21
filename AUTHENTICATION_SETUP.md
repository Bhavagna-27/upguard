# UpGuard User Profile Authentication Setup

## Overview
This guide explains the implemented authentication system and how to use it.

## Changes Made

### Backend (Python/Flask)

#### 1. **Extended User Model** (`backend/models.py`)
Updated the User model to include profile fields:
- `full_name` - User's full name
- `organization` - User's organization
- `phone` - Contact phone number
- `employee_id` - Generated employee ID
- `clearance_level` - Security clearance level
- `last_login` - Timestamp of last login
- `created_at` - Account creation timestamp

#### 2. **Backend Routes** (`backend/app.py`)

##### **POST /register**
Register a new user with profile information.

**Request:**
```json
{
  "full_name": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "SecurePass123!",
  "organization": "Acme Corp",
  "phone": "+1234567890",
  "role": "Employee"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "johndoe@gmail.com",
    "full_name": "John Doe",
    "organization": "Acme Corp",
    "phone": "+1234567890",
    "role": "Employee",
    "employee_id": "UG-JOHN-DOE",
    "clearance_level": null,
    "last_login": null
  }
}
```

##### **POST /login**
Authenticate user and get JWT token.

**Request:**
```json
{
  "email": "johndoe@gmail.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "email": "johndoe@gmail.com",
    "full_name": "John Doe",
    "organization": "Acme Corp",
    "phone": "+1234567890",
    "role": "Employee",
    "employee_id": "UG-JOHN-DOE",
    "clearance_level": null,
    "last_login": "2026-02-21T10:30:00"
  }
}
```

##### **GET /profile** (Protected)
Fetch current user's profile.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "id": 1,
  "email": "johndoe@gmail.com",
  "full_name": "John Doe",
  "organization": "Acme Corp",
  "phone": "+1234567890",
  "role": "Employee",
  "employee_id": "UG-JOHN-DOE",
  "clearance_level": null,
  "last_login": "2026-02-21T10:30:00"
}
```

##### **PUT /profile** (Protected)
Update user profile.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
```json
{
  "full_name": "John Doe",
  "organization": "New Corp",
  "phone": "+9876543210",
  "clearance_level": "Level 4 - Critical Access"
}
```

### Frontend (React)

#### 1. **Login Component** (`frontend/src/pages/Login.jsx`)
- Now calls backend `/login` endpoint
- Stores JWT token and user data in localStorage
- Validates email and password before submission
- Shows error messages for failed login attempts
- Generates OTP for 2FA after successful login

#### 2. **Signup Component** (`frontend/src/pages/Signup.jsx`)
- Sends registration data to backend `/register` endpoint
- Collects full name, organization, phone, and role
- Validates passwords and email format
- Stores user data in localStorage after registration

#### 3. **Profile Component** (`frontend/src/pages/Profile.jsx`)
- **Dynamic User Data**: Displays logged-in user's information
- **JWT Authentication**: Uses access token from localStorage to fetch profile
- **Fallback Mechanism**: Uses localStorage user data if API fails
- **Dynamic Avatar**: Generates initials from user's full name
- **Color-coded Clearance**: Shows clearance levels with appropriate colors
- **Last Login**: Displays user's last login timestamp

## Installation & Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask app
python app.py
```

The backend will start on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173` (or similar)

## API Base URL

The frontend is configured to use:
```
http://localhost:5000
```

Update this in the frontend components if your backend runs on a different port/URL.

## User Flow

1. **Signup**: User creates account with full_name, organization, phone, and role
2. **Login**: User logs in with email and password
3. **OTP Verification**: User enters OTP for 2FA
4. **Dashboard**: User is redirected to dashboard
5. **Profile**: User can visit profile page to see their information
6. **Profile Fetch**: Profile component fetches user data from backend using JWT token

## Data Storage

### localStorage Keys
- `access_token` - JWT token for authenticated requests
- `user` - User object (JSON stringified)
- `email` - User's email
- `otp` - Current OTP for 2FA
- `otpTime` - OTP generation timestamp

## Security Notes

1. **Password Storage**: Passwords are hashed using bcrypt before storage
2. **JWT Token**: Used for protecting profile endpoints
3. **Token Expiry**: Configure JWT token expiry in Flask config
4. **HTTPS**: Use HTTPS in production for all API calls
5. **CORS**: Flask-CORS is enabled for development; configure properly for production

## Example Database Entries

After registration, users will appear in the database with:
- Unique email address
- Hashed password
- Full name and organization
- Generated employee ID
- Contact information

## Troubleshooting

### "Failed to connect to server" error
- Ensure backend is running on localhost:5000
- Check Flask app is not blocking CORS (it's enabled in the code)
- Verify network connectivity

### Profile shows "User not logged in"
- Clear localStorage and log in again
- Check browser console for errors
- Verify access_token is being stored

### OTP not working
- Check console for generated OTP
- Ensure OTP hasn't expired (60 seconds)
- Clear localStorage and try again

## Next Steps

1. Add password reset functionality
2. Implement email verification
3. Add profile picture upload
4. Add role-based access control (RBAC)
5. Implement session management
6. Add activity logging
