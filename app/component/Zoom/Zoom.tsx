import { useWindowDimensions} from 'react-native';
import React from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

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
     * Object Zoom
     */
    const pinchGesture = Gesture
         // Установка обьекта зумирования.
        .Pinch()
         // Блокировка перехвата жестов компонентом.
        .blocksExternalGesture(refScroll)
         // Начало жеста, мы еще не знаем будет ли распознан жест.
        .onBegin((e) => {
            zIndex.value = 100;
        })    
         // Жест распознан и переходит в активное состояние.
        .onStart((e) => {
            console.log(scale.value);
            console.log('Start', e.numberOfPointers);
        })
         // Обновление данных о жесте.
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
            console.log('e.scale', e.scale);
            console.log('scale.value', scale.value);
        })
         // Жест завершен, отработает в случае, если до этого у жеста было активное состояние.
        .onEnd(() => {
            savedScale.value = scale.value;
            console.log('savedScale.value', savedScale.value);
            console.log('--------------------------------------------');
        })
         // Отработает в самом конце в любом случае.
        .onFinalize(() => {
            zIndex.value = 1;
            if(scale.value < 1) {
                 // Плавный возврат к значению 1, принимает (значение, настройки, колбек).
                scale.value = withTiming(1);
                savedScale.value = 1;
            }
        });

    /**
     * Object Pan.
     */
    const panGesture = Gesture
        .Pan()
        

    /**
     * Обьект для плавной анимации.
     */
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        zIndex: zIndex.value
    }));

    const {width} = useWindowDimensions(); // получаем размер экрана
    const height = 2534 * width / 2000;

    return (
        <GestureDetector gesture={pinchGesture}>
            <Animated.Image
                source={source}
                style={[animatedStyle, {width, height}]}
            />
        </GestureDetector>
    );
};

export default Zoom;




