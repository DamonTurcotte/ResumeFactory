import { ScrollView, View, Dimensions, Animated, Easing, Pressable } from "react-native";
import { Text, TextInput, Button, useTheme, TouchableRipple } from "react-native-paper";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProfile, setCurrentProfile } from '../redux/profile';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

import { FONT } from "../constants";
import { Icon, Logo, CreateFileButton, FileSelect } from "../components";

export default App = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={{
          marginTop: 10,
        }}
      >
        <Logo />
        <View style={styles.container}>
          <CreateFileButton
            title1="Build a"
            title2="New Resume"
            icon="resume"
            onPress={() => console.log("Build a new resume")}
          />
          <CreateFileButton
            title1="Write a"
            title2="Cover Letter"
            icon="letter"
            onPress={() => console.log("Write a cover letter")}
          />
          <FileSelect />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
})