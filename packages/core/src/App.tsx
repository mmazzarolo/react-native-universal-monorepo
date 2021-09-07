import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";

interface SectionProps {
  title: string;
  children?: React.ReactNode;
}

export const App = () => {
  return (
    <SafeAreaView>
      <Text>Hello!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

