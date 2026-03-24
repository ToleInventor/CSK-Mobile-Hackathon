# Email Confirmation Setup Guide

This guide explains how to set up and handle email confirmation in your Supabase authentication system.

## The 127.0.0.1 Problem

When developing locally, Supabase generates confirmation links pointing to `http://127.0.0.1:54321/confirm` or similar localhost URLs. This doesn't work for mobile apps since:

1. Mobile apps run on devices, not localhost
2. Users can't access localhost from their email
3. The confirmation flow needs to redirect back to the app

## Solutions for Mobile Apps

### Option 1: Deep Linking (Recommended)

Configure Supabase to use your app's custom URL scheme:

1. **Set up Deep Linking in Expo** (Already configured):
   ```json
   // app.json - Already has:
   {
     "expo": {
       "scheme": "day08auth"
     }
   }
   ```

2. **Configure Supabase**:
   - In Supabase Dashboard > Authentication > Settings
   - Set "Site URL" to: `day08auth://`
   - Set "Redirect URLs" to: `day08auth://confirm`
   - This tells Supabase to generate links like: `day08auth://confirm?token=...`

3. **Handle Deep Links in App**:
   ```typescript
   // In your app's entry point
   import { Linking } from 'react-native';
   
   Linking.addEventListener('url', (event) => {
     if (event.url.includes('confirm')) {
       // Handle confirmation
       supabase.auth.getSessionFromUrl(event.url);
     }
   });
   ```

### Option 2: Web-based Confirmation

1. Set Supabase "Site URL" to a web URL (e.g., `https://yourapp.com`)
2. Create a web page that handles confirmation and communicates with your app
3. Use Linking to open the web page from the app

### Option 3: Magic Links (Alternative)

Use passwordless authentication instead of email confirmation:

```typescript
// Send magic link
const { error } = await supabase.auth.signInWithOtp({
  email,
  options: {
    shouldCreateUser: true,
  }
});

// Handle the magic link in deep linking
```

### Option 4: Disable for Development

For testing purposes, disable email confirmation:

1. Supabase Dashboard > Authentication > Settings
2. Turn off "Enable email confirmations"
3. Users can sign up and login immediately

## Supabase Dashboard Configuration

1. **Enable Email Confirmation** (for production):
   - Authentication > Settings > "Enable email confirmations" = ON
   - Set Site URL to your app's deep link URL
   - Configure redirect URLs

2. **SMTP Settings** (recommended):
   - Authentication > Settings > SMTP Settings
   - Use a service like SendGrid, Mailgun, etc.

## Implementation Code

### Deep Link Handler (Already implemented in _layout.tsx)
```typescript
// app/_layout.tsx - Already handles deep links
// Automatically processes confirmation links and navigates to Home
```

## Testing Email Confirmation

### Development Testing
1. **Disable email confirmation** in Supabase for initial testing
2. Test signup/login flow without confirmation
3. **Enable email confirmation** for deep link testing

### Deep Link Testing
1. Sign up with a real email address
2. Check your email for the confirmation link
3. **Click the link on a device with the app installed**
4. The app should open and automatically confirm your email
5. You should be redirected to the Home screen

### Manual Deep Link Testing
You can test deep links manually:
```
day08auth://confirm?token=your_token_here&type=signup
```

### Production Setup
1. Enable email confirmation in Supabase
2. Set Site URL to: `day08auth://`
3. Test with real email addresses
4. Monitor confirmation success rates

## Important Notes

- **Deep linking requires app scheme configuration**
- **Test on real devices** - simulators may not handle deep links properly
- **URL encoding**: Make sure special characters in URLs are handled
- **Error handling**: Always handle confirmation failures gracefully
- **Security**: Validate the confirmation tokens properly

## Troubleshooting

- **Links not working**: Check app scheme configuration
- **App not opening**: Verify deep linking setup in app.json
- **Confirmation errors**: Check Supabase logs
- **Development issues**: Use the "disable confirmation" option for testing