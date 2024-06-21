import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

export const HeaderNextButton = ({path, textColor, beforeNavigate=null}) => {
  const router = useRouter();
  return (
    <Button textColor={textColor} mode="text" onPress={() => {
        if (beforeNavigate) beforeNavigate();
        router.navigate(path);
      }}
    >
      Next
    </Button>
  )
}