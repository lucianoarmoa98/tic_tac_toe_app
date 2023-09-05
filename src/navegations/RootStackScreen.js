import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screen/splash/SplashScreen';
import HomeScreen from '../screen/home/HomeScreen';
import PlayMultijugadorScreen from '../screen/playMultijugador/PlayMultijugadorScreen';
import PlayLevelsScreen from '../screen/playJuego/PlayLevelsScreen';
import PlayJuegoScreen from '../screen/playJuego/facil/PlayJuegoScreen';
import PlayMedioScreen from '../screen/playJuego/medio/PlayMedioScreen';
import PlayDificilScreen from '../screen/playJuego/dificil/PlayDificilScreen';

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
            name="NivelScreen"
            component={PlayLevelsScreen}
            options={{
                headerShown: true,
                title: 'Niveles',
                //alineacion del titulo en android
                headerTitleAlign: 'center',
            }}
        />
        <RootStack.Screen
            name="PlayJuegoScreen"
            component={PlayJuegoScreen}
            options={{
                headerShown: true,
                title: 'Juego Fácil',
                //alineacion del titulo en android
                headerTitleAlign: 'center',
            }}
        />
        <RootStack.Screen
            name="PlayMedioScreen"
            component={PlayMedioScreen}
            options={{
                headerShown: true,
                title: 'Juego Medio',
                //alineacion del titulo en android
                headerTitleAlign: 'center',
            }}
        />
        <RootStack.Screen
            name="PlayDificilScreen"
            component={PlayDificilScreen}
            options={{
                headerShown: true,
                title: 'Juego Difícil',
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
