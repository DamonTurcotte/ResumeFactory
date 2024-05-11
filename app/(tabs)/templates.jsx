import { ScrollView, SafeAreaView, Image, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default TemplateScreen = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: 10,
          gap: 10,
        }}
      >
        <Pressable
          onPress={() => router.navigate("/templates/0")}
          style={{
            flexGrow: 1,
            flexBasis: 150,
            aspectRatio: 8.5 / 11,
            overflow: "hidden",
            elevation: 2,
          }}
        >
          <Image
            source={require("../../assets/thumbnails/0.jpg")}
            resizeMethod='resize'
            resizeMode='contain'
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});