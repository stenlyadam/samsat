import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Dashboard,
  Login,
  VehicleList,
  AddVehicle,
  Profile,
  DetailSTNK,
  Notification,
  VehicleDetail,
  Register,
} from '../pages';
import {TopBar} from '../components';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="BottomNavigator">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VehicleList"
        component={VehicleList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddVehicle"
        component={AddVehicle}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TopBar"
        component={TopBar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailSTNK"
        component={DetailSTNK}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VehicleDetail"
        component={VehicleDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
