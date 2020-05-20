import React from "react";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import UserMainView from "./User/userMainView";
import AdminMainView from "./Admin/adminMainView";
import LoginPage from "./src/pages/LoginPage.js";
import StaffPage from "./src/pages/staff-pages/StaffPage.js";
import ReportView from "./User/ReportView.js";
import AdminMapsPage from "./Admin/adminMapsView.js";
import adminBarsView from "./Admin/adminBarsView";

import test from "./SharedItems/ratingsView";
import adminMap from "./Admin/AdminMap";
import addBarPage from "./Admin/addBarPage";


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
        <Stack.Screen name="test" component={AdminMainView} />
        <Stack.Screen name="AdminBarsPage" component={adminBarsView} />
        <Stack.Screen name="AddBarPage" component={addBarPage} />
        <Stack.Screen name="AdminMapsPage" component={adminMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
