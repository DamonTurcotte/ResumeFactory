import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";

export const ColorsTab = ({ template, colors, setTemplateOptions }) => {
  const colorIndex = useSelector((state) => state.profiles[state.currentProfile].options.templateOptions[template].colorIndex);
  const theme = useTheme();

  const setColorIndex = (index) => {
    setTemplateOptions({
      colorIndex: index,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      { colors.map((palette, index) => (
        <View
          key={index}
          style={{
            backgroundColor: palette.primary,
            width: 50,
            height: 50,
            margin: 5,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: colorIndex === index ? theme.colors.onNavbarVariant : theme.colors.outline,
          }}
          onTouchEnd={() => setColorIndex(index)}
        />
      ))}
    </View>
  );
};