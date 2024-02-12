import { Card, Text } from "react-native-paper";
import { View } from "react-native";

export const SchoolCard = ({ data, style, children }) => {
  return (
    <Card mode="outlined" style={style}>
      <Card.Content>
        <Text variant="headlineSmall">{data.School}</Text>
        <Text variant="bodyLarge">{data.Credential}</Text>
        <Text variant="bodyLarge">{data.Start} {data.Start.length > 0 && data.End.length > 0 && "-"} {data.End}</Text>
        <Text variant="bodyLarge">{data.GPA}</Text>
        <Text variant="bodyLarge">{data.Description}</Text>
      </Card.Content>
      <Card.Actions>
        {children}
      </Card.Actions>
    </Card>
  );
};