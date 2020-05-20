import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextComponent,
  Modal,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer, useLinkProps, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// *sort by date

export default function (props, { navigation }) {
  const [users, setUsers] = useState([
    {
      id: 1, name: "Stikliai", adress: "Stiklių g. 12", phone: "8611111111", email: "stikliai@mail.com",
    },
    {
      id: 2, name: "Solento", adress: "Solento g. 16", phone: "8622222222", email: "solento@mail.com",
    },
    {
      id: 3, name: "tV", adress: "Lazdijų g. 32", phone: "8633333333", email: "tv@mail.com",
    },
    {
      id: 4, name: "Bokštas", adress: "Bokšto g. 22", phone: "8644444444", email: "bokstas@mail.com",
    },
    {
      id: 5, name: "Pasaka", adress: "Įsivaizduojama g. 69", phone: "8655555555", email: "pasakos@mail.com",
    },
    {
      id: 6, name: "Parkas", adress: "Parko g. 62", phone: "8666666666", email: "parkas@mail.com",
    },
    {
      id: 7, name: "Gedimino", adress: "Gedimino g. 1", phone: "8677777777", email: "gediminas@mail.com",
    },
    {
      id: 8, name: "Pilies", adress: "Pilies g. 10", phone: "8688888888", email: "pilis@mail.com",
    },
    {
      id: 9, name: "Inkilas", adress: "Medžio g. 6", phone: "8699999999", email: "Inkilai@mail.com",
    },
    {
      id: 10, name: "Rojus", adress: "Dangaus g. 62", phone: "8696969696", email: "heaven@mail.com",
    },
    {
      id: 11, name: "Gatvė", adress: "Gatvės g. 96", phone: "8611222333", email: "gatve@mail.com",
    },
    {
      id: 12, name: "Virtis", adress: "Vilčių g. 34", phone: "8674852963", email: "virtis@mail.com",
    },
  ]);
  function UserInfo({ infoElement }) {
    console.log(infoElement);
    return (
      <View style={styles.user}>
      <View style={styles.titleLine}>
        <Text>Baras: {infoElement.name}</Text>
      </View>
      <View style={styles.firstLine}>
        <Button color="#ff5c5c" title="Panaikinti"/>
        <Button color="#ff5c5c" title="Redaguoti"/>
      </View>
      <View style={styles.secondLine}>
        <Text>ID: {infoElement.id}</Text>
        <Text>Adresas: {infoElement.adress}</Text>
        <Text>Tel. numeris: {infoElement.phone}</Text>
      </View>
      <View style={styles.thirdLine}>
        <Text>El. paštas: {infoElement.email}</Text>
      </View>
    </View>
    );
  }

  return (
    <View style={ styles.barButton }>
        <GoToButton 
          color="#158a51"
          title="Pridėti barą"
          />
      <FlatList
        data={users}
        renderItem={({ item }) => <UserInfo infoElement={item} />}
        keyExtractor={(user) => user.id}
      />
    </View>
  );
}

function GoToButton() {
  const navigation = useNavigation();
  return (
    <Button
      title="Pridėti barą"
      onPress={() => navigation.navigate("AddBarPage")}
    />
  );
}

const styles = StyleSheet.create({
  user: {
    width: "100%",
    paddingVertical: "2%",
    backgroundColor: "#53914d",
    marginBottom: 60,
  },
  titleLine: {
    justifyContent: "right",
    width: "100%",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    backgroundColor: "#acdba7",
    justifyContent: "space-between",

  },
  firstLine: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: "5%",
    backgroundColor: "#96d690",
    justifyContent: "space-between",
  },
  secondLine: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    backgroundColor: "#96d690",
    justifyContent: "space-between",
  },
  thirdLine: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    backgroundColor: "#96d690",
    justifyContent: "space-between",
  },
  barButton: {
    width: "100%",
    marginTop: 25,
  }
});
