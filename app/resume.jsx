import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Dimensions, Pressable, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useState, useEffect } from "react";
import { FONT } from "../constants";
import { Stack } from "expo-router";
import { HeaderBackButton } from "../components";
import TextEditor from "../components/inputs/textEditor";

export default ResumeScreen = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={['top', 'bottom', 'left', 'right']}
      style={[styles.safe, { backgroundColor: theme.colors.background }]}
    >
      <Stack.Screen
        options={{
          title: "Resume",
          headerShown: false,
          headerLeft: () => <HeaderBackButton path="/" />,
        }}
      />
      <TextEditor
        tools={[
          'bold',
          'italic',
          'link',
          'underline',
          'strike',
          'bulletList',
          'orderedList',
          'sinkListItem',
          'liftListItem',
          'undo',
          'redo',
        ]}
        placeholder="This is a placeholder..."
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
});