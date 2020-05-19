import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import Profile from "./components/profile";
import NavBar from "./navBar";
import AdminUsersView from "./adminUsersView";
import AdminBarsView from "./adminBarsView";


export default function (props) {
  const [page, setPage] = useState(false);
  const [pageNav, setPageNav] = useState(2);
  const [profileVisible, setProfileVisible] = useState(true);

  const [user, setUser] = useState({
    id: 10,
    name: "admin",
    email: "admin@admin.com",
    number: 866969696,
    rating: 1,
    password: "admin",
    ban: 0,
  });

  const MainPage = (role) => {
    return (
      <View style={styles.app}>
        {profileVisible ? (
          <View style={styles.touch}>
            <TouchableOpacity onPress={() => setPage(!page)}>
              <Profile
                profileVisibility={profileVisible}
                isBlocked={user.ban == 0 ? false : true}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };

  const Navigation = () => {
    return (
      <View style={styles.app}>
        {pageNav == 2 ? (
          MainPage("admin")
        ) : pageNav == 1 ? (
          <AdminUsersView show={false} />
        ) : pageNav == 3 ? (
            <AdminBarsView show={false} />
        ) : pageNav == 4 ? (
            MainPage("admin")
        ) : null}
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
    backgroundColor: "#acdba7",
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
