import { Card, Text } from "react-native-paper";
import { View } from "react-native";

export const SchoolCard = ({ data, style, children }) => {
  return (
    <Card mode="outlined" style={style}>
      <Card.Content>
        <Text variant="headlineSmall">{data.Credential}</Text>
        <Text variant="titleLarge">{data.School}</Text>
        <Text variant="bodyMedium">{data.Start} {data.Start.length > 0 && data.End.length > 0 && "-"} {data.End}</Text>
        <Text variant="bodyMedium">{data.GPA} GPA</Text>
        <Text variant="bodySmall">{data.Description}</Text>
      </Card.Content>
      <Card.Actions>
        {children}
      </Card.Actions>
    </Card>
  );
};