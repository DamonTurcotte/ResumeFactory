import { ScrollView, View } from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProfile, setCurrentProfile } from '../redux/profileSlice';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

import { FONT } from "../constants";

export default App = () => {
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme)
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profiles);
  const profileOrder = useSelector((state) => state.order);
  const [newProfile, setNewProfile] = useState(false);
  const [profileID, setProfileID] = useState("");

  const toggleNewProfile = () => {
    setNewProfile(!newProfile);
  }

  const submitProfile = () => {
    if (profileID.length > 0) {
      dispatch(addProfile(profileID));
    }
    setProfileID("");
    toggleNewProfile();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Resume
          </Text>
          <Text style={[styles.title, {color: theme.colors.logo}]}>
            IO
          </Text>
        </View>
        
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >

        {profileOrder.map((profile, index) => (
          <Button
            key={index}
            mode="contained-tonal"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            contentStyle={styles.buttonContent}
            icon={() => <FontAwesome name="user-circle" size={30} color={theme.colors.onPrimary} />}
            onPress={() => {
              dispatch(setCurrentProfile(profile));
              router.navigate("profile");
            }}
          >
            {profile}
          </Button>
        ))}

        { newProfile ? (
          <TextInput
            value={profileID}
            onChangeText={(text) => setProfileID(text)}
            style={styles.textInput}
            label='Profile ID'
            mode="outlined"
            returnKeyType="done"
            autoFocus
            onSubmitEditing={submitProfile}
            />
            ) : (
            <Button
              mode="outlined"
              style={styles.button}
              labelStyle={styles.buttonLabel}
              onPress={toggleNewProfile}
            >
              + Create Profile
            </Button>
        )}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  container: {
    marginTop: 20,
    width: "90%",
    padding: 10,
    borderRadius: 20,
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: FONT.OrbitronM,
    fontSize: 50,
    textAlign: "center",
    marginVertical: 10,
    color: theme.colors.onBackground,
  },
  scroll: {
    width: "100%",
    elevation: 5,
    borderRadius: 20
  },
  scrollContent: {
    backgroundColor: theme.colors.surface,
    padding: 20,
    borderRadius: 20
  },
  button: {
    marginVertical: 5,
    justifyContent: "center",
  },
  buttonLabel: {
    height: 30,
    textAlignVertical: "center",
    lineHeight: 30,
  },
  buttonContent: {
    justifyContent: "space-between",
    flexDirection: "row-reverse"
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.onPrimary,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textInput: {
    marginVertical: 5,
  }
})