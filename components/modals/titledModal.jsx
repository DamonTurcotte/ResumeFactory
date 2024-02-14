import { Modal, Portal, Text, Button } from "react-native-paper";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

export const TitledModal = ({ visible, onDismiss, title, contentContainerStyle, titleStyle={}, innerContainerStyle={}, children }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[styles.modal, contentContainerStyle]}
      >
        <Text style={titleStyle} variant='headlineMedium'>{title}</Text>
        <View style={[styles.container, innerContainerStyle]}>
          {children}
        </View>
      </Modal>
    </Portal>
  );
};

const getStyles = (theme) => ({
  modal: {
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  container: {
    width: '100%',
    marginTop: 10,
  },
})