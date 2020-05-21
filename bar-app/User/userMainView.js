import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import Profile from "./components/profile";
import Map from "../SharedItems/mapsView";
import NavBar from "./navBar";
import ProfileView from "./profileView";
import ReservationView from "./reservationsView";
import HistoryView from "./historyView";

export default function () {
  const [page, setPage] = useState(false);
  const [pageNav, setPageNav] = useState(2);
  const [profileVisible, setProfileVisible] = useState(true);

  const [user, setUser] = useState({});
  const [needLoad, setNeedLoad] = useState(true);
  let loadUser = () => {
    fetch("https://barappbroker20200515061143.azurewebsites.net/user")
      .then((response) => {
        setNeedLoad(false);
        return response.json();
      })
      .then((json) => {
        console.log("Loaded users.");
        let user = json.find((u) => u.id == global.loginId);
        if (user != undefined) {
          fetch(
            `https://barappbroker20200515061143.azurewebsites.net/userrating/${global.loginId}`
          )
            .then((response) => response.json())
            .then((rating) => {
              user.rating = rating;
              setUser(user);
            });
        }
      });
  };
  if (needLoad) loadUser();

  const MainPage = (role) => {
    return (
      <View style={styles.app}>
        {profileVisible ? (
          <View style={styles.touch}>
            <TouchableOpacity onPress={() => setPage(!page)}>
              <Profile profileVisibility={profileVisible} user={user} />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.popup}>
          {page ? (
            <ProfileView
              userInfo={user}
              show={false}
              changeUserInfo={(newData) => {
                console.log("change");
              }}
              SetProfile={setProfileVisible}
            />
          ) : null}
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
      </View>
    );
  };

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
    backgroundColor: "#033033",
    alignItems: "center",
  },

  nav: {
    bottom: 0,
    height: "10%",
    width: "100%",

    position: "absolute",
  },

  popup: {
    height: "30%",
    width: "100%",
    top: "50%",

    position: "absolute",
  },
  touch: {
    position: "absolute",
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
