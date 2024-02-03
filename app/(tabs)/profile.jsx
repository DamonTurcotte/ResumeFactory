import { Text, Modal, useTheme, Button, TextInput } from 'react-native-paper';
import { View, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

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
          <Text style={styles.title} variant='titleLarge'>Active</Text>
          <View style={styles.categories} ref={activeRef}>
            <Pressable onPress={() => router.navigate('/profile/personal')}>
              <View style={{backgroundColor: theme.primary}}>
                <Text variant='bodyLarge'>Personal</Text>
              </View>
            </Pressable>
            { activeCategories.map((category) => (
                <PressableDragAndDrop
                  key={category}
                  onPress={() => router.navigate(`/profile/${category}`)}
                  onRelease={() => dispatch(sliceActivators[category](false))}
                  targetRef={inactiveRef}
                >
                  <View style={{backgroundColor: theme.primary}}>
                    <Text variant='bodyLarge'>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>
                  </View>
                </PressableDragAndDrop>
              )
            )}
          </View>

          <Text style={styles.title} variant='titleLarge'>Inactive</Text>
          <View style={styles.categories} ref={inactiveRef}>
            { inactiveCategories.map((category) => {
              return (
                <PressableDragAndDrop
                  key={category}
                  onPress={() => router.navigate(`/profile/${category}`)}
                  onRelease={() => dispatch(sliceActivators[category](true))}
                  targetRef={activeRef}
                >
                  <View style={{backgroundColor: theme.primary}}>
                    <Text variant='bodyLarge'>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>
                  </View>
                </PressableDragAndDrop>
              )
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subcontainer: {
    width: "90%"
  },
  categories: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.primary,
    height: 200,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 0,
  },
});
