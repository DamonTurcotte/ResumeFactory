import { Card, Text } from "react-native-paper";
import { View } from "react-native";

export const CertificateCard = ({ data, style, children }) => {
  return (
    <Card mode="outlined" style={style}>
      <Card.Content>
        <Text variant="headlineSmall">{data.Certificate}</Text>
        <Text variant="bodyLarge">Issuer: {data.Issuer}</Text>
        <Text variant="bodyLarge">Issued: {data.IssueDate}</Text>
        <Text variant="bodyLarge">Expires: {data.ExpirationDate}</Text>
        <Text variant="bodyLarge">ID: {data.CredentialID}</Text>
      </Card.Content>
      <Card.Actions>
        {children}
      </Card.Actions>
    </Card>
  );
};