import { Modal, Portal, Text, Button } from "react-native-paper";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

export const DeleteModal = ({ visible, hideModal, deleteItem }) => {
  const theme = useTheme();

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{
        padding: 20,
        backgroundColor: theme.colors.surface,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: theme.colors.outline,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
      }}>
        <Text variant='headlineMedium'>Are you sure?</Text>
        <View style={{flexDirection: 'row'}}>
          <Button mode="contained" style={{margin: 10}} onPress={deleteItem}>
            Confirm
          </Button>
          <Button mode="outlined" style={{margin: 10}} onPress={hideModal}>
            Cancel
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};