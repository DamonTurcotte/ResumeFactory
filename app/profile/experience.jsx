import { Stack } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text, useTheme, Divider } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { addJob, removeJob, setJob } from '../../redux/extraReducers/experienceSlice';
import { JobCard, HeaderBackButton, DeleteModal, TextBox } from '../../components';

const ExperienceScreen = () => {
  const [jobEditor, setJobEditor] = useState(false);
  const [index, setIndex] = useState(-1);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duties, setDuties] = useState([]);

  const [deleteIndex, setDeleteIndex] = useState(-1);

  const experience = useSelector(state => state.profiles[state.currentProfile].experience.data);
  
  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleJobEditor = () => {
    setJobEditor(!jobEditor);
  }
  
  const saveJobData = () => {
    let job = {
      Title: title,
      Company: company,
      Location: location,
      Start: startDate,
      End: endDate,
      Duties: duties,
    };
    if (index === -1) {
      dispatch(addJob({ data: job }));
    } else {
      dispatch(setJob({ index: index, data: job }));
    }
    setTitle("");
    setCompany("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setDuties([]);
    handleJobEditor();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen 
        options={{title: "Experience"}}
        headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
      />
      
      <KeyboardAwareScrollView style={styles.container}>
        { jobEditor ? (
        <>
          <Text style={styles.title} variant='headlineMedium'>
            { index === -1 ? "Add" : "Edit" } Job
          </Text>
          <Divider style={{marginBottom: 5, backgroundColor: theme.colors.outline}} />
          <TextBox
            label="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextBox
            label="Company"
            value={company}
            onChangeText={(text) => setCompany(text)}
          />
          <TextBox
            label="Location"
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
          <TextBox
            label="Start Date"
            value={startDate}
            onChangeText={(text) => setStartDate(text)}
          />
          <TextBox
            label="End Date"
            value={endDate}
            onChangeText={(text) => setEndDate(text)}
          />

          <Text
            style={styles.text}
          >Duties</Text>

          <View style={styles.listRow}>
              <View style={styles.listDecoration}>

              </View>
              <View style={{flex: 1}}>
                { duties.map((duty, i) => (
                  <TextBox
                    key={i}
                    label={`Duty ${i + 1}`}
                    value={duty}
                    close={() => {
                      let temp = [...duties];
                      temp.splice(i, 1);
                      setDuties(temp);
                    }}
                    onChangeText={(text) => {
                      let temp = [...duties];
                      temp[i] = text;
                      setDuties(temp);
                    }}
                  />
                ))}
                <Button
                  mode="outlined"
                  style={styles.smallButton}
                  onPress={() => {
                    let temp = [...duties];
                    temp.push("");
                    setDuties(temp);
                  }}
                >
                  Add Duty
                </Button>
              </View>
          </View>

          <Button
            mode="contained"
            onPress={saveJobData}
            style={styles.button}
            disabled={title === "" || company === ""}
          >
            Save
          </Button>
          <Button
            mode="text"
            onPress={handleJobEditor}
            style={styles.button}
            textColor={theme.colors.onError}
            buttonColor={theme.colors.error}
          >
            Cancel
          </Button>
        </>
        ) : (
        <>
          { experience.map((job, i) => (
            <JobCard
              key={i}
              data={job}
              style={i === 0 ? styles.initialCard : styles.card}
            >
              <Button
                mode="text"
                textColor={theme.colors.onBackgroundVariant}
                onPress={() => {
                  setIndex(i);
                  setTitle(job.Title);
                  setCompany(job.Company);
                  setLocation(job.Location);
                  setStartDate(job.Start);
                  setEndDate(job.End);
                  setDuties(job.Duties);
                  handleJobEditor();
                }}
              >
                Edit
              </Button>
              <Button
                mode="text"
                textColor={theme.colors.onBackgroundVariant}
                onPress={() => setDeleteIndex(i)}
              >
                Delete
              </Button>
            </JobCard>
          ))}
        </>
        )}
      </KeyboardAwareScrollView>
      { !jobEditor && (
        <Button
          mode="contained"
          style={styles.addButton}
          contentStyle={styles.addButtonContent}
          onPress={() => {
            setTitle("");
            setCompany("");
            setLocation("");
            setStartDate("");
            setEndDate("");
            setDuties([]);
            setIndex(-1);
            handleJobEditor();
          }}
        >
          Add Job
        </Button>
      )}

      { deleteIndex !== -1 && (
        <DeleteModal
          visible={deleteIndex !== -1}
          hideModal={() => setDeleteIndex(-1)}
          deleteItem={() => {
            dispatch(removeJob({ index: deleteIndex }));
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
  initialCard: {
    marginVertical: 10,
  },
  card: {
    marginBottom: 10,
  },
  title: {
    marginTop: 10
  },
  paragraph: {
    fontSize: 16,
  },
  button: {
    marginTop: 10,
  },
  smallButton: {
    marginTop: 10,
    marginHorizontal: 5
  },
  text: {
    fontSize: 20,
    marginTop: 10,
  },
  input: {
    marginVertical: 10,
  },
  listRow: {
    flexDirection: 'row'
  },
  listDecoration: {
    width: 3,
    backgroundColor: theme.colors.outline,
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 10
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

export default ExperienceScreen;