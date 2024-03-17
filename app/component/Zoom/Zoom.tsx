import { View, Text, StyleSheet, Animated, NativeSyntheticEvent } from 'react-native';
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
import { IImage } from '@/pages/Sensors/Sensors';

interface IZoom {
    renderImage: ({}: IImage) => JSX.Element;
}

/**
 * @component
 * @example 
 * @returns {JSX.Element}
 */
const Zoom: FC<IZoom> = ({ renderImage }) => {

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

    const onDoubleTap = useCallback((event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
        if(event.nativeEvent.state !== State.ACTIVE) {
            return // если нажатие не активно возврат из функции
        }

        if(isZoomedIn) {
            zoomOut();
        } else {
            zoomIn();
        }

    }, [isZoomedIn, zoomIn, zoomOut]);

    
    // Зум, связывание scale и pinchScale,  полученный scale в результате действия будет автоматически установлен у обьекта pinchScale.
    const onPinchGestureEvent = Animated.event(
        [{nativeEvent: {scale: pinchScale}}],
        {useNativeDriver: true}
    );

    // Зум
    const onPinchHandelStateChange = useCallback((event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>) => {
        //console.log('Zoom = ', event.nativeEvent);
        if(event.nativeEvent.oldState === State.ACTIVE) {
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
        }
    }, []);

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

    const onPanHandlerStateChange = useCallback((event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {

        //console.log('Pan = ', event.nativeEvent);
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
            onHandlerStateChange={onDoubleTap} // Этот колбэк вызывается, когда состояние обработчика жестов изменяется. 
            numberOfTaps={2} // Количество ожидаемых нажатий
        >
            <Animated.View style={{flex: 1}}>
                <PinchGestureHandler
                    onHandlerStateChange={onPinchHandelStateChange}
                    onGestureEvent={onPinchGestureEvent} // Этот колбэк вызывается, когда обработчик жестов обнаруживает событие жеста.
                >
                    <Animated.View style={{flex: 1}}>
                        <PanGestureHandler
                            onGestureEvent={onPanGestureEvent}
                            onHandlerStateChange={onPanHandlerStateChange}
                            maxPointers={1}
                            minPointers={1}
                        >
                            {renderImage({scale, translateX:  translateXslowdown, translateY: translateYslowdown})}
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


