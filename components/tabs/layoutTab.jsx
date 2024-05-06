import React from "react";
import { Slider } from '@react-native-assets/slider';
import { View } from "react-native";
import { Text, RadioButton, Divider, useTheme } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";


export const LayoutTab = ({ template, setSizeLetter, setSizeA4, setTemplateOptions }) => {
  const options = useSelector((state) => state.profiles[state.currentProfile].options);

  const { margin, fontSize } = options.templateOptions[template];

  const theme = useTheme();
  const styles = getStyles(theme);

  const radioCards = [
    {
      key: "letter",
      label: "Letter",
      description: "( US / Canada )",
      onPress: setSizeLetter,
    },
    {
      key: "A4",
      label: "A4",
      description: "( International )",
      onPress: setSizeA4,
    },
  ]

  const sliderThumb = ({ value }) => (
    <View style={styles.sliderThumb}>
      <Text style={styles.sliderThumbText}>{value}</Text>
    </View>
  );

  const setMargin = (value) => {
    setTemplateOptions({
      margin: value,
    });
  };

  const setFontSize = (value) => {
    setTemplateOptions({
      fontSize: value,
    });
  };

  return (
    <View>
      <Text style={styles.optionLabel}>
        Paper Size
      </Text>
      <View style={styles.radioCardContainer}>
        {radioCards.map((card) => (
          <View
            key={card.key}
            style={[styles.radioCard, {
              backgroundColor: options.size === card.key ? theme.colors.surfaceVariant : theme.colors.surface,
            }]}
          >
            <Text>{card.label}</Text>
            <Text>{card.description}</Text>
            <RadioButton
              value={card.key}
              status={options.size === card.key ? "checked" : "unchecked"}
              onPress={card.onPress}
              color={theme.colors.primary}
            />
          </View>
        ))}
      </View>

      <Divider
        style={styles.divider}
      />

      <Text style={styles.optionLabel}>
        Font Size
      </Text>
      <Slider
        value={fontSize}
        onValueChange={setFontSize}
        minimumValue={12}
        maximumValue={16}
        step={0.5}
        style={styles.slider}
        CustomThumb={sliderThumb}
      />

      <Divider
        style={styles.divider}
      />

      <Text style={styles.optionLabel}>
        Margin
      </Text>
      <Slider
        value={margin}
        onValueChange={setMargin}
        minimumValue={0.75}
        maximumValue={1.5}
        step={0.125}
        style={styles.slider}
        CustomThumb={sliderThumb}
      />
    </View>
  );
}

const getStyles = (theme) => ({
  optionLabel: {
    marginBottom: 5,
  },
  radioCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  radioCard: {
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  divider: {
    marginTop: 10,
    marginBottom: 15,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderThumb: {
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 20,
    borderRadius: 10
  },
  sliderThumbText: {
    color: theme.colors.background,
    textAlign: "center",
    lineHeight: 20
  },
});