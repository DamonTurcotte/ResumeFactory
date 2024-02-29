import { useRouter } from "expo-router";
import { Icon } from "../icons/icon";
import { useTheme } from "react-native-paper";
import { Pressable } from "react-native";

export const HeaderBackButton = ({path}) => {
  const theme = useTheme().colors;
  const router = useRouter();
  return (
    <Pressable onPress={() => router.navigate(path)}>
      <Icon 
        source='arrow-left'
        style={{ height: 24, width: 24, fill: theme.onNavbarVariant}}
      />
    </Pressable>
  )
}