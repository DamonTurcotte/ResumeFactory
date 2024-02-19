import { SafeAreaView, View } from "react-native";
import { useTheme, Text, Button, TextInput } from "react-native-paper";
import { removeProfile, setProfileID } from '../redux/profileSlice';
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "expo-router";
import { useState } from "react";

export default SettingsScreen = () => {
  const [changeID, setChangeID] = useState(false);
  const [newID, setNewID] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.currentProfile);
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation();

  const deleteProfile = () => {
    dispatch(removeProfile(currentProfile));
    navigation.reset({
      index: 0,
      routes: [{ name: 'index' }],
    });
  }

  const confirmDeleteProfile = () => {
    if (deleteInput.trim().toLowerCase() === 'delete') {
      deleteProfile();
    } else {
      setConfirmDelete(false);
      setDeleteInput('');
    }
  };

  const confirmChangeID = () => {
    if (newID.trim() === '') {
      setChangeID(false);
      setNewID('');
      return;
    } else {
      setChangeID(false);
      dispatch(setProfileID({ currentID: currentProfile, newID }));
      setNewID('');
      navigation.reset({
        index: 0,
        routes: [{ name: 'index' }],
      });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 20, margin: 10 }}>Profile Settings</Text>
        <Button
          mode="contained"
          contentStyle={{ height: 50 }}
          style={{ borderRadius: 0 }}
          onPress={() => setChangeID(!changeID)}
        >Change Profile ID</Button>
        {changeID && (
          <TextInput
            label="New Profile ID"
            value={newID}
            onChangeText={setNewID}
            onSubmitEditing={confirmChangeID}
            autoFocus={true}
          />
        )}
        <Button
          mode="contained"
          contentStyle={{ height: 50 }}
          textColor={theme.colors.onError}
          buttonColor={theme.colors.error}
          style={{ borderRadius: 0 }}
          onPress={() => setConfirmDelete(!confirmDelete)}
        >Delete Profile</Button>
        {confirmDelete && (
          <View>
            <TextInput
              label="Type DELETE to confirm"
              value={deleteInput}
              onChangeText={setDeleteInput}
              onSubmitEditing={confirmDeleteProfile}
              autoFocus={true}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});