import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Button, useTheme, Divider } from 'react-native-paper';

import { HeaderBackButton, DeleteModal, TextBox, ReferenceCard, EmptyCard } from '../../components';
import { addReference, removeReference, setReference } from '../../redux/extraReducers/referenceSlice';

const ReferenceScreen = () => {
  const [index, setIndex] = useState(-1);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [referenceEditor, setReferenceEditor] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const references = useSelector(state => state.profiles[state.currentProfile].references.data);

  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = getStyles(theme);

  const saveReferenceData = () => {
    let data = {
      Name: name,
      Position: position,
      Company: company,
      Phone: phone,
      Email: email,
    };
    if (index === -1) {
      dispatch(addReference({ data: data }));
    } else {
      dispatch(setReference({ index: index, data: data }));
    }
    setName("");
    setPosition("");
    setCompany("");
    setPhone("");
    setEmail("");
    setReferenceEditor(false);
  };
  
  return (
    <SafeAreaView style={getStyles(theme).safe}>
      <Stack.Screen 
        options={{title: "References"}}
        headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
      />
      <KeyboardAwareScrollView style={styles.container}>
        { referenceEditor ? (
          <View>
            <Text
              variant='headlineMedium'
              style={styles.title}
            >
              { index === -1 ? "Add" : "Edit" } Reference
            </Text>
            <Divider
              style={styles.divider}
            />
            <TextBox
              label="Name"
              value={name}
              onChangeText={setName}
            />
            <TextBox
              label="Position"
              value={position}
              onChangeText={setPosition}
            />
            <TextBox
              label="Company"
              value={company}
              onChangeText={setCompany}
            />
            <TextBox
              label="Phone"
              value={phone}
              onChangeText={setPhone}
            />
            <TextBox
              label="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Button
              disabled={name === ""}
              mode="contained"
              onPress={saveReferenceData}
              style={styles.button}
            >
              Save
            </Button>
            <Button
              mode="contained"
              onPress={() => setReferenceEditor(false)}
              style={styles.button}
              textColor={theme.colors.onError}
              buttonColor={theme.colors.error}
            >
              Cancel
            </Button>
          </View>
        ) : (
          <View
            style={styles.subcontainer}
          >
            { references.length === 0 && (
              <EmptyCard
                text={[
                  'No references added yet.',
                  'Add people who can vouch for your work.'
                ]}
              />
            )}
            { references.map((reference, i) => (
              <ReferenceCard key={i} data={reference} style={styles.card}>
                <Button
                  mode='text'
                  textColor={theme.colors.onBackgroundVariant}
                  onPress={() => {
                    setIndex(i);
                    setName(reference.Name);
                    setPosition(reference.Position);
                    setCompany(reference.Company);
                    setPhone(reference.Phone);
                    setEmail(reference.Email);
                    setReferenceEditor(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  mode='text'
                  textColor={theme.colors.onBackgroundVariant}
                  onPress={() => setDeleteIndex(i)}
                >
                  Delete
                </Button>
              </ReferenceCard>
            ))}
          </View>
        )}
      </KeyboardAwareScrollView>
      { !referenceEditor && (
        <Button
          mode="contained"
          onPress={() => setReferenceEditor(true)}
          style={styles.addButton}
          contentStyle={styles.addButtonContent}
        >
          Add Reference
        </Button>
      )}
      <DeleteModal
        visible={deleteIndex > -1}
        hideModal={setDeleteIndex}
        deleteItem={() => dispatch(removeReference({ index: deleteIndex }))}
      />
    </SafeAreaView>
  );
}

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.background,
  },
  subcontainer: {
    marginVertical: 10,
  },
  title: {
    marginTop: 10,
  },
  divider: {
    marginBottom: 10,
    backgroundColor: theme.colors.outline,
  },
  button: {
    marginTop: 10,
  },
  card: {
    marginBottom: 10,
  },
  addButton: {
    borderRadius: 0,
  },
  addButtonContent: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ReferenceScreen;