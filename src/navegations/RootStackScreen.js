import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screen/splash/SplashScreen';
import HomeScreen from '../screen/home/HomeScreen';
import PlayJuegoScreen from '../screen/playJuego/PlayJuegoScreen';
import PlayMultijugadorScreen from '../screen/playMultijugador/PlayMultijugadorScreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => (
    <RootStack.Navigator initialRouteName="SplashScreen">
        <RootStack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
                headerShown: false,
                title: '',
                //alineacion del titulo en android
                headerTitleAlign: 'center',
            }}
        />
        <RootStack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
                headerShown: true,
                title: 'Bienvenido',
                //alineacion del titulo en android
                headerTitleAlign: 'center',
            }}
        />
        <RootStack.Screen
            name="PlayJuegoScreen"
            component={PlayJuegoScreen}
            options={{
                headerShown: true,
                title: 'Juego',
                //alineacion del titulo en android
                headerTitleAlign: 'center',
            }}
        />
        <RootStack.Screen
            name="PlayMultijugadorScreen"
            component={PlayMultijugadorScreen}
            options={{
                headerShown: true,
                title: 'Play Multijugador',
                //alineacion del titulo en android
                headerTitleAlign: 'center',
            }}
        />
    </RootStack.Navigator>
);

export default RootStackScreen;
