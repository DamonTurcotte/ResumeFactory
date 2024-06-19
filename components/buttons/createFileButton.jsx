import React from 'react';
import { View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import { Icon } from '../icons/icon';
import { FONT } from '../../constants';

export const CreateFileButton = ({ title1, title2, icon, onPress, style }) => {
  const theme = useTheme();

  return (
    <View
      style={[{
        overflow: "hidden",
        borderRadius: 10,
        elevation: 1,
      }, style]}
    >
      <TouchableRipple
        rippleColor={theme.colors.surfaceRipple}
        onPress={onPress}
        style={{
          borderRadius: 10,
          padding: 10,
          backgroundColor: theme.colors.surface,
          flexDirection: "row",
        }}
      >
        <>
        <Icon source={icon} style={{ width: 40, height: 40, fill: theme.colors.primary }} />
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            justifyContent: "space-between",
            transform: [{ translateY: 2.5 }]
          }}
        >
          <Text
            style={{
              fontFamily: FONT.Saira,
              fontSize: 14,
              letterSpacing: 0.5,
              lineHeight: 18,
            }}
          >
            {title1}
          </Text>
          <Text
            style={{
              fontFamily: FONT.SairaB,
              fontSize: 20,
              letterSpacing: 0.5,
              lineHeight: 24,
            }}
          >
            {title2}
          </Text>
        </View>
        </>
      </TouchableRipple>
    </View>
  )
}