import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { PressableDragAndDrop } from "../buttons/draggable";
import { useRef } from "react";

export const SectionsTab = ({ template, setTemplateOptions }) => {
  const options = useSelector((state) => state.profiles[state.currentProfile].options.templateOptions[template]);
  const theme = useTheme();
  const styles = getStyles(theme);

  const draggableAreaRef = useRef(null);

  return (
    <View
      ref={draggableAreaRef}
      style={{
        backgroundColor: "#fff1",
        borderRadius: 5,
      }}
    >
      {options.order.map((section, index) => (
        <PressableDragAndDrop
          key={section}
          onPress={() => null}
          onRelease={() => setTemplateOptions({
            order: options.order.filter((s) => s !== section).slice(0, index).concat([section]).concat(options.order.filter((s) => s !== section).slice(index)),
          })}
          targetRef={index === 0 ? null : options.order[index - 1]}
        >
          <View
            style={{
              padding: 10,
              margin: 5,
              borderRadius: 5,
              backgroundColor: theme.colors.surface,
            }}
          >
            <Text>{section}</Text>
          </View>
        </PressableDragAndDrop>
      ))}
    </View>
  );
};

const getStyles = (theme) => ({

});