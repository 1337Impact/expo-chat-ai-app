import { Stack } from 'expo-router';
import Navbar from '../components/navbar/navbar';
import { Button } from 'react-native';
import ProfileIcon from '../components/ui/profile-icon';


export default function Layout() {
  return (
    <Stack
      screenOptions={{
        // header: Navbar
        headerRight: () => <ProfileIcon />,
      }}
      >
        
      <Stack.Screen name="index" options={{
        headerTitle: 'Home',
      }} />
      <Stack.Screen name="login" options={{
        headerTitle: 'Login',
      }} />
    </Stack>
  );
}