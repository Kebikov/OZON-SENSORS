import { useWindowDimensions, LayoutChangeEvent} from 'react-native';
import React, { useEffect, useMemo, useRef } from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, 
{ 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming, 
    runOnJS
} from 'react-native-reanimated';
import { useState  } from 'react';


interface IZoom {
    /**
     * Ссылка на локальное изображение.
     */
    source: number;
    /**
     * Ref ссылка на ScrollView.
     */
    refScroll: React.MutableRefObject<null>;
}

/**
 * @component Для зумирувония и перемешения изображения.
 * @example 
 * @returns {JSX.Element}
 */
const Zoom: React.FC<IZoom> = ({ source, refScroll }) => {
    
    /**
     * Текуший scale компонента.
     */
    const scale = useSharedValue(1);
    /**
     * Z-Index компонента.
     */
    const zIndex = useSharedValue(1);
    /**
     * Данные последнего установленого scale у компанента.
     */
    const savedScale = useSharedValue(1);
    /**
     * В какое положение перемешяем элемент.
     */
    const translate = useSharedValue({x: 0, y: 0});
    /**
     * В каком положении был элемент.
     */
    const translateOffset = useSharedValue({x: 0, y: 0});
    /**
     * Есть ли зум для потока анимации. 
     * @type {boolean}
     */
    const isZoomShared = useSharedValue<boolean>(false);
    /**
     * Есть ли зум для основного потока. 
     * @type {boolean}
     */
    const [isZoomState, setIsZoomState] = useState<boolean>(false);


    /**
     * Обьект для плавной анимации.
     */
    const animatedStyle = useAnimatedStyle(() => {
        // console.log('Animated scale.value = ', scale.value);
        // console.log('Animated translate.value.x = ', translate.value.x);
        // console.log('Animated translate.value.y = ', translate.value.y);

        return {
            transform: [
                { scale: scale.value }, 
                { translateX: translate.value.x }, 
                { translateY: translate.value.y },
            ],
            zIndex: zIndex.value
        }
    });

    
    /**
     * Object Pan.
     */
    const panGesture = Gesture.Pan()
        .enabled(isZoomState)
        .onUpdate((e) => {
            if(!isZoomShared.value) return;
            translate.value = {
                x: translateOffset.value.x + e.translationX / savedScale.value,
                y: translateOffset.value.y + e.translationY / savedScale.value
            }
        })
        .onEnd(() => {
            if(!isZoomShared.value) return;

            translateOffset.value = {
                x: translate.value.x,
                y: translate.value.y
            }
        });

    const baseSize = () => {
        'worklet';
        // При анимации вожна последовательность, сначала "scale.value = withTiming(1)" потом "translate.value.x = withTiming(0); translate.value.y = withTiming(0);"
        scale.value = withTiming(1);
        translate.value.x = withTiming(0);
        translate.value.y = withTiming(0);

        translateOffset.value = {x: 0, y: 0};
        savedScale.value = 1;
        isZoomShared.value = false;
        runOnJS(setIsZoomState)(false);
    };

    const maxSizeZoom = () => {
        'worklet';
        scale.value = withTiming(2);
        savedScale.value = 2;
        isZoomShared.value = true;
        runOnJS(setIsZoomState)(true);
    };

    /**
     * Object Zoom
     */
    const pinchGesture = Gesture.Pinch()
         // Блокировка перехвата жестов компонентом.
        .blocksExternalGesture(refScroll)
         // Начало жеста, мы еще не знаем будет ли распознан жест.
        .onBegin((e) => {
            zIndex.value = 100;
        })    
         // Жест распознан и переходит в активное состояние.
        .onStart(() => {})
         // Обновление данных о жесте.
        .onUpdate((e) => {
            const slowdown = 1.5;
            const update = ((e.scale - 1) / slowdown) + 1;
            scale.value = savedScale.value * update;
        })
         // Жест завершен, отработает в случае, если до этого у жеста было активное состояние.
        .onEnd(() => {
            savedScale.value = scale.value;
            if(scale.value > 1) {
                isZoomShared.value = true;
                runOnJS(setIsZoomState)(true);
            }

            // Если зум меньше 1, 
            if(scale.value < 1) {
                baseSize();
            }

            if(scale.value > 2) {
                maxSizeZoom();
            }
            zIndex.value = 1;
        });

    /**
     * Object Tap
     */
    const tabGesture = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            console.log('Doubel Tap');
            if(isZoomShared.value) {
                baseSize();
            } else {
                maxSizeZoom();
            }
        });
    

    const {width} = useWindowDimensions(); // получаем размер экрана
    const height = 2534 * width / 2000;

    const raceGesture = Gesture.Simultaneous(pinchGesture, panGesture, tabGesture);

    return (
        <Animated.View>
            <GestureDetector gesture={raceGesture} >
                <Animated.Image
                    source={source}
                    style={[animatedStyle, {width, height}]}
                />
            </GestureDetector>
        </Animated.View>
    );
};

export default Zoom;



