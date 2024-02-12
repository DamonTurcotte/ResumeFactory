import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';

import { HeaderBackButton } from '../../components/headerBackButton';
import { DeleteModal } from '../../components/deleteModal';


const ReferenceScreen = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  
  return (
    <SafeAreaView style={getStyles(theme).safe}>
      <Stack.Screen 
        options={{title: "References"}}
        headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
      />
      <KeyboardAwareScrollView style={styles.container}>



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

export default ReferenceScreen;