import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { Redirect, Stack, usePathname } from 'expo-router';

function RootNavigator() {
  const { token, authLoading } = useAuth();
  const pathname = usePathname();

  if (authLoading) {
    return null;
  }

  const isSignInPage = pathname === '/sign-in';

  if (!token && !isSignInPage) {
    return <Redirect href="/sign-in" />;
  }

  if (token && isSignInPage) {
    return <Redirect href="/(app)" />;
  }

  return (
    <Stack screenOptions={{ headerTintColor: '#17324d' }}>
      <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen
        name="student/[id]"
        options={{ title: 'Student Details' }}
      />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}