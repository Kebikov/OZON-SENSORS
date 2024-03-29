import { View, Text, StyleSheet, useWindowDimensions, LayoutChangeEvent } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SensorPropse } from '@/navigation/navigation.types';
import { FC } from 'react';
import Header from '@/component/Header/Header';
import { SENSORS } from '@/data/sensors';
import { useRef, useLayoutEffect } from 'react';
import Zoom from '@/component/Zoom/Zoom';
import { COLOR_ROOT } from '@/data/colors';
import { Dimensions } from 'react-native';
import { measure } from 'react-native-reanimated';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');


/**
 * @page Стартовая страница авторизации.
 * @returns {JSX.Element}
 */
const Sensors: FC<SensorPropse> = ({route}) => {

    const refScroll = useRef(null);

    const {height} = useWindowDimensions();

    const numberSensor: number = route.params.numberSensor;

    const subTitle = SENSORS[numberSensor].subtitle.map((point, i) => {
        return <Text style={styles.point} key={i}>✅ {point.text}</Text>
    });

    const onLayout = (e: LayoutChangeEvent) => {
        console.log('onLayout = ', e.nativeEvent.layout.height);
    }





    return (
        <View style={styles.main} >
            <Header />
            <ScrollView  contentContainerStyle={{flexGrow: 1}} ref={refScroll} >
                <View style={styles.line} />
                <Text style={styles.textSensor} >{'Датчик №' + numberSensor}</Text>
                <Text style={styles.textSensor} >{'Тип : ' + SENSORS[numberSensor].type}</Text>
                <View style={styles.line} />
                
                <View style={styles.boxSubTitle} >
                    <Text style={styles.title} >{SENSORS[numberSensor].title}</Text>
                    {subTitle}
                </View>
            
                <Zoom source={SENSORS[numberSensor].img} refScroll={refScroll} />

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center'
    },
    line: {
        width: '100%',
        height: 3,
        backgroundColor: 'white',
        marginBottom: 3,
        marginTop: 3
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white'
    },
    boxSubTitle: {
        width: '100%',
        padding: 10
    },
    textSensor: {
        fontSize: 17,
        color: COLOR_ROOT.YELLOW,
        fontWeight: '600',
        textAlign: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20
    },
    point: {
        color: 'white',
        fontSize: 17,
        lineHeight: 23
    }
});

export default  Sensors;