import { Stack } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';

import { HeaderBackButton } from '../../components/headerBackButton';
import { DeleteModal } from '../../components/deleteModal';
import { addEducation, removeEducation, setEducation } from '../../redux/extraReducers/educationSlice';
import { SchoolCard } from '../../components/cards/schoolCard';


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
            <Text variant='headlineMedium'>
              Education Details
            </Text>
            <TextInput
              mode='outlined'
              label="School"
              value={school}
              onChangeText={setSchool}
            />
            <TextInput
              mode='outlined'
              label="Credential"
              value={credential}
              onChangeText={setCredential}
            />
            <TextInput
              mode='outlined'
              label="Start Date"
              value={start}
              onChangeText={setStart}
            />
            <TextInput
              mode='outlined'
              label="End Date"
              value={end}
              onChangeText={setEnd}
            />
            <TextInput
              mode='outlined'
              label="GPA"
              value={gpa}
              onChangeText={setGPA}
            />
            <TextInput
              mode='outlined'
              label="Description"
              value={description}
              onChangeText={setDescription}
              numberOfLines={3}
              multiline
            />
            <Button
              mode="contained"
              onPress={saveSchoolData}
              style={styles.button}
            >
              Save
            </Button>
          </>
        ) : (
          <>
          { education.map((school, i) => (
            <SchoolCard
              key={i}
              data={school}
              style={styles.card}
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
          <Button
            mode="contained"
            onPress={handleSchoolEditor}
          >
            Add School
          </Button>
          </>
        )}
      </KeyboardAwareScrollView>
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
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  button: {
    marginTop: 10,
  },
  card: {
    marginBottom: 10,
  },
});

export default EducationScreen;