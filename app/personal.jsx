import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  setName,
  setEmail,
  setPhone,
  setLocation,
  setWebsite,
  setLinkedIn,
  setGitHub
} from '../redux/extraReducers/personalSlice';

const PersonalScreen = () => {
  const personal = useSelector((state) => state.personal);
  const dispatch = useDispatch();

  const [nameInput, setNameInput] = useState(personal.Name);
  const [emailInput, setEmailInput] = useState(personal.Email);
  const [phoneInput, setPhoneInput] = useState(personal.Phone);
  const [locationInput, setLocationInput] = useState(personal.Location);
  const [websiteInput, setWebsiteInput] = useState(personal.Website);
  const [linkedInInput, setLinkedInInput] = useState(personal.LinkedIn);
  const [gitHubInput, setGitHubInput] = useState(personal.GitHub);

  const theme = useTheme().colors;
  const styles = getStyles(theme);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.textInput}
          label='Name'
          value={nameInput}
          onChangeText={setNameInput}
          mode="outlined"
        />
        <TextInput
          style={styles.textInput}
          label='Email'
          value={emailInput}
          onChangeText={setEmailInput}
          mode="outlined"
        />
        <TextInput
          style={styles.textInput}
          label='Phone'
          value={phoneInput}
          onChangeText={setPhoneInput}
          mode="outlined"
        />
        <TextInput
          style={styles.textInput}
          label='Location'
          value={locationInput}
          onChangeText={setLocationInput}
          mode="outlined"
        />
        <TextInput
          style={styles.textInput}
          label='Website'
          value={websiteInput}
          onChangeText={setWebsiteInput}
          mode="outlined"
        />
        <TextInput
          style={styles.textInput}
          label='LinkedIn'
          value={linkedInInput}
          onChangeText={setLinkedInInput}
          mode="outlined"
        />
        <TextInput
          style={styles.textInput}
          label='GitHub'
          value={gitHubInput}
          onChangeText={setGitHubInput}
          mode="outlined"
        />
        <Button
          mode='contained'
          onPress={() => {
            dispatch(setName(nameInput));
            dispatch(setEmail(emailInput));
            dispatch(setPhone(phoneInput));
            dispatch(setLocation(locationInput));
            dispatch(setWebsite(websiteInput));
            dispatch(setLinkedIn(linkedInInput));
            dispatch(setGitHub(gitHubInput));
            router.push('/');
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
  textInput: {
    marginBottom: 10,
  }
});

export default PersonalScreen;