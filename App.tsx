import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import HomeScreen from './app/screens/HomeScreen';
import MyTrips from './app/screens/MyTrips';
import {getUserFromLocalStorage} from './app/hooks/useStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Favourites from './app/screens/Favourties';
import Profile from './app/screens/Profile';
import {TouchableOpacity} from 'react-native';
import {COLORS} from './app/constants/constant';
import Personal from './app/screens/Personal';
import Privacy from './app/screens/Privacy';
import Notification from './app/screens/Notification';
import Logout from './app/screens/Logout';
import Review from './app/screens/Review';
import Room from './app/screens/Room';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Dashboard() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'MyTrips') {
            iconName = 'bed-outline';
          } else if (route.name === 'Favourite') {
            iconName = 'bookmark-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          } else {
            iconName = 'ios-alert';
          }
          iconName = iconName || 'home-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="MyTrips"
        options={{
          headerShown: true,
          title: 'My orders',
          headerTitleAlign: 'left',
          headerRight: () => (
            <TouchableOpacity style={{marginRight: 15}}>
              <Ionicons
                name="newspaper-outline"
                size={25}
                color={COLORS.yellow}
              />
            </TouchableOpacity>
          ),
        }}
        component={MyTrips}
      />
      <Tab.Screen name="Favourite" component={Favourites} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [userName, setUserName] = useState('');
  const queryClient = new QueryClient();
  useEffect(() => {
    (async () => {
      const user = await getUserFromLocalStorage('userInfo');
      if (user) {
        setUserName(user?.fullName);
      }
    })();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {userName ? (
            <>
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="Personal" component={Personal} />
              <Stack.Screen name="Privacy" component={Privacy} />
              <Stack.Screen name="Room" component={Room} />
              <Stack.Screen
                name="Notification"
                component={Notification}
                options={{
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                name="Logout"
                options={{
                  presentation: 'modal',
                }}
                component={Logout}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
