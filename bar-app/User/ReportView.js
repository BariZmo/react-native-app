import React, { useState } from "react";
import { Text, View, Button, TextInput, Modal } from "react-native";

///BUGS -> inputs doesnt refresh when closed and opened again

export default function (props) {
  const [bugType, setBugType] = useState();

  const bugTypeHandler = (bugTyped) => {
    setBugType(bugTyped);
  };

  const [bugDesciption, setBugDesciption] = useState();

  const descriptionTypeHandler = (descriptionTyped) => {
    setBugDesciption(descriptionTyped);
    console.log(bugDesciption);
  };

  const [reportVisibility, setreportVisibility] = useState(true);

  const SendReport = () => {
    props.SetVisibility(false);
    //send()
  };

  //{props.reportVisibility}>
  return (
    <View>
      <Modal visible={props.Visibility} animationType="slide">
        <View>
          <Text> Bug type: </Text>
          <TextInput
            placeholder="type"
            onChangeText={bugTypeHandler}
            value={bugType}
          />
        </View>
        <View>
          <Text> Bug description: </Text>
          <TextInput
            placeholder="Description"
            onChangeText={descriptionTypeHandler}
            value={bugDesciption}
          />
        </View>
        <Button title="Send" onPress={() => SendReport()} />
        <Button title="Cancel" onPress={() => props.SetVisibility(false)} />
      </Modal>
    </View>
  );
}
