import { Stack } from "expo-router";
import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text, useTheme, Divider } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { addHighlight, removeHighlight, setHighlight } from "../../redux/extraReducers/highlightSlice";
import { HeaderBackButton, TextBox, DeleteModal } from "../../components";

const HighlightScreen = () => {
  const highlights = useSelector((state) => state.profiles[state.currentProfile].highlights.data);
  const [highlightInput, setHighlightInput] = useState("");
  const [index, setIndex] = useState(-1);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleHighlight = () => {
    if (highlightInput !== "") {
      if (index === -1) {
        dispatch(addHighlight({ data: highlightInput }));
      } else {
        dispatch(setHighlight({ index: index, data: highlightInput }));
      }
      setHighlightInput("");
      setIndex(-1);
    }
  };

  const handleDelete = () => {
    dispatch(removeHighlight({ index: deleteIndex }));
    setDeleteIndex(-1);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen
        options={{ title: "Highlights" }}
        headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
      />
      <KeyboardAwareScrollView style={styles.container}>
        <TextBox
          style={styles.textBox}
          label="Highlight"
          value={highlightInput}
          onChangeText={setHighlightInput}
          placeholder="Enter highlight or qualification."
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleHighlight}
          compact={true}
        >
          { index === -1 ? 'Save' : 'Update' }
        </Button>
        { index !== -1 && (
          <Button
            mode="contained"
            theme={{ colors: { primary: theme.colors.error } }}
            style={styles.button}
            onPress={() => {
              setHighlightInput("");
              setIndex(-1);
            }}
            compact={true}
          >
            Cancel
          </Button>
        )}
        <Divider style={styles.divider} />
        {highlights.map((highlight, i) => (
          <View style={styles.highlight} key={i}>
            <Text style={styles.highlightText}>{highlight}</Text>
            <Button
              onPress={() => {
                setHighlightInput(highlight);
                setIndex(i);
              }}
            >
              Edit
            </Button>
            <Button onPress={() => setDeleteIndex(i)}>Delete</Button>
          </View>
        ))}
      </KeyboardAwareScrollView>
      <DeleteModal
        visible={deleteIndex !== -1}
        hideModal={() => setDeleteIndex(-1)}
        deleteItem={handleDelete}
      />
    </SafeAreaView>
  );
};

export default HighlightScreen;

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
  divider: {
    marginVertical: 10,
  },
  highlight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  highlightText: {
    flex: 1,
  },
  button: {
    marginTop: 10
  },
  textBox: {
    marginTop: 10,
  },
});