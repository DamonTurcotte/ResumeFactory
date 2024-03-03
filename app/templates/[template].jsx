import { useLocalSearchParams, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { SafeAreaView, View, ScrollView } from "react-native";
import { TemplateView } from "../../templates/templateView";
import { templateFonts } from "../../templates/fontHooks";
import { useState } from "react";
import { useTheme, Text, RadioButton } from "react-native-paper";
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

  const toggleSize = () => {
    setSize(size === "letter" ? "A4" : "letter");
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
      <View
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: theme.colors.surface,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      >
        <View
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: theme.colors.primary,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: theme.colors.onPrimary,
              fontSize: 20,
              textAlign: "center",
              fontFamily: "Genos-SemiBold",
            }}
          >
            Page Layout
          </Text>
        </View>
      <ScrollView
        style={{
          width: "100%",
        }}
      >
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            width: "100%",
          }}
        >
          <Text>Paper Size</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: size === "letter" ? theme.colors.surfaceVariant : theme.colors.surface,
            }}
          >
            <Text>Letter</Text>
            <RadioButton
              value="letter"
              status={size === "letter" ? "checked" : "unchecked"}
              onPress={toggleSize}
              color={theme.colors.primary}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>A4</Text>
            <RadioButton
              value="A4"
              status={size === "A4" ? "checked" : "unchecked"}
              onPress={toggleSize}
              color={theme.colors.primary}
            />
          </View>
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
});