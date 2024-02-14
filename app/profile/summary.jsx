import { useTheme, TextInput, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native';

import { setSummary } from '../../redux/extraReducers/summarySlice';
import { HeaderBackButton, TextArea } from '../../components';

const SummaryScreen = () => {
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
        <TextArea
          style={styles.textInput}
          label='Summary'
          value={summaryInput}
          onChangeText={setSummaryInput}
          placeholder='Enter your professional summary.'
        />
        <Button
          disabled={summaryInput === summary.data}
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
    paddingHorizontal: 20,
    backgroundColor: theme.colors.background,
  },
  textInput: {
    marginVertical: 10,
  }
});

export default SummaryScreen;