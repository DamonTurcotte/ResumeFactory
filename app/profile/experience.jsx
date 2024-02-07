import { addJob, removeJob, editJob, setActive } from '../../redux/extraReducers/experienceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';

export default ExperienceScreen = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();
  const jobs = useSelector(state => state.profiles[state.currentProfile].experience.Jobs);

  console.log(jobs);
  
  return (
    <SafeAreaView style={getStyles(theme).safe}>
      <Stack.Screen 
        options={{title: "Experience"}}
        headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
      />
      <KeyboardAwareScrollView style={getStyles(theme).container}>



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
});