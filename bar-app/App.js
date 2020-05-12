import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Modal } from "react-native";

import NavBar from "./User/navBar";
import UserMainView from "./User/userMainView";
import ProfileView from "./User/profileView";
import HistoryView from "./User/historyView";
import ReportView from "./User/reportView";
import ReservationView from "./User/reservationsView";
import AdminView from "./Admin/adminView";
import AdminUsersView from "./Admin/adminUsersView";

import MapsView from "./SharedItems/mapsView";

export default function App() {
  const [mainState, setMainState] = useState("");
  const [goals, setGoals] = useState([]);

  const goalInputHandler = (enteredText) => {
    set(enteredText);
  };

  const addGoalHandler = () => {
    setGoals((goalser) => [...goalser, outern]);
  };

  const [user, setUser] = useState({
    id: 10,
    name: "Mantas",
    email: "mantas@et.lt",
    number: 112,
    rating: 10,
  });

  // NavBar status -> shows state if user in main view (true) or elsewhere (false)
  // NavBar role -> shows what kind of role user has G1={} G2={} G3={} GMap={}
  return (
    <View style={styles.app}>
      {/*
      <AdminUsersView />
      <HistoryView />
      <ReservationView show={false} />
      <ReportView />
      <UserMainView />
      <ProfileView userInfo={user} show={false} changeUserInfo={setUser} />

      */}
      <Text>xeewd</Text>
      <MapsView style={styles.map} />

      <NavBar status={true} role={"admin"} />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    paddingTop: 30,
    width: "100%",
    height: "100%",
    flexDirection: "column",

    justifyContent: "space-between",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  profile: {
    width: "100%",
    height: "10%",
  },
});
