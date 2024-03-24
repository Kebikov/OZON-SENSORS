import { View, Text, StyleSheet, Image, TextInput, Vibration, Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TypeRootPage } from '@/navigation/navigation.types';
import { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import { useState } from 'react';



/**
 * @page Главная страница приложения.
 */
const Home: FC = () => {
    /**
     * Номера сенсоров которые есть в базе данных.
     */
    const diapason: {start: number, end: number} = {
        start: 1,
        end: 26
    }

    /**
     * @param isExisting Есть ли датчик в базе данных.
     */
    const [isExisting, setIsExisting] = useState<boolean>(true);
    /**
     * @param numberSensor Номер датчика.
     */
    const [numberSensor, setNumberSensor] = useState<number>(0);
    
    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>(); 

    /**
     * @function onChangeText 
     * - Проверяет, есть ли датчик в базе данных.
     * - Устанавливает состояние(useState) в зависимости от результата проверки.
     * @param {string} event Принимает обьект события.
     */
    const onChangeText = (event: string) => {
        const value: number = Number(event);
        if(value >= diapason.start && value <= diapason.end || event === '') {
            setIsExisting(true);
            setNumberSensor(value);
        } else {
            setIsExisting(false);
        }
    }


    /**
     * @function handlePush Переход на страницу 'Sensors'.
     */
    const handlePush = () => {
        Vibration.vibrate([1, 12, 10]);
        if(numberSensor && numberSensor >= diapason.start && numberSensor <= diapason.end) {
            navigate('Sensors', {numberSensor});
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
                disabled={!isExisting}
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
        alignItems: 'center',
        zIndex: 2
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
