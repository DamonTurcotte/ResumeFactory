import { StyleSheet } from 'react-native';

import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { Text } from 'react-native-paper';

export default function TabTwoScreen() {
  const theme = useTheme().colors;
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Tab Two</Text>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
