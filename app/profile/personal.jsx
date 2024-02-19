import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useRouter, Stack } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { SafeAreaView } from "react-native";

import { setPersonal } from '../../redux/extraReducers/personalSlice';
import { HeaderBackButton, TextBox } from '../../components';

const PersonalScreen = () => {
  const personal = useSelector((state) => state.profiles[state.currentProfile].personal);
  const dispatch = useDispatch();

  const profileid = useSelector((state) => state.currentProfile);

  const [nameInput, setNameInput] = useState(personal.data.Name);
  const [positionInput, setPositionInput] = useState(personal.data.Position);
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
        <TextBox
          style={[styles.textInput, {marginTop: 10}]}
          label='Name'
          value={nameInput}
          onChangeText={setNameInput}
        />
        <TextBox
          style={styles.textInput}
          label='Position'
          value={positionInput}
          onChangeText={setPositionInput}
        />
        <TextBox
          style={styles.textInput}
          label='Email'
          value={emailInput}
          onChangeText={setEmailInput}
        />
        <TextBox
          style={styles.textInput}
          label='Phone'
          value={phoneInput}
          onChangeText={setPhoneInput}
        />
        <TextBox
          style={styles.textInput}
          label='Location'
          value={locationInput}
          onChangeText={setLocationInput}
        />
        <TextBox
          style={styles.textInput}
          label='Website'
          value={websiteInput}
          onChangeText={setWebsiteInput}
        />
        <TextBox
          style={styles.textInput}
          label='LinkedIn'
          value={linkedInInput}
          onChangeText={setLinkedInInput}
        />
        <TextBox
          style={styles.textInput}
          label='GitHub'
          value={gitHubInput}
          onChangeText={setGitHubInput}
        />
        <Button
          mode='contained'
          style={styles.save}
          disabled={nameInput === "" || (nameInput === personal.data.Name && positionInput === personal.data.Position && emailInput === personal.data.Email && phoneInput === personal.data.Phone && locationInput === personal.data.Location && websiteInput === personal.data.Website && linkedInInput === personal.data.LinkedIn && gitHubInput === personal.data.GitHub)}
          onPress={() => {
            dispatch(setPersonal({profileid, data: {
              Name: nameInput,
              Position: positionInput,
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
    marginBottom: 5,
  },
  save: {
    marginTop: 5,
  },
});

export default PersonalScreen;