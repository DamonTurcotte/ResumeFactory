import { useLocalSearchParams, Stack } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, View, ScrollView } from "react-native";
import { TemplateView } from "../../templates/templateView";
import { templateFonts } from "../../templates/fontHooks";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";

import { LayoutTab, SectionsTab, ColorsTab } from "../../components/tabs";
import { templateColors, templateReorders } from "../../templates/variants";

import { setSize, setOptions } from "../../redux/extraReducers/templateOptionSlice";

export default TemplateDetailScreen = () => {
  const { template } = useLocalSearchParams();
  const profile = useSelector((state) => state.profiles[state.currentProfile]);
  const theme = useTheme();
  const styles = getStyles(theme);
  const dispatch = useDispatch();

  const [tab, setTab] = useState("Layout");

  const fonts = templateFonts[template];

  const tabLabels = ["Layout", "Sections", "Colors"];

  const colors = templateColors[template];

  const setSizeLetter = () => {
    dispatch(setSize({
      size: "letter"
    }));
  };

  const setSizeA4 = () => {
    dispatch(setSize({
      size: "A4"
    }));
  };

  const setTemplateOptions = (newOptions) => {
    dispatch(setOptions({
      template: template,
      options: newOptions,
    }));
  };

  if (profile.options.templateOptions[template] === undefined) {
    const order = Object.entries(profile).filter(([key, value]) => value.active).map(([key, value]) => key);
    const reorder = templateReorders[template](order, profile);

    setTemplateOptions({
      colorIndex: 0,
      margin: 1.00,
      fontSize: 14,
      order: reorder ? reorder : order,
    });
  };

  return (
    <SafeAreaView
      style={styles.safe}
    >
      <Stack.Screen
        options={{title: "Template"}}
        headerLeft={() => <HeaderBackButton path="templates" theme={theme} />}
      />
      <View
        style={styles.templateContainer}
      >
        <TemplateView
          key={profile.options.size}
          variant={template}
          fonts={fonts}
          style={styles.templateView}
        />
      </View>
      <View
        style={styles.optionsContainer}
      >
        <View
          style={styles.optionsTabsContainer}
        >
          {tabLabels.map((label, index) => (
            <View
              key={index}
              style={[styles.optionsTab, {
                backgroundColor: tab === label ? theme.colors.surface : theme.colors.background,
              }]}
              onTouchEnd={() => setTab(label)}
            >
              <Text
                style={[styles.optionsTabText, {
                  color: tab === label ? theme.colors.onNavbarVariant : theme.colors.text
                }]}
              >{label}</Text>
            </View>
          ))}
        </View>

        <ScrollView
          style={styles.optionsScrollView}
        >
          <View
            style={styles.optionsBodyContainer}
          >
          {tab === "Layout" && (
            <LayoutTab
              template={template}
              setSizeLetter={setSizeLetter}
              setSizeA4={setSizeA4}
              setTemplateOptions={setTemplateOptions}
            />
          )}
          { tab === "Sections" && (
            <SectionsTab />
          )}
          { tab === "Colors" && (
            <ColorsTab
              template={template}
              colors={colors}
              setTemplateOptions={setTemplateOptions}
            />
          )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  templateContainer: {
    flex: 3,
    width: "100%",
    padding: 10,
  },
  templateView: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  optionsContainer: {
    width: "100%",
    flex: 2,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  optionsTabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    gap: 1,
  },
  optionsTab: {
    paddingVertical: 10,
    flexGrow: 1,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  optionsTabText: {
    color: theme.colors.text,
    textAlign: "center",
  },
  optionsScrollView: {
    marginTop: 1,
    width: "100%",
    flex: 1,
  },
  optionsBodyContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
  },
});