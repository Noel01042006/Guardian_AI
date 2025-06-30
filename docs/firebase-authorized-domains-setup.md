# Firebase Authorized Domains Configuration Guide

## What are Authorized Domains?

Authorized domains are the domains that Firebase allows to use your authentication providers. This is a security feature that prevents unauthorized websites from using your Firebase project for authentication.

## Step-by-Step Configuration

### 1. Access Firebase Console

1. Go to [Firebase Console](https://console.firebase.com)
2. Select your Guardian AI project
3. Navigate to **Authentication** in the left sidebar
4. Click on the **Settings** tab
5. Scroll down to **Authorized domains** section

### 2. Default Authorized Domains

By default, Firebase includes:
- `localhost` (for local development)
- `your-project-id.firebaseapp.com` (Firebase hosting domain)

### 3. Add Your Development Domains

For local development, ensure these domains are added:

```
localhost
127.0.0.1
```

**Note**: Port numbers (like `:5173`) are automatically handled by Firebase.

### 4. Add Production Domains

Add your production domains where the app will be deployed:

#### For Netlify:
```
your-app-name.netlify.app
your-custom-domain.com (if you have one)
```

#### For Vercel:
```
your-app-name.vercel.app
your-custom-domain.com (if you have one)
```

#### For Firebase Hosting:
```
your-project-id.web.app
your-project-id.firebaseapp.com
your-custom-domain.com (if you have one)
```

#### For Custom Domains:
```
yourdomain.com
www.yourdomain.com
```

### 5. How to Add Domains

1. In the **Authorized domains** section, click **Add domain**
2. Enter the domain name (without `http://` or `https://`)
3. Click **Add**
4. Repeat for each domain you need

### 6. Common Domain Patterns

```
# Development
localhost
127.0.0.1

# Staging/Testing
staging.yourdomain.com
test.yourdomain.com

# Production
yourdomain.com
www.yourdomain.com
app.yourdomain.com

# Deployment Platforms
your-app.netlify.app
your-app.vercel.app
your-project.web.app
your-project.firebaseapp.com
```

## Important Notes

### Domain Format
- ✅ Correct: `example.com`
- ✅ Correct: `subdomain.example.com`
- ❌ Wrong: `https://example.com`
- ❌ Wrong: `http://example.com`
- ❌ Wrong: `example.com:3000`

### Wildcard Domains
Firebase **does not support** wildcard domains like `*.example.com`. You must add each subdomain individually.

### Case Sensitivity
Domain names are case-insensitive, but it's best practice to use lowercase.

## Testing Your Configuration

### 1. Test Local Development
```bash
npm run dev
# Should work on http://localhost:5173
```

### 2. Test Authentication
1. Try Google sign-in
2. Try email/password sign-in
3. Try anonymous sign-in

### 3. Check for Errors
Open browser console and look for:
- `auth/unauthorized-domain` errors
- CORS-related errors
- Popup blocking issues

## Troubleshooting

### Error: "auth/unauthorized-domain"
**Cause**: The current domain is not in the authorized domains list.

**Solution**:
1. Add the domain to Firebase Console
2. Wait a few minutes for changes to propagate
3. Clear browser cache and try again

### Error: "Popup blocked"
**Cause**: Browser is blocking the authentication popup.

**Solutions**:
1. Allow popups for your domain
2. Add domain to authorized domains
3. Use redirect-based authentication instead

### Error: "CORS policy"
**Cause**: Cross-origin request blocked.

**Solution**:
1. Verify domain is in authorized domains
2. Check that you're using the correct Firebase config
3. Ensure API keys are correct

## Production Deployment Checklist

### Before Deploying:
- [ ] Add production domain to authorized domains
- [ ] Test authentication on staging environment
- [ ] Verify all auth providers work
- [ ] Check that redirects work correctly

### After Deploying:
- [ ] Test Google sign-in on production
- [ ] Test email/password sign-in
- [ ] Test anonymous sign-in
- [ ] Monitor for authentication errors

## Security Best Practices

### 1. Principle of Least Privilege
Only add domains you actually use. Don't add unnecessary domains.

### 2. Regular Audits
Periodically review and remove unused domains.

### 3. Environment Separation
Use different Firebase projects for:
- Development
- Staging
- Production

### 4. Monitor Usage
Use Firebase Analytics to monitor authentication usage and detect anomalies.

## Common Deployment Scenarios

### Scenario 1: Netlify Deployment
```
# Add these domains:
localhost                    # Development
your-app.netlify.app        # Production
your-custom-domain.com      # Custom domain (if applicable)
```

### Scenario 2: Multiple Environments
```
# Development
localhost

# Staging
staging-guardian-ai.netlify.app

# Production
guardian-ai.netlify.app
guardianai.com
www.guardianai.com
```

### Scenario 3: Custom Domain with Subdomain
```
# Main app
app.guardianai.com

# Marketing site
www.guardianai.com

# Admin panel
admin.guardianai.com
```

## Quick Setup Commands

If you're using Firebase CLI, you can also manage authorized domains programmatically:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# List current authorized domains
firebase auth:export domains.json

# Note: Adding domains still requires Firebase Console
```

## Need Help?

If you encounter issues:

1. **Check Firebase Console**: Verify domains are correctly added
2. **Clear Browser Cache**: Authentication tokens might be cached
3. **Wait for Propagation**: Changes can take a few minutes
4. **Check Network Tab**: Look for failed requests in browser dev tools
5. **Test in Incognito**: Eliminates cache-related issues

## Next Steps

After configuring authorized domains:

1. Test all authentication methods
2. Deploy to your staging environment
3. Test authentication on staging
4. Deploy to production
5. Monitor authentication metrics in Firebase Console

Remember: Always test authentication thoroughly after adding new domains!