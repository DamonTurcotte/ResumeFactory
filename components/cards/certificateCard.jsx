import { Card, Text } from "react-native-paper";
import { View } from "react-native";

export const CertificateCard = ({ data, style, children }) => {
  return (
    <Card mode="outlined" style={style}>
      <Card.Content>
        <Text variant="headlineSmall">{data.Certificate}</Text>
        <Text variant="bodyLarge">{data.Issuer}</Text>
        <Text variant="bodyLarge">{data.IssueDate}</Text>
        <Text variant="bodyLarge">{data.ExpirationDate}</Text>
        <Text variant="bodyLarge">{data.Description}</Text>
      </Card.Content>
      <Card.Actions>
        {children}
      </Card.Actions>
    </Card>
  );
};