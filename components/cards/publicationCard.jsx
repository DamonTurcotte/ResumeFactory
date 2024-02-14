import { Card, Text } from "react-native-paper";
import { View } from "react-native";

export const PublicationCard = ({ data, style, children }) => {
  return (
    <Card mode="outlined" style={style}>
      <Card.Content>
        <Text variant="headlineSmall">{data.Title}</Text>
        <Text variant="bodyMedium">{data.Publisher}</Text>
        <Text variant="bodyMedium">{data.Date}</Text>
        <Text variant="bodyMedium">{data.URL}</Text>
        <Text variant="bodyMedium">{data.Description}</Text>
      </Card.Content>
      <Card.Actions>
        {children}
      </Card.Actions>
    </Card>
  );
};