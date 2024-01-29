import { View, StyleSheet, SafeAreaView } from 'react-native';

import { Text, Modal, useTheme, Button, TextInput } from 'react-native-paper';

import { useRouter, Stack } from 'expo-router';

export default function TabOneScreen() {
  const theme = useTheme().colors;
  const styles = getStyles(theme);

  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <Button style={styles.button} mode='contained' onPress={() => router.push('/personal')}>Personal</Button>
          <Button style={styles.button} mode='contained' onPress={() => router.push('/certifications')}>Certifications</Button>
          <Button style={styles.button} mode='contained' onPress={() => router.push('/education')}>Education</Button>
          <Button style={styles.button} mode='contained' onPress={() => router.push('/experience')}>Experience</Button>
          <Button style={styles.button} mode='contained' onPress={() => router.push('/objective')}>Objective</Button>
          <Button style={styles.button} mode='contained' onPress={() => router.push('/projects')}>Projects</Button>
          <Button style={styles.button} mode='contained' onPress={() => router.push('/skills')}>Skills</Button>
          <Button style={styles.button} mode="contained" onPress={() => router.push('/summary')}>Summary</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subcontainer: {
    width: "80%"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
  },
});
