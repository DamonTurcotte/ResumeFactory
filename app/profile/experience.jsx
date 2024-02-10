import { addJob, removeJob, setJob } from '../../redux/extraReducers/experienceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, TextInput, Text } from 'react-native-paper';
import { Stack } from 'expo-router';
import { JobCard } from '../../components/jobCard';
import { SafeAreaView } from 'react-native';
import { HeaderBackButton } from '../../components/headerBackButton';
import { View } from 'react-native';
import { DeleteModal } from '../../components/deleteModal';

export default ExperienceScreen = () => {
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
          <Text variant='headlineMedium'>
            Job Details
          </Text>
          <TextInput
            label="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            mode='outlined'
          />
          <TextInput
            label="Company"
            value={company}
            onChangeText={(text) => setCompany(text)}
            mode='outlined'
          />
          <TextInput
            label="Location"
            value={location}
            onChangeText={(text) => setLocation(text)}
            mode='outlined'
          />
          <TextInput
            label="Start Date"
            value={startDate}
            onChangeText={(text) => setStartDate(text)}
            mode='outlined'
          />
          <TextInput
            label="End Date"
            value={endDate}
            onChangeText={(text) => setEndDate(text)}
            mode='outlined'
          />

          <Text
            style={styles.text}
          >Duties</Text>

          <View style={{flexDirection: 'row'}}>
              <View style={styles.listDecoration}>

              </View>
              <View style={{flex: 1}}>
                { duties.map((duty, i) => (
                  <TextInput
                    key={i}
                    label={`Duty ${i + 1}`}
                    value={duty}
                    right={<TextInput.Icon icon="close" style={{margin: 0, padding: 0}} size={20} onPress={() => {
                      let temp = [...duties];
                      temp.splice(i, 1);
                      setDuties(temp);
                    }} />}
                    onChangeText={(text) => {
                      let temp = [...duties];
                      temp[i] = text;
                      setDuties(temp);
                    }}
                    mode='outlined'
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
          >
            Save
          </Button>
        </>
        ) : (
        <>
          { experience.map((job, i) => (
            <JobCard
              key={i}
              job={job}
              style={styles.card}
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
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              setIndex(-1);
              handleJobEditor();
            }}
          >
            Add Job
          </Button>
        </>
        )}
      </KeyboardAwareScrollView>

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
  card: {
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
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
  listDecoration: {
    width: 3,
    backgroundColor: theme.colors.outline,
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 10
  },
});