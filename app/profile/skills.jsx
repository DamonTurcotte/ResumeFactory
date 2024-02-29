import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, SafeAreaView, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Button, useTheme, DataTable, Icon, Divider, Switch } from 'react-native-paper';

import { HeaderBackButton, DeleteModal, TitledModal, TextBox } from '../../components';
import { addSkill, removeSkill, setSkill, setUseProficiency } from '../../redux/extraReducers/skillSlice';

const SkillScreen = () => {
  const slice = useSelector(state => state.profiles[state.currentProfile].skills);

  const [skillEditor, setSkillEditor] = useState(false);
  const [index, setIndex] = useState(-1);

  const [skillInput, setSkillInput] = useState("");
  const [proficiency, setProficiency] = useState(1);

  const [deleteIndex, setDeleteIndex] = useState(-1);

  const [proficiencyMenuVisible, setProficiencyMenuVisible] = useState(false);

  const skills = slice.data;
  const useProficiency = slice.useProficiency;

  const toggleProficiency = () => {
    dispatch(setUseProficiency(!useProficiency));
  };

  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleSkillEditor = () => setSkillEditor(!skillEditor);

  const showProficiencyMenu = () => setProficiencyMenuVisible(true);
  const hideProficiencyMenu = () => setProficiencyMenuVisible(false);

  const saveSkillData = () => {
    let data = {
      Name: skillInput,
      Proficiency: proficiency,
    };
    if (index === -1) {
      dispatch(addSkill({ data: data }));
    } else {
      dispatch(setSkill({ index: index, data: data }));
    }
    setSkillInput("");
    setProficiency(1);
    setIndex(-1);
    handleSkillEditor();
  };
  
  return (
    <SafeAreaView style={getStyles(theme).safe}>
      <Stack.Screen 
        options={{title: "Skills"}}
        headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
      />
      <KeyboardAwareScrollView style={styles.container}>
        { proficiencyMenuVisible && (
          <TitledModal
            visible={proficiencyMenuVisible}
            onDismiss={hideProficiencyMenu}
            title={"Set Proficiency"}
          >
            { [1, 2, 3, 4, 5].map((item, i) => (
              <Button
                key={i}
                mode="contained"
                style={i === 0 ? null : styles.button}
                onPress={() => {
                  setProficiency(item);
                  hideProficiencyMenu();
                }}
              >{item}</Button>
            ))}
          </TitledModal>
        )}
        { skillEditor ? (
          <View style={styles.subcontainer}>
            <Text
              variant='headlineMedium'
            >
              {index === -1 ? "Add" : "Edit"} Skill
            </Text>
            <Divider style={styles.divider} />

            <TextBox
              label="Skill"
              value={skillInput}
              onChangeText={text => setSkillInput(text)}
              style={styles.input}
            />

            { useProficiency && (
              <Button mode="outlined" onPress={showProficiencyMenu}>
                Proficiency: {proficiency}
              </Button>
            )}
              
            <Button
              mode="contained"
              onPress={saveSkillData}
              style={styles.button}
              disabled={skillInput === ""}
            >Save</Button>
            <Button
              mode='contained'
              textColor={theme.colors.onError}
              buttonColor={theme.colors.error}
              style={styles.button}
              onPress={() => {
                setSkillInput("");
                setProficiency(1);
                setIndex(-1);
                handleSkillEditor();
              }}
            >Cancel</Button>
          </View>
        ) : (
          <>
            <DataTable>
              <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title textStyle={styles.tableTitle}>Name</DataTable.Title>
                { useProficiency && <DataTable.Title textStyle={styles.tableTitle}>Proficiency</DataTable.Title> }
                <View style={styles.tableHeaderSpacer}></View>
              </DataTable.Header>
              <View style={styles.proficienyToggle}>
                <Text>Include proficiency?</Text>
                <Switch value={useProficiency} onValueChange={toggleProficiency} />
              </View>

              { skills.length > 0 && skills.map((item, i) => (
                <DataTable.Row key={i} style={styles.tableRow}>
                  <DataTable.Cell>{item.Name}</DataTable.Cell>
                  { useProficiency && <DataTable.Cell>{item.Proficiency}</DataTable.Cell> }
                  <Pressable
                    style={styles.tableButton}
                    onPress={() => {
                      setSkillEditor(true);
                      setSkillInput(item.Name);
                      setProficiency(item.Proficiency);
                      setIndex(i);
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
          </>
        )}

        <DeleteModal
          visible={deleteIndex !== -1}
          hideModal={() => setDeleteIndex(-1)}
          deleteItem={() => {
            dispatch(removeSkill({ index: deleteIndex }));
            setDeleteIndex(-1);
          }}
        />
      </KeyboardAwareScrollView>
      { !skillEditor && (
          <Button
            mode="contained"
            onPress={handleSkillEditor}
            style={styles.addButton}
            contentStyle={styles.addButtonContent}
        >Add Skill</Button>
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
  subcontainer: {
    padding: 10,
  },
  divider: {
    marginBottom: 10,
    backgroundColor: theme.colors.outline,
  },
  tableHeader: {
    paddingRight: 0,
    backgroundColor: theme.colors.navbar,
    borderColor: theme.colors.primary,
    borderBottomWidth: 0.25,
  },
  tableHeaderSpacer: {
    width: 80,
    height: "100%"
},
  tableTitle: {
    color: theme.colors.onNavbar,
    fontFamily: 'Genos-Medium',
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
  input: {
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
  proficienyToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.primary,
    borderBottomWidth: 0.25,
  },
});

export default SkillScreen;