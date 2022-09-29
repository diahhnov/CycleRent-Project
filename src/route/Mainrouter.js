import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Akun,
  Cycle,
  DetailCycle,
  Home,
  History,
  InputReview,
  LengkapiAkun,
  Login,
  QrCode,
  Register,
  ChangePassword,
  TimerRent,
} from '../screen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {COLORS} from '../assets/Colors';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cycle"
        component={Cycle}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InputReview"
        component={InputReview}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailCycle"
        component={DetailCycle}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LengkapiAkun"
        component={LengkapiAkun}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QrCode"
        component={QrCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TimerRent"
        component={TimerRent}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const MainApp = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={COLORS.black}
      inactiveColor={COLORS.neutral}
      shifting={true}
      labeled={true}
      barStyle={{backgroundColor: COLORS.grayLight}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Ionicons name="ios-home" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({color}) => (
            <Fontisto name="history" size={23} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Akun"
        component={Akun}
        options={{
          tabBarLabel: 'Akun',
          tabBarIcon: ({color}) => (
            <Ionicons name="ios-person-sharp" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;
