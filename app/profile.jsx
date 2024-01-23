import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  setEmail,
  setPhone,
  setLocation,
  setWebsite,
  setLinkedIn,
  setGitHub
} from "../redux/profileslice";
import { useState } from "react";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [name, setNameInput] = useState(profile.Name);
  const [email, setEmailInput] = useState(profile.Email);
  const [phone, setPhoneInput] = useState(profile.Phone);
  const [location, setLocationInput] = useState(profile.Location);
  const [website, setWebsiteInput] = useState(profile.Website);
  const [linkedIn, setLinkedInInput] = useState(profile.LinkedIn);
  const [gitHub, setGitHubInput] = useState(profile.Github);

  const theme = useTheme().colors;
  const styles = getStyles(theme);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => setNameInput(text)}
          style={styles.textInput}
          mode="outlined"
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmailInput(text)}
          style={styles.textInput}
          mode="outlined"
        />
        <TextInput
          label="Phone"
          value={phone}
          onChangeText={(text) => setPhoneInput(text)}
          style={styles.textInput}
          mode="outlined"
        />
        <TextInput
          label="Location"
          value={location}
          onChangeText={(text) => setLocationInput(text)}
          style={styles.textInput}
          mode="outlined"
        />
        <TextInput
          label="Website"
          value={website}
          onChangeText={(text) => setWebsiteInput(text)}
          style={styles.textInput}
          mode="outlined"
        />
        <TextInput
          label="LinkedIn"
          value={linkedIn}
          onChangeText={(text) => setLinkedInInput(text)}
          style={styles.textInput}
          mode="outlined"
        />
        <TextInput
          label="GitHub"
          value={gitHub}
          onChangeText={(text) => setGitHubInput(text)}
          style={styles.textInput}
          mode="outlined"
        />
        <Button
          mode="contained"
          onPress={() => {
            dispatch(setName(name));
            dispatch(setEmail(email));
            dispatch(setPhone(phone));
            dispatch(setLocation(location));
            dispatch(setWebsite(website));
            dispatch(setLinkedIn(linkedIn));
            dispatch(setGitHub(gitHub));
            router.push("/");
          }}
        >
          Save
        </Button>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    marginBottom: 10,
  }
});

export default ProfileScreen;