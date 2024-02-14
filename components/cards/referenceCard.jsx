import { Card, Text } from "react-native-paper";
import { View } from "react-native";

export const ReferenceCard = ({ data, style, children }) => {
  return (
    <Card mode="outlined" style={style}>
      <Card.Content>
        <Text variant="headlineSmall">{data.Name}</Text>
        <Text variant="bodyMedium">{data.Position}</Text>
        <Text variant="bodyMedium">{data.Company}</Text>
        <Text variant="bodyMedium">{data.Phone}</Text>
        <Text variant="bodyMedium">{data.Email}</Text>
      </Card.Content>
      <Card.Actions>
        {children}
      </Card.Actions>
    </Card>
  );
};