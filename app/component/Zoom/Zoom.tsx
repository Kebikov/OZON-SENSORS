import { View, Text, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import React, { FC, useCallback, useState, useRef } from 'react';
import { 
    TapGestureHandler, 
    HandlerStateChangeEvent, 
    TapGestureHandlerEventPayload, 
    State, PinchGestureHandler,
    PinchGestureHandlerEventPayload, 
    PanGestureHandler,
    PanGestureHandlerEventPayload
} from 'react-native-gesture-handler';


interface IZoom {
    /**
     * Ссылка на локальное изображение.
     */
    source: number;
    refScroll: React.MutableRefObject<null>;
    setIsActiveScroll: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * @component Для зумирувония и перемешения изображения.
 * @example 
 * @returns {JSX.Element}
 */
const Zoom: FC<IZoom> = ({ source, refScroll, setIsActiveScroll }) => {

    const {width} = useWindowDimensions(); // получаем размер экрана

    const height = 2534 * width / 2000;

    const [isZoomedIn, setIsZoomedIn] = useState<boolean>(false);

    const lastScale = useRef(1);
    const baseScale = useRef(new Animated.Value(lastScale.current)).current;
    /**
     * @Object Зумирования двумя пальцами.
     */
    const pinchScale = useRef(new Animated.Value(1)).current;
    const scale = useRef(Animated.multiply(baseScale, pinchScale)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    /**
     * Замедление перемешения по оси X в зависимости от зума.
     */
    const translateXslowdown = useRef(Animated.divide(translateX, scale)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    /**
     * Замедление перемешения по оси Y в зависимости от зума.
     */
    const translateYslowdown = useRef(Animated.divide(translateY, scale)).current;
    /**
     * @Object С последними текушими значениями сдвига изображения.
     */
    const lastOffset = useRef(
        {
            x: 0,
            y: 0
        }
    ).current;
    
    /**
     * Увеличение изображения по двойному тапу.
     */
    const zoomIn = useCallback(() => {
        lastScale.current = 2;
        // Паралельное аниминирование
        Animated.parallel([
            Animated.spring(baseScale, {
                toValue: lastScale.current,
                useNativeDriver: true
            }),
            Animated.spring(pinchScale, {
                toValue: 1,
                useNativeDriver: true
            })
        ]).start();

        lastOffset.x = 0;
        lastOffset.y = 0;

        translateX.setOffset(lastOffset.x);
        translateX.setValue(0);
        translateY.setOffset(lastOffset.y);
        translateY.setValue(0);

        setIsZoomedIn(true);
    }, []);

    /**
     * Возврат к исходному состоянию зумирования.
     */
    const zoomOut = useCallback(() => {
        lastScale.current = 1;
        Animated.parallel([
            Animated.spring(baseScale, {
                toValue: lastScale.current,
                useNativeDriver: true
            }),
            Animated.spring(pinchScale, {
                toValue: 1,
                useNativeDriver: true
            })
        ]).start();

        setIsActiveScroll(true);

        lastOffset.x = 0;
        lastOffset.y = 0;

        translateX.setOffset(lastOffset.x);
        translateX.setValue(0);
        translateY.setOffset(lastOffset.y);
        translateY.setValue(0);

        setIsZoomedIn(false);
    }, []);

    /**
     * Максимальный зум.
     * - Если зум больше установленного lastScale.current произойдет возврат к установленному значению.
     */
    const zoomMax = useCallback(() => {
        lastScale.current = 2;
        Animated.parallel([
            Animated.spring(baseScale, {
                toValue: lastScale.current,
                useNativeDriver: true
            }),
            Animated.spring(pinchScale, {
                toValue: 1,
                useNativeDriver: true
            })
        ]).start();
        setIsZoomedIn(true);
    }, []);

    /**
     * Обработка двойного нажатия.
     */
    const onDoubleTap = useCallback((event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
        if(event.nativeEvent.state !== State.ACTIVE) {
            return // если нажатие не активно возврат из функции
        }
        console.log(isZoomedIn);
        if(isZoomedIn) {
            zoomOut();
        } else {
            zoomIn();
        }

    }, [isZoomedIn, zoomIn, zoomOut]);

    // Zoom, связывание scale и pinchScale,  полученный scale в результате действия будет автоматически установлен у обьекта pinchScale.
    const onPinchGestureEvent = Animated.event(
        [{nativeEvent: {scale: pinchScale}}],
        {useNativeDriver: true}
    );

    // Zoom
    const onPinchHandelStateChange = useCallback((event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>) => {
        console.log('Zoom');
        console.log(event.nativeEvent);
        if(event.nativeEvent.oldState === State.ACTIVE) {
            console.log('State.ACTIVE');
            lastScale.current = lastScale.current * event.nativeEvent.scale;
            if(lastScale.current > 1 && lastScale.current <= 2) {
                setIsZoomedIn(true);
                baseScale.setValue(lastScale.current);
                pinchScale.setValue(1); // для начала события увиличения двумя пальцами задаем начальное состояние 1
            } else if(lastScale.current > 2) {
                zoomMax();
            } else {
                zoomOut();
            }
        } else if(event.nativeEvent.oldState === State.BEGAN && event.nativeEvent.numberOfPointers === 2) {
            console.log('State.BEGAN');
            setIsActiveScroll(false);
        } 
    }, []);

    /**
     *  Обработка перемешения.
     */
    const onPanGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: translateX,
                    translationY: translateY
                }
            }
        ],
        {
            useNativeDriver: true,
        }
    );

    /**
     *  Обработка перемешения.
     */
    const onPanHandlerStateChange = useCallback((event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
        console.log('Pan');
        if(event.nativeEvent.oldState === State.ACTIVE) {
            lastOffset.x += event.nativeEvent.translationX;
            lastOffset.y += event.nativeEvent.translationY;

            translateX.setValue(0);
            translateY.setValue(0);
            translateX.setOffset(lastOffset.x);
            translateY.setOffset(lastOffset.y);
        }
    }, [lastOffset]);


    return (
        <TapGestureHandler
            simultaneousHandlers={refScroll}
            onHandlerStateChange={onDoubleTap} // Этот колбэк вызывается, когда состояние обработчика жестов изменяется. 
            numberOfTaps={2} // Количество ожидаемых нажатий
        >
            <Animated.View style={{flex: 1, backgroundColor: 'red'}}>
                <PinchGestureHandler
                    onHandlerStateChange={onPinchHandelStateChange}
                    onGestureEvent={onPinchGestureEvent} // Этот колбэк вызывается, когда обработчик жестов обнаруживает событие жеста.
                >
                    <Animated.View style={{flex: 1}}>
                        <PanGestureHandler
                            enabled={isZoomedIn} //: Add 
                            onGestureEvent={onPanGestureEvent}
                            onHandlerStateChange={onPanHandlerStateChange}
                            maxPointers={1}
                            minPointers={1}
                            waitFor={refScroll} //: Add 
                        >
                            <Animated.Image
                                source={source}
                                style={[
                                    {width, height},
                                    {
                                        transform: [
                                            {scale},
                                            {translateX: isZoomedIn ? translateXslowdown : 0},
                                            {translateY: isZoomedIn ? translateYslowdown : 0}
                                        ]
                                    }
                                ]}
                            />
                        </PanGestureHandler>
                    </Animated.View>
                </PinchGestureHandler>
            </Animated.View>
        </TapGestureHandler>
    );
};

const styles = StyleSheet.create({
});

export default Zoom;
