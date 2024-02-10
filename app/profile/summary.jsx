import { useTheme, TextInput, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSummary } from '../../redux/extraReducers/summarySlice';


export default SummaryScreen = () => {
  const summary = useSelector((state) => state.profiles[state.currentProfile].summary);
  const [summaryInput, setSummaryInput] = useState(summary.data);

  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();

  const dispatch = useDispatch();
  const profileid = useSelector((state) => state.currentProfile);
  
  return (
    <SafeAreaView style={getStyles(theme).safe}>
      <Stack.Screen 
        options={{title: "Summary"}}
        headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
      />
      <KeyboardAwareScrollView style={styles.container}>
        <TextInput
          style={styles.textInput}
          label='Summary'
          value={summaryInput}
          onChangeText={setSummaryInput}
          mode="outlined"
          multiline={true}
          numberOfLines={5}
          placeholder='Enter your professional summary here.'
        />
        <Button
          mode="contained"
          onPress={() => {
            dispatch(setSummary({profileid, data: summaryInput}));
            router.navigate('profile');
          }}
        >
          Save
        </Button>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  textInput: {
    marginBottom: 20,
  }
});