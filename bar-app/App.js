import React from "react";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import UserMainView from "./User/userMainView";
import AdminMainView from "./Admin/adminMainView";
import LoginPage from "./src/pages/LoginPage.js";
import StaffPage from "./src/pages/staff-pages/StaffPage.js";
import ReportView from "./User/ReportView.js";

import test from "./SharedItems/ratingsView";


const Stack = createStackNavigator();

export default function App() {
  // NavBar status -> shows state if user in main view (true) or elsewhere (false)
  // NavBar role -> shows what kind of role user has G1={} G2={} G3={} GMap={}
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="LoginScreen" component={LoginPage} />
        <Stack.Screen name="AdminPage" component={AdminMainView} />
        <Stack.Screen name="StaffPage" component={StaffPage} />
        <Stack.Screen name="UserPage" component={UserMainView} />
        <Stack.Screen name="test" component={test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
