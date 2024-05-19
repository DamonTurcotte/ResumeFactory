import { Stack } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Button, useTheme, Divider } from 'react-native-paper';

import { HeaderBackButton, DeleteModal, SchoolCard, TextArea, TextBox, EmptyCard } from '../../components';
import { addEducation, removeEducation, setEducation } from '../../redux/extraReducers/educationSlice';

const EducationScreen = () => {
  const [schoolEditor, setSchoolEditor] = useState(false);
  const [index, setIndex] = useState(-1);

  const [school, setSchool] = useState("");
  const [credential, setCredential] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [gpa, setGPA] = useState("");
  const [description, setDescription] = useState("");

  const [deleteIndex, setDeleteIndex] = useState(-1);

  const education = useSelector(state => state.profiles[state.currentProfile].education.data);

  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleSchoolEditor = () => setSchoolEditor(!schoolEditor);

  const saveSchoolData = () => {
    let data = {
      School: school,
      Credential: credential,
      Start: start,
      End: end,
      GPA: gpa,
      Description: description,
    };
    if (index === -1) {
      dispatch(addEducation({ data: data }));
    } else {
      dispatch(setEducation({ index: index, data: data }));
    }
    setSchool("");
    setCredential("");
    setStart("");
    setEnd("");
    setGPA("");
    setDescription("");
    handleSchoolEditor();
  };
  
  return (
    <SafeAreaView style={getStyles(theme).safe}>
      <Stack.Screen 
        options={{title: "Education"}}
        headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
      />
      <KeyboardAwareScrollView style={styles.container}>
        { schoolEditor ? (
          <>
            <Text
              variant='headlineMedium'
              style={styles.title}
            >
              { index === -1 ? "Add" : "Edit" } School
            </Text>
            <Divider
              style={styles.divider}
            />
            <TextBox
              label="Credential"
              value={credential}
              onChangeText={setCredential}
            />
            <TextBox
              label="School"
              value={school}
              onChangeText={setSchool}
            />
            <TextBox
              label="Start Date"
              value={start}
              onChangeText={setStart}
            />
            <TextBox
              label="End Date"
              value={end}
              onChangeText={setEnd}
            />
            <TextBox
              label="GPA"
              value={gpa}
              onChangeText={setGPA}
            />
            <TextArea
              label="Description"
              value={description}
              onChangeText={setDescription}
            />
            <Button
              mode="contained-tonal"
              onPress={saveSchoolData}
              style={styles.button}
              disabled={school === "" || credential === ""}
            >
              Save
            </Button>
            <Button
              mode="text"
              onPress={handleSchoolEditor}
              style={styles.button}
              textColor={theme.colors.onError}
              buttonColor={theme.colors.error}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
          { education.length === 0 && (
            <EmptyCard
              text={[
                'No education added yet.',
                'Add your academic history in chronological order starting with the most recent school.'
              ]}
            />
          )}
          { education.map((school, i) => (
            <SchoolCard
              key={i}
              data={school}
              style={i === 0 ? styles.initialCard : styles.card}
            >
              <Button
                mode='text'
                textColor={theme.colors.onBackgroundVariant}
                onPress={() => {
                  setIndex(i);
                  setSchool(school.School);
                  setCredential(school.Credential);
                  setStart(school.Start);
                  setEnd(school.End);
                  setGPA(school.GPA);
                  setDescription(school.Description);
                  handleSchoolEditor();
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
            </SchoolCard>
          ))}
          </>
        )}
      </KeyboardAwareScrollView>
        { !schoolEditor && (
          <Button
            mode="contained-tonal"
            onPress={handleSchoolEditor}
            style={styles.addButton}
            contentStyle={styles.addButtonContent}
          >
            Add School
          </Button>
        )}

      { deleteIndex !== -1 && (
        <DeleteModal
          visible={deleteIndex !== -1}
          hideModal={() => setDeleteIndex(-1)}
          deleteItem={() => {
            dispatch(removeEducation({ index: deleteIndex }));
            setDeleteIndex(-1);
          }}
        />
      )}
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
  initialCard: {
    marginVertical: 10,
  },
  card: {
    marginBottom: 10,
  },
  addButton: {
    borderRadius: 0,
  },
  addButtonContent: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default EducationScreen;