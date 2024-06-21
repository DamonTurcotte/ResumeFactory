import { SafeAreaView, useSafeAreaInsets, withSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import { Text, Button, useTheme, TextInput } from "react-native-paper";
import { useState, useEffect } from "react";
import { FONT } from "../../constants";
import { useLocalSearchParams, Stack } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { createResumeMetaData, createLetterMetaData } from "../../redux/meta";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { HeaderBackButton, HeaderNextButton } from "../../components";

export default CreateView = () => {
  const params = Object.values(useLocalSearchParams())[0];
  const theme = useTheme();

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const beforeNavigate = () => {
    if (title.trim().length === 0) return;
    const payload = {
      title,
      description,
    };
    if (params === "resume") {
      dispatch(createResumeMetaData(payload));
    } else if (params === "letter") {
      dispatch(createLetterMetaData(payload));
    } else {
      console.error("Unknown parameter:", params);
    }
  };

  return (
    <SafeAreaView edges={['bottom']}>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerLeft: () => <HeaderBackButton path="/" />,
          headerRight: () => <HeaderNextButton path={title.trim().length > 0 ? "/" : "/"} textColor={theme.colors.primary} beforeNavigate={beforeNavigate} />,
        }}
      />

      <KeyboardAwareScrollView
        style={{
          backgroundColor: theme.colors.background,
        }}
      >
        <View
          style={{
            padding: 20,
          }}
        >
          <Text
            adjustsFontSizeToFit={true}
            variant="headlineLarge"
            style={{
              fontFamily: FONT.SairaB,
            }}
          >
            { params === "resume"
              ? "What job title is this resume for?"
              : "What would you like to name this cover letter?"
            }
          </Text>
          <Text
            adjustsFontSizeToFit={true}
            variant="labelLarge"
            style={{
              fontFamily: FONT.Saira,
              marginTop: 10,
            }}
          >
            { params === "resume"
              ? "This will help us tailor the resume to the job position. This will also be used to name your resume file."
              : "This will be used as the file name for your cover letter. Consider using the company name and job title."
            }
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            label={ params === "resume" ? "Desired Job Title" : "Cover Letter Name" }
            placeholder={ params === "resume" ? "e.g. Software Engineer" : "e.g. Google Cover Letter" }
            textContentType={ params === "resume" ? "jobTitle" : "none" }
            placeholderTextColor={theme.colors.textDisabled}
            contentStyle={{
              backgroundColor: theme.colors.background,
            }}

            style={{
              marginTop: 10,
            }}
          />
          <Text
            adjustsFontSizeToFit={true}
            variant="headlineMedium"
            style={{
              fontFamily: FONT.SairaB,
              marginTop: 20,
            }}
          >
            Additional Info
          </Text>
          <Text
            adjustsFontSizeToFit={true}
            variant="labelLarge"
            style={{
              fontFamily: FONT.Saira,
              marginTop: 10,
            }}
          >
            { params === "resume"
              ? "This is optional. You can add a description to help you remember what this resume is for."
              : "This is optional. You can add a description to help you remember what this cover letter is for."
            }
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="e.g. Cloud Computing position at Google"
            placeholderTextColor={theme.colors.textDisabled}
            textContentType="jobTitle"
            contentStyle={{
              backgroundColor: theme.colors.background,
            }}

            label={"Description"}
            style={{
              marginTop: 10,
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};