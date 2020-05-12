import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import React from "react";
import LoginPage from "./src/pages/LoginPage.js";
import AdminPage from "./src/pages/temp-pages/AdminPage.js";
import StaffPage from "./src/pages/staff-pages/StaffPage.js";
import UserPage from "./src/pages/temp-pages/UserPage.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="LoginScreen" component={LoginPage} />
        {/* TODO: change to non-temp admin page */}
        <Stack.Screen name="AdminPage" component={AdminPage} />
        <Stack.Screen name="StaffPage" component={StaffPage} />
        {/* TODO: change to non-temp user page */}
        <Stack.Screen name="UserPage" component={UserPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
