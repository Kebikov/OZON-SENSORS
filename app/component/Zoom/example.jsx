// import React, { useRef } from 'react';
// import { StyleSheet } from 'react-native';
// import {
//   GestureDetector,
//   Gesture,
//   GestureHandlerRootView,
//   ScrollView,
// } from 'react-native-gesture-handler';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from 'react-native-reanimated';

// const ITEMS = ['red', 'green', 'blue', 'yellow'];

// function Item({ backgroundColor, scrollRef }) {
//   const scale = useSharedValue(1);
//   const zIndex = useSharedValue(1);

//   const pinch = Gesture.Pinch()
//     .blocksExternalGesture(scrollRef)
//     .onBegin(() => {
//       zIndex.value = 100;
//     })
//     .onChange((e) => {
//       scale.value *= e.scaleChange;
//     })
//     .onFinalize(() => {
//       scale.value = withTiming(1, undefined, (finished) => {
//         if (finished) {
//           zIndex.value = 1;
//         }
//       });
//     });

//   const animatedStyles = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//     zIndex: zIndex.value,
//   }));

//   return (
//     <GestureDetector gesture={pinch}>
//       <Animated.View
//         style={[
//           { backgroundColor: backgroundColor },
//           styles.item,
//           animatedStyles,
//         ]}
//       />
//     </GestureDetector>
//   );
// }

// export default function Example() {
//   const scrollRef = useRef();

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <ScrollView style={styles.container} ref={scrollRef}>
//         {ITEMS.map((item) => (
//           <Item backgroundColor={item} key={item} scrollRef={scrollRef} />
//         ))}
//       </ScrollView>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   item: {
//     flex: 1,
//     aspectRatio: 1,
//   },
// });