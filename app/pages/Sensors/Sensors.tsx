import { View, Text, StyleSheet, Image, 
    Animated, // для динамичного применения стилей
    useWindowDimensions, // размеры экрана пользователя
    Dimensions,
    SafeAreaView
} from 'react-native';
import { SensorPropse } from '@/navigation/navigation.types';
import { FC } from 'react';
import Header from '@/component/Header/Header';
import { useState, useRef, createRef } from 'react';
import { SENSORS, ISensors, TKeySensor } from '@/data/sensors';

import { 
    TapGestureHandler, // для двойново нажатия и возврата в исходное состояние
    PanGestureHandler, // для движения кортинки по экрану пальцем
    PinchGestureHandler // для зума двумя пальцами
} from 'react-native-gesture-handler';
import Zoom from '@/component/Zoom/Zoom';



export interface IImage {
    /**
     * Маштаб изображения.
     */
    scale: Animated.AnimatedMultiplication<string | number>;
    translateX: Animated.Value;
    translateY: Animated.Value;
}


/**
 * @page Стартовая страница авторизации.
 * @returns {JSX.Element}
 */
const Sensors: FC<SensorPropse> = ({route}) => {

    const {width} = useWindowDimensions(); // получаем размер экрана

    const numberSensor: number = route.params.numberSensor;

    // console.log(Dimensions.get('window').width);
    // console.log(Dimensions.get('window').height);

    const renderImage = ({scale, translateX, translateY}: IImage) => {
        return(
            <Animated.Image
                source={require('@/source/imgPlan/1.jpg')}
                style={[
                    {width, height: 500},
                    {
                        transform: [
                            {scale},
                            {translateX},
                            {translateY}
                        ]
                    }
                ]}
            />
        )
    }



    return (
        <SafeAreaView style={{flex: 1}}> 
        <View style={styles.main}>
            {/* <Header/>
            <Text style={styles.text} >{'Датчик №' + numberSensor}</Text>
            <Text style={styles.text} >{'Тип : ' + SENSORS[numberSensor].title}</Text> */}
            
                {/* <Image 
                    resizeMode='contain'
                    source={ require('@/source/imgPlan/1.jpg') }
                /> */}
                {/* <Zoom/> */}

                <Zoom renderImage={renderImage} />

        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'red',
        flex: 1,
        marginTop: 20
    },
    imgBox: {
        flex: 1,
        backgroundColor: 'green',
        height: 520,
        width: '100%'
    },
    img: {
        resizeMode: 'contain',
    },
    text: {
        color: 'white',
        fontSize: 20
    },
});

export default  Sensors;