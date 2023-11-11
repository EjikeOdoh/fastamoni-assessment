import React from 'react';

import {PanResponder, View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import Login from './src/Screens/Login';
import Home from './src/Screens/Home';
import Register from './src/Screens/Register';
import Setting from './src/Screens/Setting';
import Update from './src/Screens/Update';

import {COLORS} from './src/constants/theme';
import {setToken} from './redux/profileSlice';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Main() {
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      resetTimer();
      return true;
    },
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => {
      resetTimer();
      return false;
    },
    onMoveShouldSetPanResponderCapture: () => false,
    onPanResponderTerminationRequest: () => true,
    onShouldBlockNativeResponder: () => false,
  });

  let timer;

  React.useEffect(() => {
    timer = setTimeout(() => setShow(true), 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const resetTimer = () => {
    clearTimeout(timer);
    // if (show) setShow(false);
    // timer = setTimeout(() => setShow(true), 5000);
    dispatch(setToken(null));
  };

  return (
    <View style={{flex: 1}} {...panResponder.panHandlers}>
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
    </View>
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
