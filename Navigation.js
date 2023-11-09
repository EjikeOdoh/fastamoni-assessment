import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

import Login from './src/Screens/Login';
import Home from './src/Screens/Home';
import Register from './src/Screens/Register';
import Setting from './src/Screens/Setting';
import Update from './src/Screens/Update';

import {COLORS} from './src/constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerTitle: null,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            backgroundColor: 'white',
            height: 70,
            borderTopWidth: 0,
          },
        ],
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <MaterialIcon name="home" size={35} color={COLORS.primary} />
            ) : (
              <MaterialIcon
                name="home-outline"
                size={32}
                color={COLORS.secondary}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <MaterialIcon name="cog" size={35} color={COLORS.primary} />
            ) : (
              <MaterialIcon
                name="cog-outline"
                size={30}
                color={COLORS.secondary}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Update"
        component={Update}
        options={{
          tabBarVisible: false,
          tabBarStyle: {
            display: 'none',
          },
          tabBarButton: props => null,
        }}
      />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  const token = useSelector(state => state.profile.token);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {token === null ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <Stack.Screen name="Main" component={Main} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
