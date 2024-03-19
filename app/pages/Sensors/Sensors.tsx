import { View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import { SensorPropse } from '@/navigation/navigation.types';
import { FC } from 'react';
import Header from '@/component/Header/Header';
import { SENSORS } from '@/data/sensors';
import { useRef, useState } from 'react';
import Zoom from '@/component/Zoom/Zoom';
import { COLOR_ROOT } from '@/data/colors';



/**
 * @page Стартовая страница авторизации.
 * @returns {JSX.Element}
 */
const Sensors: FC<SensorPropse> = ({route}) => {

    const refScroll = useRef(null);
    const [isActiveScroll, setIsActiveScroll] = useState<boolean>(true);
console.log('isActiveScroll', isActiveScroll);
    const numberSensor: number = route.params.numberSensor;

    const subTitle = SENSORS[numberSensor].subtitle.map(point => {
        return <Text style={styles.point} key={point.id}>✅ {point.text}</Text>
    });

    return (
        <ScrollView 
            ref={refScroll} 
            scrollEnabled={isActiveScroll} //: Add 
        >
            <View style={styles.main}>
                <Header/>
                <View style={styles.line} />
                <Text style={styles.textSensor} >{'Датчик №' + numberSensor}</Text>
                <Text style={styles.textSensor} >{'Тип : ' + SENSORS[numberSensor].type}</Text>
                <View style={styles.line} />
                <View style={styles.boxSubTitle} >
                    <Text style={styles.title} >{SENSORS[numberSensor].title}</Text>
                    {subTitle}
                </View>
            
                <Zoom source={SENSORS[numberSensor].img} refScroll={refScroll} setIsActiveScroll={setIsActiveScroll}/>
            </View>
        </ScrollView>
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
        padding: 10,
        marginBottom: 300 // !!! 
    },
    textSensor: {
        fontSize: 17,
        color: COLOR_ROOT.YELLOW,
        fontWeight: '600'
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