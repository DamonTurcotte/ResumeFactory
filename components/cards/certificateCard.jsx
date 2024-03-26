import { Card, Text } from "react-native-paper";
import { View } from "react-native";

export const CertificateCard = ({ data, style, children }) => {
  return (
    <Card mode="outlined" style={style}>
      <Card.Content>
        <Text variant="headlineSmall">{data.Certificate}</Text>
        <Text variant="bodyLarge">Issuer: {data.Issuer}</Text>
        { data.IssueDate.length > 0 &&
          <Text variant="bodyLarge">Issued: {data.IssueDate}</Text>
        }
        { data.ExpirationDate.length > 0 &&
          <Text variant="bodyLarge">Expires: {data.ExpirationDate}</Text>
        }
        { data.CredentialID.length > 0 &&
          <Text variant="bodyLarge">ID: {data.CredentialID}</Text>
        }
      </Card.Content>
      <Card.Actions>
        {children}
      </Card.Actions>
    </Card>
  );
};