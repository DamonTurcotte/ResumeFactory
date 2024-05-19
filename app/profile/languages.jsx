import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, SafeAreaView, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Button, useTheme, Icon, Divider, DataTable } from 'react-native-paper';

import { HeaderBackButton, DeleteModal, TitledModal, TextBox, EmptyCard } from '../../components';
import { addLanguage, removeLanguage, setLanguage } from '../../redux/extraReducers/languageSlice';

const LanguageScreen = () => {
  const [languageEditor, setLanguageEditor] = useState(false);
  const [index, setIndex] = useState(-1);
  
  const [proficiencyMenuVisible, setProficiencyMenuVisible] = useState(false);

  const [languageName, setLanguageName] = useState("");
  const [proficiency, setProficiency] = useState("");

  const [deleteIndex, setDeleteIndex] = useState(-1);

  const languages = useSelector(state => state.profiles[state.currentProfile].languages.data);

  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleLanguageEditor = () => setLanguageEditor(!languageEditor);

  const saveLanguageData = () => {
    let data = {
      Name: languageName,
      Proficiency: proficiency,
    };
    if (index === -1) {
      dispatch(addLanguage({ data: data }));
    } else {
      dispatch(setLanguage({ index: index, data: data }));
    }
    setLanguageName("");
    setProficiency("");
    handleLanguageEditor();
  }

  const showProficiencyMenu = () => setProficiencyMenuVisible(true);
  const hideProficiencyMenu = () => setProficiencyMenuVisible(false);
  
  return (
    <SafeAreaView style={getStyles(theme).safe}>
      <Stack.Screen 
        options={{title: "Languages"}}
        headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
      />
      <KeyboardAwareScrollView style={styles.container}>
        { proficiencyMenuVisible && (
          <TitledModal
            visible={proficiencyMenuVisible}
            onDismiss={hideProficiencyMenu}
            title={"Set Proficiency"}
            contentContainerStyle={{padding: 20}}
          >
            <Button
              mode="outlined"
              onPress={() => { setProficiency("Elementary"); hideProficiencyMenu(); }}
              style={styles.button}
            >
              Elementary
            </Button>
            <Button
              mode="outlined"
              onPress={() => { setProficiency("Limited Working"); hideProficiencyMenu(); }}
              style={styles.button}
            >
              Limited Working
            </Button>
            <Button
              mode="outlined"
              onPress={() => { setProficiency("Professional Working"); hideProficiencyMenu(); }}
              style={styles.button}
            >
              Professional Working
            </Button>
            <Button
              mode="outlined"
              onPress={() => { setProficiency("Full Professional"); hideProficiencyMenu(); }}
              style={styles.button}
            >
              Full Professional
            </Button>
            <Button
              mode="outlined"
              onPress={() => { setProficiency("Primary/Bilingual"); hideProficiencyMenu(); }}
              style={styles.button}
            >
              Primary/Bilingual
            </Button>
          </TitledModal>
        )}

        { languageEditor ? (
          <View style={{padding: 10}}>
            <Text
              variant='headlineMedium'
            >
              { index === -1 ? "Add" : "Edit" } Language
            </Text>
            <Divider style={styles.divider} />

            <TextBox
              label="Language"
              value={languageName}
              onChangeText={text => setLanguageName(text)}
              style={styles.input}
            />

            <Button
              mode="outlined"
              onPress={showProficiencyMenu}
              style={styles.button}
            >
              { proficiency === "" ? "Select Proficiency" : proficiency }
            </Button>

            <Button
              mode="contained-tonal"
              onPress={saveLanguageData}
              style={styles.button}
              disabled={languageName === "" || proficiency === ""}
            >
              Save
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => {
                setLanguageName("");
                setProficiency("");
                setIndex(-1);
                handleLanguageEditor();
              }}
            >
              Cancel
            </Button>
          </View>
        ) : (
          <>
          { languages.length > 0 && (
            <DataTable>
              <DataTable.Header
                style={styles.tableHeader}
              >
                <DataTable.Title textStyle={styles.tableTitle}>
                  Language
                </DataTable.Title>
                <DataTable.Title textStyle={styles.tableTitle}>
                  Proficiency
                </DataTable.Title>
                <View style={{width: 80, height: "100%"}}></View>
              </DataTable.Header>

              { languages.map((item, i) => (
                <DataTable.Row key={i} style={styles.tableRow}>
                  <DataTable.Cell>{item.Name}</DataTable.Cell>
                  <DataTable.Cell>{item.Proficiency}</DataTable.Cell>
                  <Pressable
                    style={styles.tableButton}
                    onPress={() => {
                      setLanguageName(item.Name);
                      setProficiency(item.Proficiency);
                      setIndex(i);
                      handleLanguageEditor();
                    }}
                  >
                    <Icon source="pencil" size={16} color={theme.colors.onNavbarVariant} />
                  </Pressable>
                  <Pressable
                    style={styles.tableButton}
                    onPress={() => setDeleteIndex(i)}
                  >
                    <Icon source="close" size={16} color={theme.colors.onNavbarVariant} />
                  </Pressable>
                </DataTable.Row>
              ))}
            </DataTable>
          )}
          { languages.length === 0 && (
            <EmptyCard
              text={[
                'No languages added yet.',
                'Add languages you speak or have some level of technical proficiency in.'
              ]}
              style={styles.emptyCard}
            />
          )}

          <DeleteModal
            visible={deleteIndex !== -1}
            hideModal={() => setDeleteIndex(-1)}
            content="Are you sure?"
            deleteItem={() => {
              dispatch(removeLanguage({ index: deleteIndex }));
              setDeleteIndex(-1);
            }}
          />
          </>
        )}
      </KeyboardAwareScrollView>
      { !languageEditor && (
        <Button
          mode="contained-tonal"
          onPress={() => {
            setLanguageEditor(true);
            setLanguageName("");
            setProficiency("");
            setIndex(-1);
          }}
          style={styles.addButton}
          contentStyle={styles.addButtonContent}
        >
          Add Language
        </Button>
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
    backgroundColor: theme.colors.background,
  },
  tableHeader: {
    paddingRight: 0,
    backgroundColor: theme.colors.navbar,
    borderColor: theme.colors.primary,
    borderBottomWidth: 0.25,
  },
  tableTitle: {
    color: theme.colors.onNavbar,
    fontSize: 11,
  },
  tableRow: {
    paddingRight: 0,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface
  },
  tableButton: {
    width: 40,
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    marginBottom: 5,
    backgroundColor: theme.colors.outline,
  },
  input: {
    marginBottom: 10,
  },
  button: {
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
  emptyCard: {
    margin: 15,
  },
});

export default LanguageScreen;