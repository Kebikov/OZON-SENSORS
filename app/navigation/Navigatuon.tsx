import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TypeRootPage } from './navigation.types';
import { COLOR_ROOT } from '@/data/colors';
import Home from '@/pages/Home/Home';
import Sensors from '@/pages/Sensors/Sensors';


const Stack = createNativeStackNavigator<TypeRootPage>();


const Navigatuon: FC = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: COLOR_ROOT.BLUE
                    }
                }}
            >
                <Stack.Screen name='Home' component={Home} key={'Home'} />
                <Stack.Screen name='Sensors' component={Sensors} key={'Sensors'} options={{animation: 'slide_from_right'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
};


export default Navigatuon;