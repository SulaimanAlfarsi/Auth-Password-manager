# Auth Password Manager 🔒

<h1 align="center">Password Manager with Advanced Authentication</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1.1-blue.svg" alt="React Version">
  <img src="https://img.shields.io/badge/Node.js-Express-green.svg" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-Database-green.svg" alt="MongoDB">
  <img src="https://img.shields.io/badge/JWT-Authentication-orange.svg" alt="JWT">
  <img src="https://img.shields.io/badge/Nodemailer-Email-red.svg" alt="Email">
</p>

## 🎥 Demo Video

[![Watch the Demo](https://img.shields.io/badge/▶️_Watch_Demo_Video-blue?style=for-the-badge)](https://github.com/SulaimanAlfarsi/Auth-Password-manager/blob/main/frontend/public/demo.mp4?raw=true)

*Click the button above to watch the demo video*


## 🎯 About This Project

This is a **comprehensive Password Manager application** built with modern web technologies, featuring advanced authentication, secure password storage, and a beautiful user interface. The project demonstrates best practices in web security, user experience design, and full-stack development.

### 🚀 Key Highlights

- **Enterprise-grade Security**: AES-256-CBC encryption for password storage
- **Advanced Authentication**: JWT-based auth with email verification
- **Modern UI/UX**: Beautiful glass morphism design with smooth animations
- **Password Generator**: Built-in strong password generation like Google's suggestions
- **Real-time Validation**: Password strength meter with visual feedback
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Email Integration**: Automated email notifications using Nodemailer

## ✨ Features

### 🔐 Authentication & Security
- **User Registration** with email verification
- **Secure Login/Logout** with JWT tokens
- **Password Reset** via email with secure tokens
- **Email Verification** system for new accounts
- **Session Management** with automatic token refresh
- **Protected Routes** with authentication middleware

### 🗝️ Password Management
- **Add New Passwords** with website, username, and notes
- **Edit Existing Passwords** with real-time validation
- **Delete Passwords** with confirmation dialogs
- **Search & Filter** passwords by name, username, or website
- **Copy to Clipboard** functionality for passwords
- **Password Visibility Toggle** for secure viewing

### 🔑 Password Generator
- **Smart Password Generation** with customizable options
- **Strength Levels**: Strong (16 chars) and Very Strong (20 chars)
- **Security Compliance**: Automatically meets all strength requirements
- **Real-time Preview** with visual strength indicators
- **One-click Generation** with instant feedback

### 🎨 User Experience
- **Beautiful Animations** using Framer Motion
- **Glass Morphism Design** with gradient backgrounds
- **Responsive Layout** that works on all devices
- **Loading States** and error handling throughout
- **Toast Notifications** for user feedback
- **Dark Theme** optimized for eye comfort

### 📊 Dashboard Features
- **User Profile** with account information
- **Password Statistics** and security insights
- **Recent Activity** tracking
- **Account Management** tools
- **Security Settings** and preferences

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcryptjs** - Password hashing
- **Nodemailer** - Email sending
- **Crypto** - Built-in encryption utilities

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Development server auto-restart
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📱 Screenshots

### Authentication Pages

#### Login Page
![Login Page](https://github.com/SulaimanAlfarsi/Auth-Password-manager/blob/main/frontend/public/login.png?raw=true)
*Clean design with gradient backgrounds and smooth animations*

#### Signup Page
![Signup Page](https://github.com/SulaimanAlfarsi/Auth-Password-manager/blob/main/frontend/public/signup.png?raw=true)
*Password strength validation with real-time feedback and visual indicators*

#### Forgot Password Page
![Forgot Password Page](https://github.com/SulaimanAlfarsi/Auth-Password-manager/blob/main/frontend/public/forgot-password.png?raw=true)
*User-friendly error handling and success states with beautiful UI*

![Forgot Password Success](https://github.com/SulaimanAlfarsi/Auth-Password-manager/blob/main/frontend/public/forgot-password1.png?raw=true)
*Success state with confirmation message*

### Dashboard & Password Management

#### Home Dashboard
![Home Dashboard](https://github.com/SulaimanAlfarsi/Auth-Password-manager/blob/main/frontend/public/home.png?raw=true)
*Overview with profile and password vault in a modern layout*

#### Add Password Modal
![Add Password Modal](https://github.com/SulaimanAlfarsi/Auth-Password-manager/blob/main/frontend/public/addpass.png?raw=true)
*Beautiful form with password generator and strength validation*

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Gmail account for email functionality

### 1. Clone the Repository
```bash
git clone https://github.com/SulaimanAlfarsi/Auth-Password-manager.git
cd Auth-Password-manager
```

### 2. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```bash
# Database Configuration
MONGO_URL=mongodb://localhost:27017/password-manager
PORT=5000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Environment
NODE_ENV=development

# Email Configuration (Gmail)
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password

# Encryption
ENCRYPTION_KEY=your-32-character-encryption-key-here

# Client URL
CLIENT_URL=http://localhost:5173
```

### 4. Gmail Setup (for Email Functionality)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password as `GMAIL_PASS`

### 5. Run the Application

```bash
# Start backend server
npm run dev

# In a new terminal, start frontend
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017/password-manager` |
| `PORT` | Backend server port | `5000` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key-here` |
| `NODE_ENV` | Environment mode | `development` |
| `GMAIL_USER` | Gmail address for sending emails | `your-email@gmail.com` |
| `GMAIL_PASS` | Gmail app password | `your-app-password` |
| `ENCRYPTION_KEY` | 32-character key for password encryption | `your-32-char-encryption-key` |
| `CLIENT_URL` | Frontend URL for email links | `http://localhost:5173` |

## 📖 Usage

### Getting Started
1. **Register** a new account with your email
2. **Verify** your email address using the link sent
3. **Login** to access your password manager
4. **Add passwords** using the "Add Password" button
5. **Generate strong passwords** using the built-in generator
6. **Manage** your passwords with edit/delete functionality

### Password Security
- All passwords are **encrypted** using AES-256-CBC before storage
- **Password strength validation** ensures strong passwords
- **Secure token handling** for password resets
- **Session management** with automatic logout

### Best Practices
- Use the **password generator** for new passwords
- **Regularly update** your passwords
- **Use unique passwords** for each account
- **Keep your master password** secure

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /signup` - User registration
- `POST /verify-email` - Email verification
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /check-auth` - Check authentication status
- `POST /forgot-password` - Request password reset
- `POST /reset-password/:token` - Reset password

### Password Routes (`/api/passwords`)
- `GET /` - Get all user passwords
- `POST /` - Create new password
- `GET /:id` - Get specific password (decrypted)
- `PUT /:id` - Update password
- `DELETE /:id` - Delete password
- `GET /test` - Test endpoint

## 🛡️ Security Features

### Password Protection
- **AES-256-CBC Encryption** for password storage
- **Secure Key Management** with environment variables
- **Password Strength Validation** with real-time feedback
- **Secure Password Generation** with customizable options

### Authentication Security
- **JWT Tokens** with expiration
- **Secure Cookie Handling** with httpOnly flags
- **Email Verification** for new accounts
- **Password Reset Tokens** with expiration
- **CORS Configuration** for secure requests

### Data Protection
- **Input Validation** and sanitization
- **Error Handling** without information leakage
- **Secure Headers** and CORS policies
- **Environment Variable Protection**




## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS approach
- **Framer Motion** for smooth animations
- **MongoDB** for the flexible database
- **Express.js** for the robust backend framework


---

<p align="center">
<a href="https://github.com/SulaimanAlfarsi">SulaimanAlfarsi</a>
</p>

