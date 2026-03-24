import { Stack } from "expo-router";
import { useEffect } from 'react';
import { Linking } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { supabase } from './creds/config.supabase.tsx';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      console.log('Deep link received:', event.url);

      if (event.url.includes('confirm') || event.url.includes('auth')) {
        try {
          const { data, error } = await supabase.auth.getSessionFromUrl(event.url);
          if (error) {
            console.error('Confirmation error:', error);
            // Could navigate to an error screen here
          } else if (data.session) {
            console.log('Email confirmed successfully!');
            // Navigate to home screen after confirmation
            router.replace('/screens/Home');
          }
        } catch (err) {
          console.error('Deep link processing error:', err);
        }
      }
    };

    // Handle initial URL when app opens from deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('Initial URL:', url);
        handleDeepLink({ url });
      }
    });

    // Listen for new deep links while app is running
    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => subscription?.remove();
  }, [router]);

  return <Stack />;
}
