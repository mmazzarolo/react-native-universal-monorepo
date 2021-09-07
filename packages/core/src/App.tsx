import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LogoSrc from "./logo.png";

declare var __SUB_PLATFORM__: string | undefined; // eslint-disable-line

export function App(): JSX.Element {
  let platform = Platform.OS;
  if (typeof __SUB_PLATFORM__ === "string") {
    platform += ` (${__SUB_PLATFORM__})`;
  }
  return (
    <SafeAreaView style={styles.root}>
      <Image style={styles.logo} source={LogoSrc as any} />
      <Text style={styles.text}>Hello from React Native!</Text>
      <View style={styles.platformRow}>
        <Text style={styles.text}>Platform: </Text>
        <View style={styles.platformBackground}>
          <Text style={styles.platform}>{platform}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: "600",
  },
  platformRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  platform: {
    fontSize: 28,
    fontWeight: "500",
  },
  platformBackground: {
    backgroundColor: "#ececec",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d4d4d4',
    paddingHorizontal: 6,
    borderRadius: 6,
    alignItems: "center",
  },
});
