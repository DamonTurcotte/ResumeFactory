import React, { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

export const PressableDragAndDrop = ({ children, onPress, onRelease, targetRef, setIsDragging }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const initialPos = useRef({x: 0, y: 0});

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gesture) => {
        setIsDragging(true);
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
        initialPos.current.x = e.nativeEvent.pageX;
        initialPos.current.y = e.nativeEvent.pageY;
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        setIsDragging(false);
        const moveThreshold = 5;
      
        if (Math.abs(gesture.dx) < moveThreshold && Math.abs(gesture.dy) < moveThreshold) {
          setTimeout(onPress, 50)
          pan.setValue({ x: 0, y: 0 });
        } else {
          targetRef.current.measure((x, y, width, height, pageX, pageY) => {
            const currentX = initialPos.current.x + pan.x._value;
            const currentY = initialPos.current.y + pan.y._value;
      
            const isWithinTarget =
              currentX >= pageX &&
              currentX <= pageX + width &&
              currentY >= pageY &&
              currentY <= pageY + height;
      
            if (isWithinTarget) {
              onRelease();
            } else {
              pan.setValue({ x: 0, y: 0 });
            }
          });
        }
        pan.flattenOffset();
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: () => {
        setIsDragging(false);
        pan.setValue({ x: 0, y: 0 });
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};