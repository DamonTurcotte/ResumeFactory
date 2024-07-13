import { View, Image, Pressable } from "react-native";
import { Text, useTheme, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FONT } from "../../constants";
import { Icon } from "../icons/icon";
import { useRouter } from "expo-router";

export const FileSelect = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const meta = useSelector((state) => state.meta);
  const router = useRouter();

  const [fileType, setFileType] = useState("resumes");

  const files = meta[fileType];
  const orderedFileKeys = Object.keys(files).sort((a, b) => files[b].lastUpdate - files[a].lastUpdate);

  const today = new Date();


  return (
    <View style={styles.container}>
      <View style={styles.fileTypeSelector}>
        <Button
          textColor={ fileType === "resumes" ? theme.colors.onSurface : theme.colors.onSurfaceDisabled }
          mode="text"
          onPress={() => setFileType("resumes")}
          style={styles.fileTypeButton}
          labelStyle={styles.fileTypeLabel}
          rippleColor="transparent"
        >
          Resumes
        </Button>
        <Button
          textColor={ fileType === "letters" ? theme.colors.onSurface : theme.colors.onSurfaceDisabled }
          mode="text"
          onPress={() => setFileType("letters")}
          style={styles.fileTypeButton}
          labelStyle={styles.fileTypeLabel}
          rippleColor="transparent"
        >
          Cover Letters
        </Button>
      </View>
      <View style={styles.fileList}>
        { Object.keys(files).length === 0 ? (
          <View style={styles.fileListEmpty}>
            <Icon source={fileType === "resumes" ? "resume" : "letter"} style={styles.fileListEmptyIcon} />
            <Text style={styles.fileListEmptyText}>
              No {fileType === "resumes" ? "resumes" : "cover letters"} yet
            </Text>
          </View>
        ) : (
          orderedFileKeys.map((id) => (
            <View
              key={id}
              style={styles.fileItem}
            >
              <View
                style={styles.fileItemThumbContainer}
              >
                <Image
                  source={ require("../../assets/thumbnails/blank.png") }
                  style={styles.fileItemThumb}
                />
              </View>
              <View style={styles.fileItemTextContainer}>
                <Text style={styles.fileItemTextTitle}>
                  {files[id].title}
                </Text>
                { files[id].description.trim().length > 0
                ?
                  <Text
                    numberOfLines={1}
                    lineBreakMode="tail"
                    style={styles.fileItemTextDescription}
                  >
                    {files[id].description}
                  </Text>
                :
                  <Text style={styles.fileItemTextDescription}>
                    { today.toLocaleDateString() === new Date(Number(files[id].lastUpdate)).toLocaleDateString()
                      ? new Date(Number(files[id].lastUpdate)).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })
                      : new Date(Number(files[id].lastUpdate)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    }
                  </Text>
                }
              </View>
              <Pressable onPress={() => router.navigate('resume')}>
                <Icon source="ellipse" style={styles.fileItemEllipse} />
              </Pressable>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

const getStyles = (theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    padding: 5,
    borderRadius: 10,
    ...theme.shadow,
  },
  fileTypeSelector: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  fileTypeButton: {
    flexShrink: 1,
    padding: 0,
  },
  fileTypeLabel: {
    fontFamily: FONT.SairaB,
    letterSpacing: 0.5,
    fontSize: 16,
  },
  fileList: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 5,
    
  },
  fileListEmpty: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    marginVertical: 20,
  },
  fileListEmptyIcon: {
    fill: theme.colors.onSurfaceDisabled,
    width: 40,
    height: 40,
  },
  fileListEmptyText: {
    fontFamily: FONT.SairaMI,
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: 18,
    color: theme.colors.onSurfaceDisabled,
  },
  fileItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.surface,
    marginBottom: 5,
  },
  fileItemThumbContainer: {
    height: 50,
    width: 40,
    borderRadius: 3,
    overflow: "hidden",
  },
  fileItemThumb: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  fileItemTextContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flexGrow: 1,
    flexShrink: 1,
    marginLeft: 10,
  },
  fileItemTextTitle: {
    fontFamily: FONT.SairaM,
    fontSize: 16,
    lineHeight: 24,
  },
  fileItemTextDescription: {
    fontFamily: FONT.Saira,
    fontSize: 14,
    lineHeight: 18,
    color: theme.colors.onSurfaceDisabled,
  },
  fileItemEllipse: {
    stroke: theme.colors.onSurfaceDisabled,
    fill: theme.colors.onSurfaceDisabled,
    width: 21,
    height: 21,
  },
});