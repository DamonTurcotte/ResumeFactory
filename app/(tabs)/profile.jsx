import { Text, useTheme, Surface } from 'react-native-paper';
import { View, SafeAreaView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { sliceActivators } from '../../redux/extraReducers';
import { PressableDragAndDrop } from '../../components';

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

      <View style={styles.container}>
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
      </View>
    </SafeAreaView>
  );
}

const ProfileCard = ({ category, draggable }) => {
  const theme = useTheme().colors;
  const styles = getStyles(theme);
  const cardIcon = cardIcons(theme)[category];

  return (
    <Surface
      elevation={3}
      style={styles.cardContainer}
      mode='elevated'
    >
      <View style={styles.cardInfo}>
        {cardIcon}
        <Text
          variant='bodyLarge'
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Text>
      </View>
      { draggable === true &&
        <MaterialCommunityIcons
          name="drag"
          style={styles.dragIcon}
          size={32}
          color={theme.background}
        />
      }
    </Surface>
  )
};

const cardIcons = (theme) => ({
  personal: (<MaterialCommunityIcons name="account" size={24} color={theme.primary} />),
  objective: (<MaterialCommunityIcons name="bullhorn" size={24} color={theme.primary} />),
  summary: (<MaterialCommunityIcons name="note-text" size={24} color={theme.primary} />),
  experience: (<MaterialCommunityIcons name="briefcase" size={24} color={theme.primary} />),
  education: (<MaterialCommunityIcons name="school" size={24} color={theme.primary} />),
  skills: (<MaterialCommunityIcons name="pencil" size={24} color={theme.primary} />),
  certificates: (<MaterialCommunityIcons name="certificate" size={24} color={theme.primary} />),
  projects: (<MaterialCommunityIcons name="folder" size={24} color={theme.primary} />),
  publications: (<MaterialCommunityIcons name="newspaper" size={24} color={theme.primary} />),
  languages: (<MaterialCommunityIcons name="translate" size={24} color={theme.primary} />),
  references: (<MaterialCommunityIcons name="account-group" size={24} color={theme.primary} />),
})

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
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
    backgroundColor: theme.inversePrimary,
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
