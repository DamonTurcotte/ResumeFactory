import { useTheme, TextInput, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setObjective } from '../../redux/extraReducers/objectiveSlice';

import { HeaderBackButton } from '../../components/headerBackButton';


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
        <TextInput
          style={styles.textInput}
          label='Objective'
          value={objectiveInput}
          onChangeText={setObjectiveInput}
          mode="outlined"
          multiline={true}
          numberOfLines={5}
          placeholder='Enter your objective here.'
        />
        <Button
          mode="contained"
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
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  textInput: {
    marginBottom: 20,
  }
});

export default ObjectiveScreen;