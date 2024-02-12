import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { useRouter, Stack } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setPersonal } from '../../redux/extraReducers/personalSlice';

import { HeaderBackButton } from '../../components/headerBackButton';

const PersonalScreen = () => {
  const personal = useSelector((state) => state.profiles[state.currentProfile].personal);
  const dispatch = useDispatch();

  const profileid = useSelector((state) => state.currentProfile);

  const [nameInput, setNameInput] = useState(personal.data.Name);
  const [emailInput, setEmailInput] = useState(personal.data.Email);
  const [phoneInput, setPhoneInput] = useState(personal.data.Phone);
  const [locationInput, setLocationInput] = useState(personal.data.Location);
  const [websiteInput, setWebsiteInput] = useState(personal.data.Website);
  const [linkedInInput, setLinkedInInput] = useState(personal.data.LinkedIn);
  const [gitHubInput, setGitHubInput] = useState(personal.data.GitHub);

  const theme = useTheme().colors;
  const styles = getStyles(theme);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen 
        options={{title: "Personal"}}
        headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
      />
      
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
            dispatch(setPersonal({profileid, data: {
              Name: nameInput,
              Email: emailInput,
              Phone: phoneInput,
              Location: locationInput,
              Website: websiteInput,
              LinkedIn: linkedInInput,
              GitHub: gitHubInput,
            }}));
            router.navigate('/profile');
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