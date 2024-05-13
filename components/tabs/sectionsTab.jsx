import { View, Pressable } from "react-native";
import { Text, useTheme, Icon } from "react-native-paper";
import { useSelector } from "react-redux";

export const SectionsTab = ({ template, setTemplateOptions }) => {
  const options = useSelector((state) => state.profiles[state.currentProfile].options.templateOptions[template]);
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleMoveSection = (direction, index) => {
    const newOrder = [...options.order];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index + direction];
    newOrder[index + direction] = temp;

    setTemplateOptions({
      order: newOrder,
    });
  }

  return (
    <View
      style={styles.container}
    >
      {options.order.map((section, index) => (
        <View
          key={section}
          style={styles.section}
        >
          <Text>
            {section.slice(0, 1).toUpperCase() + section.slice(1)}
          </Text>
          <View
            style={styles.sectionButtonContainer}
          >
            <Pressable
              onPress={() => handleMoveSection(-1, index)}
              disabled={index === 0}
            >
              <View
                style={styles.sectionButton}
              >
                <Icon
                  source="arrow-up"
                  size={20}
                  color={index === 0 ? theme.colors.onSurfaceDisabled : theme.colors.onSurface}
                />
              </View>
            </Pressable>
            <Pressable
              onPress={() => handleMoveSection(1, index)}
              disabled={index === options.order.length - 1}
            >
              <View
                style={styles.sectionButton}
              >
                <Icon
                  source="arrow-down"
                  size={20}
                  color={index === options.order.length - 1 ? theme.colors.onSurfaceDisabled : theme.colors.onSurface}
                />
              </View>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

const getStyles = (theme) => ({
  container: {
    gap: 8,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: theme.colors.surfaceVariant,
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 12,
  },
  sectionButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionButton: {
    paddingHorizontal: 5,
  },
});