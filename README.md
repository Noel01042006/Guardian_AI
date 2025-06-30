# Guardian AI - Complete AI-Powered Web Application

A comprehensive family safety and AI assistance platform built with React, TypeScript, and Firebase.

## 🚀 Features

- **Multi-Role Support**: Elder, Teen, Child, and Parent specific experiences
- **AI Assistants**: Personalized tutoring, wellbeing, and general assistance
- **Authentication**: Google and Email/Password sign-in, plus Anonymous demo mode
- **Dark/Light Themes**: Accessible design with theme switching
- **Voice Integration**: Speech-to-text and text-to-speech capabilities
- **Scam Detection**: AI-powered protection for vulnerable users
- **Real-time Chat**: Interactive conversations with AI assistants
- **Family Management**: Parent dashboard for monitoring and managing family members
- **Data Persistence**: Firebase Firestore integration with offline fallbacks

## 🛠️ Setup Instructions

### 1. Clone and Install
```bash
npm install
```

### 2. Firebase Setup

#### Option A: Use with Real Firebase (Recommended for Production)
1. Go to [Firebase Console](https://console.firebase.com)
2. Create a new project
3. Enable Authentication:
   - **Google**: Enable Google sign-in provider
   - **Email/Password**: Enable email/password authentication
   - **Anonymous**: Enable anonymous authentication
4. Enable Firestore Database
5. Copy your config and create `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### Option B: Development Mode (Works Out of the Box)
The app will automatically use mock services if no Firebase config is provided.

### 3. Run the Application
```bash
npm run dev
```

## 🔧 Firebase Configuration

### Authentication Providers
Enable these in Firebase Console > Authentication > Sign-in method:
- **Google**: Add your domain to authorized domains
- **Email/Password**: Enable email verification if desired
- **Anonymous**: Enable for demo mode functionality

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Chat sessions
    match /chatSessions/{sessionId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Journal entries
    match /journalEntries/{entryId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Family data
    match /families/{familyId} {
      allow read, write: if request.auth != null && 
        (resource.data.ownerId == request.auth.uid || 
         request.auth.uid in resource.data.memberIds);
    }
  }
}
```

## 🎯 Architecture

### Core Services
- **AuthService**: Handles Google, Email/Password, and Anonymous authentication
- **DataService**: Manages Firestore operations with local storage fallbacks
- **AIService**: Mock AI responses (integrate with OpenAI API)
- **FamilyService**: Family management and member invitation system

### Components
- **LandingPage**: Marketing and sign-up with multiple auth options
- **RoleSelector**: User role selection with anonymous support
- **Dashboard**: Role-specific main interface with family management
- **ChatInterface**: AI conversation interface
- **AIAssistantSetup**: Personalized assistant configuration
- **FamilyManagement**: Parent tools for managing family members
- **AuthModal**: Unified authentication with Google, Email, and Anonymous options

### Context
- **AppContext**: Global state management for user, theme, and preferences

## 🔒 Security Features

- **Row Level Security**: Firestore rules ensure data isolation
- **Input Validation**: Client and server-side validation
- **Scam Detection**: AI-powered threat detection
- **Privacy Controls**: COPPA compliant for children
- **Secure Authentication**: Firebase Auth with multiple providers
- **Anonymous Mode**: Safe demo experience without data persistence

## 🎨 Authentication Options

### Google Sign-In
- One-click authentication with Google accounts
- Automatic profile information import
- Secure OAuth 2.0 implementation

### Email/Password
- Traditional email and password registration
- Password strength validation
- Account recovery support

### Anonymous Mode
- Try all features without creating an account
- No personal data collection
- Perfect for demos and testing
- Data not permanently stored

## 📱 Accessibility

- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility
- **Voice Features**: Speech-to-text and text-to-speech
- **Font Size Controls**: Adjustable text sizing
- **Color Contrast**: WCAG compliant color schemes
- **Anonymous Access**: No barriers to trying the platform

## 🚀 Deployment

### Netlify (Recommended)
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🔧 Environment Variables

Create a `.env` file with:
```env
# Required for production
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Optional
VITE_OPENAI_API_KEY=your_openai_key
```

## 📊 Features by Role

### Elder
- Scam protection and alerts
- Simple, large UI elements
- Health reminders
- Family communication

### Teen
- AI tutoring and homework help
- Privacy and safety education
- Career guidance
- Mental health support

### Child
- Safe learning environment
- Parental controls
- Educational games
- Simple interface

### Parent
- Family oversight dashboard
- Child activity monitoring
- Educational resources
- Parenting tips
- Family member management
- Invitation system

## 🎭 Demo Mode Features

- **Full Feature Access**: Try all Guardian AI features
- **No Registration Required**: Start using immediately
- **Privacy Focused**: No personal data collected
- **Temporary Sessions**: Data not permanently stored
- **Easy Transition**: Convert to full account anytime

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@guardianai.com or create an issue in the repository.