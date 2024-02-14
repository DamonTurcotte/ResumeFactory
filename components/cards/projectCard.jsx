import { Card, Text, Button } from "react-native-paper";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

export const ProjectCard = ({ project, index, handleEdit, setDelete, style, buttonColor="gold" }) => {
  const theme = useTheme();
  return (
    <Card mode="outlined" style={style}>
      <Card.Content>
        <Text variant="headlineSmall">{project.Title}</Text>
        <Text variant="titleLarge">{project.Category}</Text>
        <Text variant="bodyMedium">{project.Start} - {project.End}</Text>
        <Text variant="bodySmall" style={{marginTop: 2}}>{project.Description}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="text" textColor={buttonColor} onPress={() => handleEdit(index)}>Edit</Button>
        <Button mode="text" textColor={buttonColor} onPress={() => setDelete(index)}>Delete</Button>
      </Card.Actions>
    </Card>
  );
}