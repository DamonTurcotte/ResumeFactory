import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Button, useTheme, Divider } from 'react-native-paper';

import { TextBox, TextArea, HeaderBackButton, DeleteModal, ProjectCard } from '../../components';
import { addProject, removeProject, setProject } from '../../redux/extraReducers/projectSlice';

const ProjectScreen = () => {
  const [projectEditor, setProjectEditor] = useState(false);
  const [index, setIndex] = useState(-1);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");
  const [achievements, setAchievements] = useState([]);
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
              variant='headlineMedium'
              style={styles.title}
            >
              { index === -1 ? "Add" : "Edit" } Project
            </Text>
            <Divider
              style={styles.divider}
            />
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
            <Text variant='titleLarge'>
              Achievements
            </Text>
            <View
              style={styles.listContainer}
            >
              <View
                style={[
                  styles.listRow,
                  achievements.length === 0 ? {marginBottom: 0} : {marginBottom: 8}]}
              >
                <View
                  style={styles.listDecoration}
                ></View>
                <View style={{flex: 1}}>
                  { achievements.map((achievement, index) => (
                    <TextBox
                      key={index}
                      label="Achievement"
                      value={achievement}
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
                </View>
              </View>
              <Button
                mode="outlined"
                onPress={() => setAchievements([...achievements, ""])}
              >Add Achievement</Button>
            </View>
            <Text variant='titleLarge'>
              Links
            </Text>
            <View style={styles.listContainer}>
              <View
                style={[styles.listRow, links.length === 0 ? {marginBottom: 0} : {marginBottom: 8}]}
              >
                <View
                  style={styles.listDecoration}
                ></View>
                <View
                  style={{flex: 1}}
                >
                  { links.map((l, index) => (
                  <View
                    key={index}
                  >
                    <TextBox
                      label="URL"
                      value={l.URL}
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
                        style={styles.linkLine}
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
                  </View>
                  ))}
                </View>
              </View>
              <Button
                mode="outlined"
                onPress={() => setLinks([...links, {URL: "", Title: ""}])}
              >Add Link</Button>
            </View>
            <Button
              disabled={title === ""}
              mode="contained"
              onPress={saveProjectData}
              style={styles.button}
            >Save</Button>
            <Button
              mode="contained"
              onPress={handleProjectEditor}
              style={styles.button}
              textColor={theme.colors.onError}
              buttonColor={theme.colors.error}
            >Cancel</Button>
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
              buttonColor={theme.colors.onBackgroundVariant}
              style={{marginTop: 15}}
            />
          ))}
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
      { !projectEditor &&
        <Button
          mode="contained"
          onPress={handleProjectEditor}
          style={styles.addButton}
          contentStyle={styles.addButtonContent}
        >
          Add Project
        </Button>
      }
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
    marginBottom: 5,
    backgroundColor: theme.colors.outline,
  },
  listContainer: {
    borderRadius: 8,
  },
  listRow: {
    flexDirection: 'row',
    marginBottom: 0
  },
  listDecoration: {
    width: 3,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 10
  },
  linkLine: {
    marginLeft: 15,
    height: "60%",
    width: 20,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderBottomLeftRadius: 3,
    borderColor: theme.colors.outline
  },
  addButton: {
    borderRadius: 0,
  },
  addButtonContent: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: 10,
  },
});

export default ProjectScreen;