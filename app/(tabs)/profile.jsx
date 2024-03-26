import { Text, useTheme, Surface } from 'react-native-paper';
import { View, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';

import { sliceActivators } from '../../redux/extraReducers';
import { PressableDragAndDrop } from '../../components';
import { Icon } from '../../components/icons/icon';

export default ProfileScreen = () => {
  const theme = useTheme().colors;
  const styles = getStyles(theme);
  const router = useRouter();
  const profile = useSelector((state) => state.profiles[state.currentProfile]);
  const dispatch = useDispatch();

  const activeRef = useRef(null);
  const inactiveRef = useRef(null);

  const activeCategories = Object.keys(profile).filter((key) => profile[key].active === true);
  const inactiveCategories = Object.keys(profile).filter((key) => profile[key].active === false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        <View style={styles.subcontainer}>

          <Text style={styles.title} variant='titleLarge'>Include</Text>
          <View style={styles.categories} ref={activeRef}>
            <Pressable onPress={() => router.navigate('/profile/personal')}>
              <ProfileCard
                category={"personal"}
                draggable={false}
              />
            </Pressable>
            { activeCategories.map((category) => (
                <PressableDragAndDrop
                  key={category}
                  onPress={() => router.navigate(`/profile/${category}`)}
                  onRelease={() => dispatch(sliceActivators[category](false))}
                  targetRef={inactiveRef}
                >
                  <ProfileCard
                    category={category}
                    draggable={true}
                  />
                </PressableDragAndDrop>
              )
            )}
          </View>

          <Text style={styles.title} variant='titleLarge'>Exclude</Text>
          <View style={styles.categories} ref={inactiveRef}>
            { inactiveCategories.map((category) => {
              return (
                <PressableDragAndDrop
                  key={category}
                  onPress={() => router.navigate(`/profile/${category}`)}
                  onRelease={() => dispatch(sliceActivators[category](true))}
                  targetRef={activeRef}
                >
                  <ProfileCard
                    category={category}
                    draggable={true}
                  />
                </PressableDragAndDrop>
              )
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const ProfileCard = ({ category, draggable }) => {
  const theme = useTheme().colors;
  const styles = getStyles(theme);

  return (
    <Surface
      elevation={3}
      style={styles.cardContainer}
      mode='elevated'
    >
      <View style={styles.cardInfo}>
        <Icon
          source={category}
          style={{height: 24, width: 24, fill: theme.primary, marginBottom: 4}}
        />
        <Text
          variant='bodyLarge'
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Text>
      </View>
      { draggable === true &&
        <Icon
          source="drag"
          style={{
            position: 'absolute',
            right: 3,
            top: 5,
            height: 20,
            width: 20,
            fill: theme.primary
          }}
        />
      }
    </Surface>
  )
};

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 6
  },
  subcontainer: {
    width: "100%",
  },
  categories: {
    padding: 3,
    borderRadius: 10,
    backgroundColor: "transparent",
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: "100%",
    minHeight: 84,
    borderColor: theme.outline,
    borderWidth: 1,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  cardContainer: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: theme.surface,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 70,
    margin: 3,
  },
  cardInfo: {
    alignItems: 'center'
  },
  dragIcon: {
    position: 'absolute',
    right: -3,
    top: -1
  }
});
