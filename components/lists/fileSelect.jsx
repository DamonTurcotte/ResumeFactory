import { View, Image } from "react-native";
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
  const orderedFileKeys = Object.keys(files).sort((a, b) => files[b].lastUpdate - files[a].lastUpdate);

  const today = new Date();


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
          orderedFileKeys.map((id) => (
            <View
              key={id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
                backgroundColor: theme.colors.surface,
                marginBottom: 5,
              }}
            >
              <Image
                source={ require("../../assets/thumbnails/blank.png") }
                style={{
                  width: 34,
                  height: 44,
                  borderRadius: 1,
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  flexGrow: 1,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT.SairaM,
                    fontSize: 16,
                    lineHeight: 24,
                  }}
                >
                  {files[id].title}
                </Text>
                { files[id].description.trim().length > 0
                ?
                  <Text
                    style={{
                      fontFamily: FONT.Saira,
                      fontSize: 14,
                      lineHeight: 18,
                      color: theme.colors.onSurfaceDisabled,
                    }}
                  >
                    {files[id].description}
                  </Text>
                :
                  <Text
                    style={{
                      fontFamily: FONT.Saira,
                      fontSize: 14,
                      lineHeight: 18,
                      color: theme.colors.onSurfaceDisabled,
                    }}
                  >
                    { today.toLocaleDateString() === new Date(Number(files[id].lastUpdate)).toLocaleDateString()
                      ? new Date(Number(files[id].lastUpdate)).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })
                      : new Date(Number(files[id].lastUpdate)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    }
                  </Text>
                }
              </View>
              <View>
                <Icon source="ellipse" style={{stroke: theme.colors.onSurfaceDisabled, fill: theme.colors.onSurfaceDisabled, width: 21, height: 21}} />
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  );
};