import { useWindowDimensions, LayoutChangeEvent} from 'react-native';
import React from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, 
{ 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming, 
    withSequence,
    runOnJS 
} from 'react-native-reanimated';


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
     * Обьект для плавной анимации.
     */
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value }, 
            { translateX: translate.value.x }, 
            { translateY: translate.value.y },
        ],
        zIndex: zIndex.value,
    }));

        /**
     * Object Pan.
     */
        const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            translate.value = {
                x: translateOffset.value.x + e.translationX / savedScale.value,
                y: translateOffset.value.y + e.translationY / savedScale.value
            }
        })
        .onEnd(() => {
            translateOffset.value = {
                x: translate.value.x,
                y: translate.value.y
            }
        });

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
            scale.value = savedScale.value * e.scale;
        })
         // Жест завершен, отработает в случае, если до этого у жеста было активное состояние.
        .onEnd(() => {
            savedScale.value = scale.value;
        })
         // Отработает в самом конце в любом случае.
        .onFinalize((e) => {
            // e.focalX = 400;
            
            zIndex.value = 1;
            if(scale.value < 1) {

                scale.value = withTiming(1);
                // translate.value = withTiming({x: 0, y: 0});

                // scale.value = withTiming(1, undefined, (isReady) => {
                
                //     savedScale.value = 1;
                //     zIndex.value = 1;
                //     translate.value = withTiming({x: 0, y: 0});
                //     translateOffset.value = {x: 0, y: 0};
                // });
                console.log(e);
            }

            // if(scale.value > 2) {
            //     scale.value = withTiming(2, undefined, (isReady) => {
            //         if(isReady) {
            //             scale.value = 2;
            //             savedScale.value = 2;
            //             zIndex.value = 1;
            //             console.log(scale.value);
            //         }
            //     });
            // }
        });
    

    const {width} = useWindowDimensions(); // получаем размер экрана
    const height = 2534 * width / 2000;

    const raceGesture = Gesture.Simultaneous(pinchGesture, panGesture);

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




