import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Button, useTheme, Divider } from 'react-native-paper';

import { HeaderBackButton, DeleteModal, TextBox, TextArea, PublicationCard, EmptyCard } from '../../components';
import { addPublication, removePublication, setPublication } from '../../redux/extraReducers/publicationSlice';

const PublicationScreen = () => {
  const [index, setIndex] = useState(-1);
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [date, setDate] = useState("");
  const [url, setURL] = useState("");
  const [description, setDescription] = useState("");

  const [publicationEditor, setPublicationEditor] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const publications = useSelector(state => state.profiles[state.currentProfile].publications.data);

  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = getStyles(theme);

  const savePublicationData = () => {
    let data = {
      Title: title,
      Publisher: publisher,
      Date: date,
      URL: url,
      Description: description,
    };
    if (index === -1) {
      dispatch(addPublication({ data: data }));
    } else {
      dispatch(setPublication({ index: index, data: data }));
    }
    setTitle("");
    setPublisher("");
    setDate("");
    setURL("");
    setDescription("");
    setPublicationEditor(false);
  };
  
  return (
    <SafeAreaView style={getStyles(theme).safe}>
      <Stack.Screen 
        options={{title: "Publications"}}
        headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
      />
      <KeyboardAwareScrollView style={styles.container}>
        { publicationEditor ? (
          <View>
            <Text
              variant='headlineMedium'
              style={styles.title}
            >
              {index === -1 ? "Add" : "Edit"} Publication
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
              label="Publisher"
              value={publisher}
              onChangeText={setPublisher}
            />
            <TextBox
              label="Date"
              value={date}
              onChangeText={setDate}
            />
            <TextBox
              label="URL"
              value={url}
              onChangeText={setURL}
            />
            <TextArea
              label="Description"
              value={description}
              onChangeText={setDescription}
            />
            <Button
              mode="contained-tonal"
              onPress={savePublicationData}
              disabled={title === "" || publisher === "" || date === ""}
              style={styles.button}
            >
              Save
            </Button>
            <Button
              mode="outlined"
              onPress={() => setPublicationEditor(false)}
              style={styles.button}
            >
              Cancel
            </Button>
          </View>
        ) : (
          <View
            style={styles.subcontainer}
          >
            { publications.length === 0 && (
              <EmptyCard
                text={[
                  'No publications added yet.',
                  'Add articles or papers you\'ve published or contributed to.'
                ]}
              />
            )}
            {publications.map((data, i) => (
              <PublicationCard
                key={i}
                data={data}
                style={styles.card}
              >
                <Button
                  mode='text'
                  textColor={theme.colors.onBackgroundVariant}
                  onPress={() => {
                    setIndex(i);
                    setTitle(data.Title);
                    setPublisher(data.Publisher);
                    setDate(data.Date);
                    setURL(data.URL);
                    setDescription(data.Description);
                    setPublicationEditor(true);
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
              </PublicationCard>
            ))}
          </View>
        )}
      </KeyboardAwareScrollView>
        { !publicationEditor &&
          <Button
            mode="contained-tonal"
            onPress={() => setPublicationEditor(true)}
            style={styles.addButton}
            contentStyle={styles.addButtonContent}
          >
            Add Publication
          </Button>
        }

      { deleteIndex !== -1 && (
        <DeleteModal
          visible={deleteIndex !== -1}
          hideModal={() => setDeleteIndex(-1)}
          deleteItem={() => {
            dispatch(removePublication({ index: deleteIndex }));
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
  subcontainer: {
    marginVertical: 10,
  },
  title: {
    marginTop: 10,
  },
  divider: {
    marginBottom: 5,
    backgroundColor: theme.colors.outline,
  },
  card: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
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

export default PublicationScreen;