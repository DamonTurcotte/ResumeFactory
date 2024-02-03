import { useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "react-native-paper";

export const HeaderBackButton = ({path}) => {
  const theme = useTheme().colors;
  const router = useRouter();
  return (
    <Icon 
      name='arrow-left'
      color={theme.onNavbarVariant}
      size={30}
      onPress={() => {
        router.navigate(path);
      }}
    />
  )
}