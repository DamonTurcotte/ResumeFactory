import { Text, useTheme } from "react-native-paper";
import { View } from "react-native";

export const EmptyCard = ({ text=['Item 1'], style={} }) => {
  const theme = useTheme();

  const styles = {
    emptyCard: {
      marginTop: 15,
      padding: 10,
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      elevation: 4, 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    emptyText: {
      textAlign: 'center',
      color: theme.colors.onSurface,
      marginVertical: 5,
    }
  };

  return (
    <View style={[styles.emptyCard, style]}>
      {text.map((item, index) => (
        <Text key={index} style={styles.emptyText}>{item}</Text>
      ))}
    </View>
  );
}