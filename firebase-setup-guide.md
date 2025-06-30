# Firebase Setup Guide for Guardian AI

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.com)
2. Click "Create a project" or "Add project"
3. Enter project name: `guardian-ai` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click on the **Sign-in method** tab
3. Enable the following providers:

### Google Sign-In
- Click on **Google** provider
- Toggle **Enable**
- Set your project support email
- Click **Save**

### Email/Password
- Click on **Email/Password** provider
- Toggle **Enable** for Email/Password
- Optionally enable **Email link (passwordless sign-in)**
- Click **Save**

### Anonymous
- Click on **Anonymous** provider
- Toggle **Enable**
- Click **Save**

## 3. Set Up Firestore Database

1. Go to **Firestore Database** in the left sidebar
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a location close to your users
5. Click **Done**

## 4. Configure Security Rules

Replace the default Firestore rules with:

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

## 5. Get Your Configuration

1. Go to **Project Settings** (gear icon in left sidebar)
2. Scroll down to **Your apps** section
3. Click on the **Web app** icon (`</>`)
4. Register your app with a nickname (e.g., "Guardian AI Web")
5. Copy the configuration object

## 6. Set Up Environment Variables

Create a `.env` file in your project root with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 7. Configure Authorized Domains

1. In Firebase Console, go to **Authentication** > **Settings** > **Authorized domains**
2. Add your domains:
   - `localhost` (for development)
   - Your production domain (e.g., `your-app.netlify.app`)

## 8. Test Your Setup

1. Start your development server: `npm run dev`
2. Try signing in with:
   - Google account
   - Email/password registration
   - Anonymous mode

## 9. Production Considerations

### Security Rules
Update Firestore rules for production:
- Remove test mode
- Add proper validation
- Implement role-based access

### Authentication Settings
- Enable email verification
- Set up password reset
- Configure OAuth consent screen for Google

### Monitoring
- Enable Firebase Analytics
- Set up error reporting
- Monitor authentication metrics

## Troubleshooting

### Common Issues

1. **Popup Blocked**: Ensure popups are allowed for your domain
2. **Invalid API Key**: Double-check your environment variables
3. **CORS Errors**: Verify authorized domains in Firebase Console
4. **Anonymous Sign-in Fails**: Ensure Anonymous provider is enabled

### Development vs Production

- Use Firebase emulators for local development
- Set `VITE_USE_FIREBASE_EMULATOR=true` for emulator mode
- Install Firebase CLI: `npm install -g firebase-tools`
- Start emulators: `firebase emulators:start`

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify Firebase configuration
3. Ensure all required providers are enabled
4. Check network connectivity