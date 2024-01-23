import { View, StyleSheet, SafeAreaView } from 'react-native';

import { Text, Modal, useTheme, Button, TextInput } from 'react-native-paper';

import { increment, decrement, incrementByAmount } from '../../redux/counter';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';

export default function TabOneScreen() {
  const theme = useTheme().colors;
  const styles = getStyles(theme);

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
        <Text style={styles.title}>{count}</Text>
        <Button mode='contained' onPress={() => dispatch(increment())}>Increment</Button>

        <Button mode='contained' onPress={() => router.push('/profile')}>Profile</Button>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: "black"
  },
});
