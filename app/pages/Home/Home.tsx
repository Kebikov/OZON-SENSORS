import { View, Text, StyleSheet, Image, TextInput, Button, Vibration, Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TypeRootPage } from '@/navigation/navigation.types';
import { FC, useCallback } from 'react';
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
        end: 4
    }

    const [isExisting, setIsExisting] = useState<boolean>(true);
    const [numberSensor, setNumberSensor] = useState<number>(0);
    console.log(numberSensor);
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

    const handlePush = () => {
        Vibration.vibrate([1, 12, 10]);
        if(numberSensor && numberSensor >= diapason.start && numberSensor <= diapason.end) {
            navigate('Sensors', {numberSensor});
            console.log('Run');
            setNumberSensor(0);
        }
    }

	return(
        <View style={styles.main} >
            <View style={styles.logoBox}>
                <Image style={styles.logo} source={require('@/source/img/1.png')} />
            </View>

            <TextInput 
                defaultValue={numberSensor ? String(numberSensor) : ''}
                keyboardType='numeric'
                style={styles.input}
                onChangeText={text => onChangeText(text)}
                placeholder='Введите номер датчика'
                onSubmitEditing={handlePush} 
            />
            
            <Pressable 
                style={isExisting ? styles.button : styles.buttonNot} 
                onPress={() => handlePush()}
            >
                <Text style={styles.text} >{isExisting ? 'запрос' : 'не найден'}</Text>
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
    buttonNot: {
        marginTop: 7,
        width: '80%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#ccc',
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
    }
});

export default Home;
