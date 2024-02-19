import { View, ScrollView, SafeAreaView } from 'react-native';
import { useTheme, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default TemplateScreen = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <View style={{padding: 10}}>
          <Button
            mode="contained"
            onPress={() => router.navigate('/templates/0')}
          >
            Select
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});