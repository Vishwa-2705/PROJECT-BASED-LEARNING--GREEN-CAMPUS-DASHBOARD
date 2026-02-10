# Green Campus Dashboard - Project README

## 📋 Project Overview

**Green Campus Dashboard** is a web application designed to monitor and manage sustainable performance across campus operations with separate dashboards for admins and users.

**System Architecture:**
```
Frontend (React + Vite) ↔ Backend (Flask) ↔ MongoDB
                         ↓
                   Email Service (Gmail)
```

---

## 🚀 Quick Start

### Login Credentials

**Admin:**
- Email: `admin@greencampus.com`
- Password: `admin123`

**User:**
- Register new account with any email and password

### Running Both Services

**Terminal 1 - Backend:**
```bash
cd green-campus-backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py
```
Backend runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd green-campus-frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 📚 Features

✅ **Dashboard Width Fixed** - Energy dashboard matches Water dashboard  
✅ **Admin/User Badges Enhanced** - Larger, centered badges  
✅ **Logout Button Styling** - Green theme with hover effects  
✅ **Messaging System** - Users send messages, admins reply via email  
✅ **JWT Authentication** - Secure login/register  
✅ **MongoDB Integration** - Message and user data storage  

---

## 🔧 Backend Setup

### Prerequisites
- Python 3.8+
- MongoDB (local or Docker)
- Gmail account

### Installation

```bash
cd green-campus-backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### Environment Configuration (.env)
```
MONGODB_URI=mongodb://localhost:27017/green_campus
JWT_SECRET_KEY=your-secret-key-change-in-production
ADMIN_EMAIL=admin@greencampus.com
ADMIN_PASSWORD=admin123
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
EMAIL_ADDRESS=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
```

### Start MongoDB
```bash
mongod
# OR Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

### Run Backend
```bash
python app.py
```

---

## 🎨 Frontend Setup

The frontend is a React + Vite application already configured to connect to `http://localhost:5000`.

**Features:**
- Admin Dashboard with message management
- User Dashboard with contact form
- Energy, Water, Waste, and Green Score tracking
- Responsive sidebar navigation

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user/admin

### Messages (Admin Only - Requires JWT Token)
- `GET /api/messages` - Get all messages
- `GET /api/messages/{id}` - Get specific message
- `POST /api/messages/send` - Send message from user
- `POST /api/messages/{id}/reply` - Add admin reply + send email
- `DELETE /api/messages/{id}` - Delete message
- `PUT /api/messages/{id}/read` - Mark as read

---

## 📧 Gmail Setup for Email Notifications

1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows"
3. Generate the app password
4. Copy and paste into `.env` as `EMAIL_PASSWORD`

---

## 💾 Database Schema

### Users Collection
```json
{
  "_id": ObjectId,
  "email": "user@example.com",
  "password": "hashed_password",
  "role": "admin|user",
  "created_at": ISODate
}
```

### Messages Collection
```json
{
  "_id": ObjectId,
  "user_name": "John Doe",
  "user_email": "user@example.com",
  "subject": "Energy Inquiry",
  "message": "How can I reduce energy?",
  "status": "unread|read|replied",
  "created_at": ISODate,
  "replies": [
    {
      "sender": "Admin",
      "text": "Here's the answer...",
      "timestamp": ISODate
    }
  ]
}
```

---

## 🔄 Admin Message Workflow

1. Admin logs in as `admin@greencampus.com`
2. Navigate to Contact Us → Messages
3. View all user messages
4. Select message and type reply
5. Click "Send Reply" → reply saved AND email sent to user
6. Can delete messages when done

---

## 📁 Project Structure

```
green-campus-dashboard/
├── SETUP_GUIDE.md                    # Complete setup documentation
├── README.md                         # This file
├── green-campus-backend/
│   ├── app.py                        # Flask main app
│   ├── config.py                     # Configuration
│   ├── models.py                     # MongoDB models
│   ├── email_utils.py                # Email functions
│   ├── requirements.txt              # Dependencies
│   ├── .env                          # Environment variables
│   └── README.md                     # Backend docs
├── green-campus-frontend/
│   ├── src/
│   │   ├── api/apiService.js         # All API calls
│   │   ├── context/                  # State management
│   │   ├── pages/Login.jsx           # Login component
│   │   ├── adminDashboard/           # Admin interface
│   │   └── userDashboard/            # User interface
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── archive_removed/                  # Test files
```

---

## ⚠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB Connection Error | Ensure mongod is running, check MONGODB_URI in .env |
| Email Not Sending | Verify Gmail app password, check 2FA is enabled |
| CORS Errors | Backend CORS configured for localhost:5173 |
| JWT Token Errors | Clear localStorage and re-login |

---

## 🔒 Security Notes (Important for Production)

1. Hash passwords using bcrypt (currently plain text for demo)
2. Change JWT_SECRET_KEY
3. Use environment variables for all sensitive data
4. Implement rate limiting
5. Add input validation/sanitization
6. Use HTTPS instead of HTTP
7. Implement refresh token mechanism

---

**System is ready for use!** 🚀
