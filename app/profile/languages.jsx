import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, SafeAreaView, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, TextInput, Button, Menu, useTheme, Icon } from 'react-native-paper';

import { HeaderBackButton } from '../../components/headerBackButton';
import { DeleteModal } from '../../components/deleteModal';
import { addLanguage, removeLanguage, setLanguage } from '../../redux/extraReducers/languageSlice';


const LanguageScreen = () => {
  const [languageEditor, setLanguageEditor] = useState(false);
  const [index, setIndex] = useState(-1);
  
  const [proficiencyMenuVisible, setProficiencyMenuVisible] = useState(false);

  const [language, setLanguage] = useState("");
  const [proficiency, setProficiency] = useState("");

  const [deleteIndex, setDeleteIndex] = useState(-1);

  const languages = useSelector(state => state.profiles[state.currentProfile].languages.data);

  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleLanguageEditor = () => setLanguageEditor(!languageEditor);

  const saveLanguageData = () => {
    let data = {
      Name: language,
      Proficiency: proficiency,
    };
    if (index === -1) {
      dispatch(addLanguage({ data: data }));
    } else {
      dispatch(setLanguage({ index: index, data: data }));
    }
    setLanguage("");
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
        {languages.map((item, i) => (
          <View style={{flexDirection: "row", marginVertical: 5}} key={i}>
            <View
              style={{
                flex: 1,
                backgroundColor: theme.colors.surface,
                padding: 15,
                flexDirection: "row",
                borderRadius: 5,
                borderColor: theme.colors.primary,
                borderWidth: 1,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{textAlignVertical: "center"}}
              >{item.Name}</Text>
              <Text
                style={{textAlignVertical: "center"}}
              >{item.Proficiency}</Text>
            </View>
            <Pressable
              style={{paddingHorizontal: 10, paddingVertical: 15, justifyContent: "center"}}
              onPress={() => setDeleteIndex(i)}
            >
              <Icon source="close" size={16} />
            </Pressable>
          </View>
        ))}
        { languageEditor && (
          <View
            style={{
              flex: 1,
            }}
          >
            <View>
            <TextInput
              mode='outlined'
              label="Language"
              value={language}
              onChangeText={text => setLanguage(text)}
              style={{width: "100%"}}
            />
            <Menu
              visible={proficiencyMenuVisible}
              onDismiss={hideProficiencyMenu}
              contentStyle={{backgroundColor: theme.colors.surface}}
              style={{width: "90%", marginTop: 10, justifyContent: "center"}}
              anchor={
                <Button
                  onPress={showProficiencyMenu}
                  style={{width: "100%", marginTop: 10, justifyContent: "center"}}
                >
                  {proficiency === "" ? "Select Fluency" : proficiency}
                </Button>
              }
            >
              <Menu.Item
                onPress={() => {
                  setProficiency("Basic");
                  hideProficiencyMenu();
                }}
                title="Basic"
              />
              <Menu.Item
                onPress={() => {
                  setProficiency("Conversational");
                  hideProficiencyMenu();
                }}
                title="Conversational"
              />
              <Menu.Item
                onPress={() => {
                  setProficiency("Fluent");
                  hideProficiencyMenu();
                }}
                title="Fluent"
              />
              <Menu.Item
                onPress={() => {
                  setProficiency("Native");
                  hideProficiencyMenu();
                }}
                title="Native"
              />
            </Menu>
            </View>
            <Button
              mode="contained"
              onPress={saveLanguageData}
              style={{marginTop: 10}}
              disabled={language === "" || proficiency === ""}
            >
              Save
            </Button>
            <Button
              mode="outlined"
              onPress={handleLanguageEditor}
              style={{marginTop: 10}}
            >
              Cancel
            </Button>
          </View>
        )}

        { !languageEditor &&
          <Button
            mode="outlined"
            onPress={() => {
              setIndex(-1);
              handleLanguageEditor();
            }}
            style={{marginTop: 10}}
          >
            Add Language
          </Button>
        }
        <DeleteModal
          visible={deleteIndex !== -1}
          hideModal={() => setDeleteIndex(-1)}
          deleteItem={() => {
            dispatch(removeLanguage({ index: deleteIndex }));
            setDeleteIndex(-1);
          }}
        />
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
    padding: 20,
    backgroundColor: theme.colors.background,
  },
});

export default LanguageScreen;