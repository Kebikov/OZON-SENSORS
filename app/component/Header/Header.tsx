import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';

/**
 * @component
 * @example 
 * @returns {JSX.Element}
 */
const Header: FC = () => {

    const {goBack} = useNavigation();

    return (
        <Pressable 
            style={styles.main}
            onPress={() => goBack()}
        >
            <Image style={styles.img} source={require('@/source/img/arrow_back.png')} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    main: {
        height: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
        marginBottom: 20
    },
    img: {
        resizeMode: 'contain',
        width: 30,
        height: 30
    }
});

export default Header;