import { useLocalSearchParams, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native";
import { TemplateView } from "../../templates/templateView";
import { templateFonts } from "../../templates/getFont";
import { useState } from "react";
import { useTheme } from "react-native-paper";

export default TemplateDetailScreen = () => {
  const [size, setSize] = useState("letter");

  const { template } = useLocalSearchParams();
  const profile = useSelector((state) => state.profiles[state.currentProfile]);
  const theme = useTheme();
  const styles = getStyles(theme);

  const fonts = templateFonts[template];

  return (
    <SafeAreaView
      style={styles.safe}
    >
      <Stack.Screen
        options={{title: "Template"}}
        headerLeft={() => <HeaderBackButton path="templates" theme={theme} />}
      />
      <TemplateView
        fonts={fonts}
        size={size}
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      />
    </SafeAreaView>
  );
};

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});