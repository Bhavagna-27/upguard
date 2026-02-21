# UpGuard User Profile Data Implementation

## Summary
Your UpGuard application now displays user profile data based on who is signed in. The system includes a complete authentication flow with user registration, login, OTP verification, and profile data retrieval.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                       │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│ │   Login      │─→│   Signup     │  │   Profile    │       │
│ │  Component   │  │  Component   │  │  Component   │       │
│ └──────────────┘  └──────────────┘  └──────────────┘       │
│        ↓                ↓                    ↓               │
│   localStorage    localStorage         JWT Token           │
│   (auth data)     (user data)         (backend API)        │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
      POST /login      POST /register   GET /profile
      POST /logout     PUT /profile      (Protected)
        │                │                │
        └────────────────┼────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Flask/Python)                      │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Database (SQLite)                                   │   │
│  │  ┌──────────────────────────────────────────────┐    │   │
│  │  │ User Table                                   │    │   │
│  │  │ - id (PK)                                    │    │   │
│  │  │ - email (UNIQUE)                             │    │   │
│  │  │ - password (hashed)                          │    │   │
│  │  │ - full_name                                  │    │   │
│  │  │ - organization                               │    │   │
│  │  │ - phone                                       │    │   │
│  │  │ - role                                        │    │   │
│  │  │ - employee_id                                 │    │   │
│  │  │ - clearance_level                             │    │   │
│  │  │ - last_login (timestamp)                      │    │   │
│  │  │ - created_at (timestamp)                      │    │   │
│  │  └──────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## User Flow Diagram

```
START
  ↓
┌─────────────────────────────────────────────────────────┐
│            SIGNUP (If new user)                         │
│                                                          │
│  1. Fill signup form:                                  │
│     - Full Name                                         │
│     - Email (@gmail.com)                               │
│     - Password (strong)                                │
│     - Organization                                      │
│     - Phone                                            │
│     - Role                                             │
│                                                          │
│  2. Validate and send to backend                       │
│     POST /register                                      │
│                                                          │
│  3. Backend:                                            │
│     - Validate unique email                             │
│     - Hash password (bcrypt)                            │
│     - Generate employee_id                              │
│     - Save to database                                  │
│     - Return user data                                  │
│                                                          │
│  4. Frontend stores user in localStorage                │
└─────────────────────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────────────────────┐
│              LOGIN                                       │
│                                                          │
│  1. Enter email & password                              │
│  2. Send to backend                                     │
│     POST /login                                         │
│                                                          │
│  3. Backend:                                            │
│     - Verify password (bcrypt)                          │
│     - Update last_login timestamp                       │
│     - Generate JWT token                                │
│     - Return token + user data                          │
│                                                          │
│  4. Frontend:                                           │
│     - Store JWT token in localStorage                   │
│     - Store user data in localStorage                   │
│     - Generate OTP for 2FA                              │
└─────────────────────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────────────────────┐
│              OTP VERIFICATION (2FA)                      │
│                                                          │
│  1. User receives OTP (shown in console/email)          │
│  2. User enters OTP                                     │
│  3. Frontend verifies OTP locally                       │
│  4. If valid: Redirect to Dashboard                     │
│                                                          │
│ Note: OTP expires in 60 seconds                         │
└─────────────────────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────────────────────┐
│         ACCESS PROFILE PAGE                             │
│                                                          │
│  1. Profile component mounts                            │
│  2. Check for JWT token in localStorage                 │
│                                                          │
│  3a. If token exists:                                   │
│      - GET /profile (with JWT)                          │
│      - Backend returns latest user data                 │
│      - Display in Profile page                          │
│                                                          │
│  3b. If no token:                                       │
│      - Use user data from localStorage                  │
│      - Display in Profile page                          │
│                                                          │
│  4. Display:                                            │
│     ┌─────────────────────────────────────┐            │
│     │  Avatar (JD)   John Doe             │            │
│     │                Employee             │            │
│     │                                      │            │
│     │  Organization: Acme Corp             │            │
│     │  Email: john@gmail.com               │            │
│     │  Phone: +1234567890                  │            │
│     │  Employee ID: UG-JOHN-DOE            │            │
│     │  Clearance: Level 4                  │            │
│     │                                      │            │
│     │  Security Info:                      │            │
│     │  - Account Risk: LOW                 │            │
│     │  - MFA: Enabled                      │            │
│     │  - Last Login: [timestamp]           │            │
│     │  - Device Trust: 85%                 │            │
│     │  - Behavioral Risk: 25%              │            │
│     └─────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────┘
  ↓
END
```

## Key Features Implemented

### 1. **User Authentication**
- ✅ Email validation (must be @gmail.com)
- ✅ Strong password requirements
- ✅ Password hashing with bcrypt
- ✅ JWT token generation and validation
- ✅ 2FA with OTP verification

### 2. **User Profile Management**
- ✅ Store comprehensive user data (name, email, organization, phone, role)
- ✅ Auto-generated employee IDs
- ✅ Track last login timestamp
- ✅ Admin can set clearance levels
- ✅ Update profile information

### 3. **Profile Display**
- ✅ Dynamic avatar generation from user initials
- ✅ Display all user information
- ✅ Show security metrics
- ✅ Color-coded clearance levels
- ✅ Fallback to localStorage if API fails

### 4. **Error Handling**
- ✅ Server validation errors
- ✅ Network error handling
- ✅ User-friendly error messages
- ✅ OTP expiry handling

## File Structure

```
upguard-main/
├── AUTHENTICATION_SETUP.md      ← Detailed setup guide
├── SETUP.sh                     ← Linux/Mac setup script
├── SETUP.bat                    ← Windows setup script
├── README.md                    ← This file
│
├── backend/
│   ├── app.py                   ← Flask app with auth routes
│   ├── models.py                ← User model with extended fields
│   ├── requirements.txt          ← Python dependencies
│   ├── .env.example              ← Environment variables template
│   ├── __pycache__/
│   └── instance/                 ← Database directory
│
└── frontend/
    ├── package.json
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx         ← Updated with backend integration
    │   │   ├── Signup.jsx        ← Updated with backend integration
    │   │   ├── OTP.jsx           ← 2FA verification
    │   │   ├── Profile.jsx       ← Updated to fetch user data
    │   │   ├── Dashboard.jsx
    │   │   ├── Logs.jsx
    │   │   ├── RiskAlerts.jsx
    │   │   ├── Settings.jsx
    │   │   └── ...
    │   ├── components/
    │   └── styles/
    └── ...
```

## Technology Stack

### Backend
- **Framework**: Flask
- **Database**: SQLAlchemy with SQLite (can upgrade to PostgreSQL/MySQL)
- **Authentication**: Flask-JWT-Extended
- **Password Hashing**: bcrypt
- **CORS**: Flask-CORS for frontend communication

### Frontend
- **Framework**: React 19
- **Routing**: React Router DOM v7
- **State Management**: localStorage + React hooks
- **Build Tool**: Vite

## Quick Start

### Windows
```powershell
# Run setup
.\SETUP.bat

# Then in first terminal:
cd backend
venv\Scripts\activate.bat
python app.py

# In second terminal:
cd frontend
npm run dev
```

### Linux/macOS
```bash
# Run setup
bash SETUP.sh

# Then in first terminal:
cd backend
source venv/bin/activate
python app.py

# In second terminal:
cd frontend
npm run dev
```

## Testing the System

### 1. Create a New Account
- Go to http://localhost:5173/signup
- Fill in all fields with valid data
- Email must end with @gmail.com
- Password must be strong (uppercase, lowercase, number, special char, 8+ chars)
- Submit to register

### 2. Log In
- Go to http://localhost:5173 (or /login)
- Use the credentials from signup
- OTP will be generated (check console)
- Enter OTP on next page
- Redirect to dashboard

### 3. View Profile
- Click on Profile in navigation
- Your information should be displayed
- Data comes from either JWT request or localStorage

## API Endpoints Reference

| Method | Endpoint | Protected | Purpose |
|--------|----------|-----------|---------|
| POST | /register | ❌ | Create new account |
| POST | /login | ❌ | Authenticate user |
| GET | /profile | ✅ | Fetch current user profile |
| PUT | /profile | ✅ | Update user profile |

## Security Considerations

1. **Password Security**: Passwords are hashed using bcrypt, making them unreadable in the database
2. **JWT Tokens**: Used for protecting the /profile endpoints
3. **Token Storage**: Currently in localStorage (consider using secure cookies in production)
4. **CORS**: Enabled for development; restrict origins in production
5. **SQL Injection**: Protected by SQLAlchemy ORM
6. **OTP**: Simple 6-digit verification (consider email delivery in production)

## Future Enhancements

- [ ] Email verification for signup
- [ ] Password reset functionality
- [ ] Refresh token management
- [ ] Role-based access control (RBAC)
- [ ] Activity logging and audit trails
- [ ] Profile picture uploads
- [ ] Session management and logout
- [ ] Rate limiting on API endpoints
- [ ] Database migration system (Alembic)
- [ ] Unit and integration tests
- [ ] Email OTP delivery instead of console

## Troubleshooting

### Backend won't start
```
Error: ModuleNotFoundError: No module named 'flask'
Solution: Activate venv and run: pip install -r requirements.txt
```

### Frontend can't connect to backend
```
Error: Failed to connect to server
Solution: 
1. Ensure backend is running on localhost:5000
2. Check CORS is enabled in Flask
3. Verify firewall settings
```

### Profile shows hardcoded data
```
Issue: JWT token not being used
Solution:
1. Clear localStorage
2. Log in again
3. Check browser console for errors
```

## Useful Commands

### Backend Management
```bash
# Install dependencies
pip install -r requirements.txt

# Run Flask app
python app.py

# Create database tables
python -c "from app import app, db; app.app_context().push(); db.create_all()"

# Delete and recreate database
rm instance/upguard.db  # Linux/Mac
del instance\upguard.db  # Windows
```

### Frontend Management
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Support & Questions

For detailed API documentation, refer to [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md)

## License

This is part of the UpGuard project. All rights reserved.
