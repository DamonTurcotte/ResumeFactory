import { useLocalSearchParams, Stack } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, View, ScrollView } from "react-native";
import { TemplateView } from "../../templates/templateView";
import { templateFonts } from "../../templates/fontHooks";
import { useState } from "react";
import { useTheme, Text, RadioButton } from "react-native-paper";
import { Slider } from '@react-native-assets/slider';

import { setSize } from "../../redux/extraReducers/templateOptionSlice";

import * as Print from "expo-print";

export default TemplateDetailScreen = () => {
  const { template } = useLocalSearchParams();
  const profile = useSelector((state) => state.profiles[state.currentProfile]);
  const options = useSelector((state) => state.profiles[state.currentProfile].options);
  const theme = useTheme();
  const styles = getStyles(theme);
  const dispatch = useDispatch();

  const [html, setHtml] = useState("");
  const [pages, setPages] = useState(1);
  const [print, setPrint] = useState(false);

  const [fontSize, setFontSize] = useState(14);
  const [margin, setMargin] = useState(1.00);

  const fonts = templateFonts[template];

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
          key={options.size}
          variant={template}
          fonts={fonts}
          fontSize={fontSize}
          margin={margin}
          pages={pages}
          setPages={setPages}
          setHtml={setHtml}
          print={print}
          setPrint={setPrint}
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
              backgroundColor: options.size === "letter" ? theme.colors.surfaceVariant : theme.colors.surface,
            }}
          >
            <Text>Letter</Text>
            <RadioButton
              value="letter"
              status={options.size === "letter" ? "checked" : "unchecked"}
              onPress={setSizeLetter}
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
              status={options.size === "A4" ? "checked" : "unchecked"}
              onPress={setSizeA4}
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