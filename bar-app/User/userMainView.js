import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  TextComponent,
  Modal,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import Profile from "./components/profile";
import Map from "../SharedItems/mapsView";
import NavBar from "./navBar";
import ProfileView from "./profileView";
import ReservationView from "./reservationsView";
import HistoryView from "./historyView";

export default function (props) {
  const [page, setPage] = useState(false);
  const [pageNav, setPageNav] = useState(2);

  const [user, setUser] = useState({
    id: 10,
    name: "Mantas",
    email: "mantas@et.lt",
    number: 112,
    rating: 10,
  });

  const MainPage = (role) => {
    return (
      <View style={styles.app}>
        <View style={styles.touch}>
          <TouchableOpacity onPress={() => setPage(!page)}>
            <Profile />
          </TouchableOpacity>
        </View>
        <View style={styles.popup}>
          {page ? (
            <ProfileView
              userInfo={user}
              show={false}
              changeUserInfo={setUser}
            />
          ) : null}
        </View>

        <View style={styles.nav}>
          <NavBar status={true} role={role} />
        </View>
      </View>
    );
  };

  const Navigation = () => {
    return (
      <View style={styles.app}>
        {pageNav == 2 ? (
          MainPage("user")
        ) : pageNav == 1 ? (
          <ReservationView show={false} />
        ) : pageNav == 3 ? (
          <HistoryView />
        ) : pageNav == 4 ? (
          <View style={styles.map}>
            <Map />
          </View>
        ) : null}
        <View style={styles.nav}>
          <NavBar
            status={true}
            role={"user"}
            SetStatus={setPageNav}
            seting={pageNav}
          />
        </View>
      </View>
    );
  };

  //{pageNav == 1 ? MainPage("user") : pageNav == 2 ? <ReservationView show={false} /> : null}
  // when navigating close edit page
  return (
    <View style={styles.app}>
      {Navigation()}
      <View style={styles.nav}>
        <NavBar
          status={true}
          role={"user"}
          SetStatus={setPageNav}
          seting={pageNav}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },

  nav: {
    bottom: 0,
    height: "10%",
    width: "100%",

    position: "absolute",
  },

  popup: {
    height: "25%",
    width: "100%",
    top: "55%",

    position: "absolute",
  },
  touch: {
    position: "absolute",
    top: "10%",
    paddingVertical: "10%",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    height: "40%",

    borderRadius: 400,
  },
  map: {
    width: "100%",
    height: "90%",
    position: "absolute",
    top: 0,
  },
  profile: {
    alignItems: "center",
    width: "100%",
    height: "10%",
  },
  ProfileView: {
    height: "100%",
  },
});
