import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Navigatuon from '@/navigation/Navigatuon';
import { FC } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App: FC = () => {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaProvider>
                <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} >
                    <StatusBar style='light' backgroundColor='#095dfa' />
                    <Navigatuon/>
                </SafeAreaView>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

export default App;


