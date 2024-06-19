import { View } from "react-native";
import { Text, useTheme, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FONT } from "../../constants";
import { Icon } from "../icons/icon";

export const FileSelect = () => {
  const theme = useTheme();
  const meta = useSelector((state) => state.meta);

  const [fileType, setFileType] = useState("resumes");

  const files = meta[fileType];

  console.log(Object.keys(files).length);

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        padding: 5,
        borderRadius: 10,
        ...theme.shadow,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Button
          textColor={ fileType === "resumes" ? theme.colors.onSurface : theme.colors.onSurfaceDisabled }
          mode="text"
          onPress={() => setFileType("resumes")}
          style={{
            flexShrink: 1,
            padding: 0,
          }}
          labelStyle={{
            fontFamily: FONT.SairaB,
            letterSpacing: 0.5,
            fontSize: 16,
          }}
          rippleColor="transparent"
        >
          Resumes
        </Button>
        <Button
          textColor={ fileType === "letters" ? theme.colors.onSurface : theme.colors.onSurfaceDisabled }
          mode="text"
          onPress={() => setFileType("letters")}
          style={{
            flexShrink: 1,
            padding: 0,
          }}
          labelStyle={{
            fontFamily: FONT.SairaB,
            letterSpacing: 0.5,
            fontSize: 16,
          }}
          rippleColor="transparent"
        >
          Cover Letters
        </Button>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          marginTop: 5,
        }}
      >
        {Object.keys(files).length === 0 ? (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              marginVertical: 20,
            }}
          >
            <Icon source={fileType === "resumes" ? "resume" : "letter"} style={{
                fill: theme.colors.onSurfaceDisabled,
                width: 40,
                height: 40,
              }}
            />
            <Text
              style={{
                fontFamily: FONT.SairaMI,
                fontSize: 14,
                letterSpacing: 0.25,
                lineHeight: 18,
                color: theme.colors.onSurfaceDisabled,
              }}
            >
              No {fileType === "resumes" ? "resumes" : "cover letters"} yet
            </Text>
          </View>
        ) : (
          Object.keys(files).map((id) => (
            <Text
              key={id}
              style={{
                fontFamily: FONT.Saira,
                fontSize: 14,
                lineHeight: 18,
                color: theme.colors.onSurface,
              }}
            >
              {files[id].title}
            </Text>
          ))
        )}
      </View>
    </View>
  );
};