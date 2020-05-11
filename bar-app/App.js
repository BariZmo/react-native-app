import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Modal } from "react-native";

import NavBar from "./User/navBar";
import UserMainView from "./User/userMainView";
import ProfileView from "./User/profileView";
import HistoryView from "./User/historyView";
import ReportView from "./User/reportView";

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

  return (
    <View style={styles.app}>
      <UserMainView />
      <ProfileView userInfo={user} show={false} changeUserInfo={setUser} />

      {/*
      <HistoryView />
      <ReportView />
      <UserMainView />
      <ProfileView userInfo={user} show={false} changeUserInfo={setUser} />

      */}
      <NavBar status={true} />
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
    height: "10%",
  },
  profile: {
    width: "100%",
    height: "10%",
  },
});
