import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Navigatuon from '@/navigation/Navigatuon';
import { FC, useState, useEffect, useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const App: FC = () => {

    const [appIsReady, setAppIsReady] = useState(false);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);



    useEffect(() => {
        async function prepare() {
            try {
                await new Promise(resolve => setTimeout(resolve, 100));
                setAppIsReady(true);
            } catch (e) {
                console.warn(e);
            }
        }
        prepare();
    }, []);


    if (!appIsReady) {
        return null;
    }


    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaProvider>
                <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}  onLayout={onLayoutRootView} >
                    <StatusBar style='light' backgroundColor='#095dfa' />
                    <Navigatuon/>
                </SafeAreaView>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

export default App;


