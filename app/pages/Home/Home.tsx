import { View, Text, StyleSheet, Image, TextInput, Button, Vibration, Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TypeRootPage } from '@/navigation/navigation.types';
import { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import { useState } from 'react';

/**
 * @component
 * @example
 * @returns {JSX.Element}
 */
const Home: FC = () => {

    const diapason: {start: number, end: number} = {
        start: 1,
        end: 1
    }

    const [isExisting, setIsExisting] = useState<boolean>(true);
    const [numberSensor, setNumberSensor] = useState<number>(0);

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>(); 

    const onChangeText = (event: string) => {
        const value: number = Number(event);
        if(value >= diapason.start && value <= diapason.end || event === '') {
            setIsExisting(true);
            setNumberSensor(value);
        } else {
            setIsExisting(false);
        }
    }

	return(
        <View style={styles.main} >
            <View style={styles.logoBox}>
                <Image style={styles.logo} source={require('@/source/img/1.png')} />
            </View>

            <TextInput 
                keyboardType='numeric' 
                style={styles.input}
                onChangeText={text => onChangeText(text)}
                placeholder='Введите номер датчика'
            />
            <Text style={styles.errorText}>{isExisting ? null : 'Нет такого датчика.'}</Text>
            <Pressable 
                style={styles.button} 
                onPress={() => {
                    Vibration.vibrate([1, 12, 10]);
                    if(numberSensor && numberSensor >= diapason.start && numberSensor <= diapason.end) {
                        navigate('Sensors', {numberSensor});
                    }
                }}
            >
                <Text style={styles.text} >запрос</Text>
            </Pressable>
            <View style={styles.fireBox}>
                <Image style={styles.fireImg} source={require('@/source/img/fire.jpg')}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: COLOR_ROOT.BLUE,
    },
    logoBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: 160
    },
    logo: {
        objectFit: 'cover',
        width: 300,
        height: 160
    },
    input: {
        backgroundColor: 'white',
        width: '80%',
        height: 50,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: COLOR_ROOT.PINK,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 7
    },
    button: {
        marginTop: 7,
        width: '80%',
        height: 50,
        borderRadius: 10,
        backgroundColor: COLOR_ROOT.PINK,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    fireBox: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: '45%',
        width: '100%',
        marginTop: 20
    },
    fireImg: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    },
    errorText: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center'
    }
});

export default Home;
