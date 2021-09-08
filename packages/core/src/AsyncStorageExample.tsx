import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

// An example demonstrating the usage of native modules. 
// (Yes, it can be optimzed, but that's not the point of the example :P)
export function AsyncStorageExample(): JSX.Element {
  const [value, setValue] = useState("     ");
  const { getItem, setItem } = useAsyncStorage("@counter");

  const readItemFromStorage = async () => {
    const item = await getItem();
    setValue(item || "");
  };

  const writeItemToStorage = async (newValue: string) => {
    await setItem(newValue);
    setValue(newValue);
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <View style={styles.root}>
      <Text
        style={styles.text}
      >{`Use the button below and refresh the app to test the async-storage native module`}</Text>
      <View style={styles.row}>
        <Text style={styles.text}>Current value: </Text>
        <Text style={styles.value}>{value} </Text>
      </View>
      <Button
        onPress={() =>
          writeItemToStorage(Math.random().toString(36).substr(2, 5))
        }
        title="Update value"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 28,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  text: {
    maxWidth: 420,
    marginBottom: 12,
    fontSize: 22,
    fontWeight: "400",
    textAlign: "center",
  },
  value: {
    marginBottom: 12,
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center"
  },
});
