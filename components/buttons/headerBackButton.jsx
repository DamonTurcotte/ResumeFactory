import { useRouter } from "expo-router";
import { Icon } from "../icons/icon";
import { useTheme } from "react-native-paper";
import { Pressable } from "react-native";

export const HeaderBackButton = ({path}) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Pressable onPress={() => router.navigate(path)}>
      <Icon 
        source="back"
        style={{
          height: 24,
          width: 24,
          marginRight: 10,
          fill: theme.colors.onNavbar,
        }}
      />
    </Pressable>
  )
}