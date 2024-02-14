import { useTheme, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native';

import { setObjective } from '../../redux/extraReducers/objectiveSlice';
import { HeaderBackButton, TextArea } from '../../components';

const ObjectiveScreen = () => {
  const objective = useSelector((state) => state.profiles[state.currentProfile].objective);
  const [objectiveInput, setObjectiveInput] = useState(objective.data);

  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();

  const dispatch = useDispatch();
  const profileid = useSelector((state) => state.currentProfile);
  
  return (
    <SafeAreaView style={getStyles(theme).safe}>
      <Stack.Screen 
        options={{title: "Objective"}}
        headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
      />
      <KeyboardAwareScrollView style={styles.container}>
        <TextArea
          style={styles.textInput}
          label='Objective'
          value={objectiveInput}
          onChangeText={setObjectiveInput}
          placeholder='Enter your employment objective.'
        />
        <Button
          mode="contained"
          disabled={objectiveInput === objective.data}
          onPress={() => {
            dispatch(setObjective({profileid, data: objectiveInput}));
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

export default ObjectiveScreen;