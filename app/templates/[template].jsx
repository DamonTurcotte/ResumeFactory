import { useLocalSearchParams, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { SafeAreaView, View, ScrollView } from "react-native";
import { TemplateView } from "../../templates/templateView";
import { templateFonts } from "../../templates/fontHooks";
import { useState } from "react";
import { useTheme, Text } from "react-native-paper";
import { Slider } from '@react-native-assets/slider';

export default TemplateDetailScreen = () => {
  const { template } = useLocalSearchParams();

  const [size, setSize] = useState("letter");
  const [fontSize, setFontSize] = useState(14);
  const [margin, setMargin] = useState(1.00);

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
      <View
        style={{
          flex: 2,
          width: "100%",
          padding: 10,
        }}
      >
        <TemplateView
          variant={template}
          profile={profile}
          fonts={fonts}
          size={size}
          fontSize={fontSize}
          margin={margin}
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            backgroundColor: theme.colors.background,
          }}
        />
      </View>
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          padding: 10,
        }}
      >
        <Text>Font Size</Text>
        <Slider
          value={fontSize}
          onValueChange={setFontSize}
          minimumValue={12}
          maximumValue={16}
          step={0.5}
          style={{
            width: "100%",
            height: 40,
          }}
          CustomThumb={({ value }) => (
            <View style={{ backgroundColor: theme.colors.primary, width: 40, height: 20, borderRadius: 10 }}>
              <Text style={{ color: theme.colors.background, textAlign: "center", lineHeight: 20 }}>{value}</Text>
            </View>
          )}
        />
        <Text>Margin</Text>
        <Slider
          value={margin}
          onValueChange={setMargin}
          minimumValue={0.75}
          maximumValue={1.5}
          step={0.125}
          style={{
            width: "100%",
            height: 40,
          }}
          CustomThumb={({ value }) => (
            <View style={{ backgroundColor: theme.colors.primary, width: 40, height: 20, borderRadius: 10 }}>
              <Text style={{ color: theme.colors.background, textAlign: "center", lineHeight: 20 }}>{value}</Text>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});