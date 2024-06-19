import { View, Dimensions, Animated, Easing } from "react-native";
import { Icon } from "./icons/icon";
import { FONT } from "../constants";
import { useTheme, Text } from "react-native-paper";
import { useEffect, useState } from "react";

export const Logo = () => {
  const theme = useTheme();
  
  const { width } = Dimensions.get("window");

  const [renderWidth, setRenderWidth] = useState(width);

  const spinValue = new Animated.Value(0);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const rotateReverse = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["360deg", "0deg"],
  });

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 8000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };

  useEffect(() => {
    setRenderWidth(Math.min(width, 480));
  }, [width]);

  useEffect(() => {
    spin();
  });

  return (
    <View
      style={{
        marginVertical: 20 + renderWidth / 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-end",
          marginRight: renderWidth / 48,
          marginBottom: renderWidth / 48,
        }}
      >
        <View>
          <Animated.View style={{
            transform: [{ rotate: rotate }]
          }}>
            <Icon source="cog" style={{
              fill: theme.colors.primary,
              width: renderWidth / 12,
              height: renderWidth / 12,
            }} />
          </Animated.View>
        </View>
        <View
          style={{
            marginRight: renderWidth / 36,
          }}
        >
          <Animated.View style={{
            transform: [{ rotate: rotateReverse }]
          }}>
            <Icon
              source="cog"
              style={{
                fill: theme.colors.onBackground,
                width: renderWidth / 9,
                height: renderWidth / 9,
              }}
            />
          </Animated.View>
        </View>
      </View>
      <View>
        <Text
          style={{
            color: theme.colors.onBackground,
            fontFamily: FONT.OrbitronB,
            fontSize: renderWidth / 8,
            lineHeight: renderWidth / 8,
          }}
        >
          Resume
        </Text>
        <Text
          style={{
            color: theme.colors.primary,
            fontFamily: FONT.OrbitronB,
            fontSize: renderWidth / 8,
            lineHeight: renderWidth / 8,
          }}
        >
          Factory
        </Text>
      </View>
    </View>
  )
};