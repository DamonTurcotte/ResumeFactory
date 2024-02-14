import { Card, Text } from 'react-native-paper';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

export const JobCard = ({ data, style, children }) => {
  const theme = useTheme();
  return (
  <Card mode='outlined' style={style}>
    <Card.Content>
      <Text variant='headlineSmall'>{data.Title}</Text>
      <Text variant='titleLarge'>{data.Company}</Text>
      <Text variant='bodyMedium'>{data.Location}</Text>
      <Text variant='bodyMedium'>{data.Start} {data.Start.length > 0 && data.End.length > 0 && '-'} {data.End}</Text>
      { data.Duties.map((duty, index) => (
        <View key={index} style={{flexDirection: 'row'}}>
          <View>
            <Text variant='bodySmall'>• </Text>
          </View>
          <Text variant='bodySmall'>{duty}</Text>
        </View>
      ))}
    </Card.Content>
    <Card.Actions>
      {children}
    </Card.Actions>
  </Card>
)}