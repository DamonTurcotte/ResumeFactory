import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Button, useTheme } from 'react-native-paper';

import { HeaderBackButton } from '../../components/headerBackButton';
import { DeleteModal } from '../../components/deleteModal';
import { ProjectCard } from '../../components/cards/projectCard';
import { addProject, removeProject, setProject } from '../../redux/extraReducers/projectSlice';

import { TextBox, TextArea } from '../../components/inputs';


const ProjectScreen = () => {
  const [projectEditor, setProjectEditor] = useState(false);
  const [index, setIndex] = useState(-1);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");
  const [achievements, setAchievements] = useState([""]);
  const [links, setLinks] = useState([]);

  const [deleteIndex, setDeleteIndex] = useState(-1);

  const projects = useSelector(state => state.profiles[state.currentProfile].projects.data);

  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleProjectEditor = () => setProjectEditor(!projectEditor);

  const saveProjectData = () => {
    let data = {
      Title: title,
      Category: category,
      Start: start,
      End: end,
      Description: description,
      Achievements: achievements,
      Links: links,
    };
    if (index === -1) {
      dispatch(addProject({ data: data }));
    } else {
      dispatch(setProject({ index: index, data: data }));
    }
    setTitle("");
    setCategory("");
    setStart("");
    setEnd("");
    setDescription("");
    setAchievements([""]);
    setLinks([]);
    handleProjectEditor();
  };

  const handleEdit = (index) => {
    setTitle(projects[index].Title);
    setCategory(projects[index].Category);
    setStart(projects[index].Start);
    setEnd(projects[index].End);
    setDescription(projects[index].Description);
    setAchievements(projects[index].Achievements);
    setLinks(projects[index].Links);
    setIndex(index);
    handleProjectEditor();
  }

  const handleDelete = () => {
    dispatch(removeProject({ index: deleteIndex }));
    setDeleteIndex(-1);
  }
  
  return (
    <SafeAreaView style={getStyles(theme).safe}>
      <Stack.Screen 
        options={{title: "Projects"}}
        headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
      />
      <KeyboardAwareScrollView style={styles.container}>
        { projectEditor ? (
          <View>
            <Text
              style={styles.title}
            >
              Project Editor
            </Text>
            <TextBox
              label="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextBox
              label="Category"
              value={category}
              onChangeText={setCategory}
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
            <TextArea
              label="Description"
              value={description}
              onChangeText={setDescription}
            />
            <Text
              style={styles.subtitle}
            >
              Achievements
            </Text>
            <View
              style={styles.listContainer}
            >
              <View style={{flex: 1}}>
              { achievements.map((achievement, index) => (
                <TextBox
                  key={index}
                  label="Achievement"
                  value={achievement}
                  style={{marginTop: 3}}
                  onChangeText={text => {
                    let temp = [...achievements];
                    temp[index] = text;
                    setAchievements(temp);
                  }}
                  close={() => {
                    let temp = [...achievements];
                    temp.splice(index, 1);
                    setAchievements(temp);
                  }}
                />
              ))}
              <Button
                mode="outlined"
                style={styles.addButton}
                onPress={() => setAchievements([...achievements, ""])}
              >Add Achievement</Button>
            </View>
            </View>
            <Text
              style={styles.subtitle}
            >
              Links
            </Text>
            <View style={styles.listContainer}>
              <View>
                { links.map((l, index) => (
                <>
                  <TextBox
                    label="URL"
                    value={l.URL}
                    style={{marginTop: 3}}
                    close={() => {
                      let temp = [...links];
                      temp.splice(index, 1);
                      setLinks(temp);
                    }}
                    onChangeText={text => {
                      let temp = [...links];
                      temp[index].URL = text;
                      setLinks(temp);
                    }}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{marginLeft: 15, height: "60%", width: 20, borderBottomWidth: 1, borderLeftWidth: 1, borderBottomLeftRadius: 3, borderColor: theme.colors.outline}}
                    ></View>
                    <TextBox
                      label="Display Text"
                      value={l.Title}
                      style={{marginTop: 3, flex: 1}}
                      onChangeText={text => {
                        let temp = [...links];
                        temp[index].Title = text;
                        setLinks(temp);
                      }}
                    />
                  </View>
                </>
                ))}
              </View>
              <Button
                mode="outlined"
                onPress={() => setLinks([...links, ""])}
                style={styles.addButton}
              >Add Link</Button>
            </View>
            <Button mode="contained" onPress={saveProjectData} style={styles.addButton}>Save</Button>
          </View>
        ) : (
          <>
          { projects.map((project, index) => (
            <ProjectCard 
              key={index}
              project={project}
              index={index}
              handleEdit={handleEdit}
              setDelete={() => setDeleteIndex(index)}
              style={{marginTop: 15}}
            />
          ))}
          <Button
            mode="contained"
            onPress={handleProjectEditor}
            style={{ marginTop: 15 }}
          >
            Add Project
          </Button>
          { deleteIndex !== -1 && (
            <DeleteModal 
              visible={deleteIndex !== -1}
              hideModal={() => setDeleteIndex(-1)}
              deleteItem={handleDelete}
            />
          )}
          </>
        )}
      </KeyboardAwareScrollView>
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
    fontSize: 24,
    fontFamily: "Genos-Medium",
    marginTop: 10,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Genos-Medium",
    marginVertical: 5,
  },
  listContainer: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  addButton: {
    margin: 10
  },
});

export default ProjectScreen;