import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import UpdateProfileScreen from "./UpdateProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import AddRequestScreen from "./AddRequestScreen";
import FetchRequestsScreen from "./FetchRequestsScreen";
import UserProfileScreen from "./UserProfileScreen";

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      
      <Stack.Screen name="AddRequest" component={AddRequestScreen} />
      <Stack.Screen name="FetchRequests" component={FetchRequestsScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
}
