import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    ImageBackground,
    Dimensions,
} from 'react-native';
import { Button, Image, Text } from '@rneui/base';
import { COLOR_BACKGROUND_ANARANJADO, COLOR_BACKGROUND_CARD_WHITE, styleHome } from '../../styles/StyleGlobal';
import SplashScreen from '../splash/SplashScreen';
import { NAME_COMPANY, VERSION_APP } from '../../constantes/Constantes';

const HomeScreen = ({ navigation }) => {



    const ArrayBotones = [
        {
            id: 1,
            title: 'Iniciar Juego',
            onPress: () => navigation.navigate('NivelScreen'),
            icon: 'gamepad-variant',
        },
        {
            id: 2,
            title: 'Multijugador',
            onPress: () => navigation.navigate('PlayMultijugadorScreen'),
            icon: 'account-multiple',
        },
    ];


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../../assets/fondoPantalla.png')}
                style={{ flex: 1, resizeMode: 'cover' }}
            >
                <View style={{ padding: 15 }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image
                            source={require('../../assets/tic-tac-toe.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>



                    <View style={{
                        alignContent: 'center',
                        justifyContent: 'center',
                        height: Dimensions.get('window').height / 2,
                    }}>
                        {ArrayBotones.map((item, index) => (
                            <Button
                                key={index}
                                title={item.title}
                                titleStyle={styleHome.title}
                                buttonStyle={styleHome.containerNaranja}
                                containerStyle={{ borderRadius: 60, marginBottom: 10 }}
                                onPress={item.onPress}
                                icon={{
                                    name: item.icon,
                                    size: 24,
                                    color: 'white',
                                    type: 'material-community',
                                }}
                            />
                        ))}
                    </View>
                </View>

                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    padding: 10,
                }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{NAME_COMPANY}</Text>
                    <Text style={{
                        fontSize: 18,
                        color: 'gray',
                        marginTop: 5,
                        // fontWeight: 'bold'
                    }}>
                        Versión: {VERSION_APP}
                    </Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_BACKGROUND_ANARANJADO,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        tintColor: COLOR_BACKGROUND_CARD_WHITE,
        width: 120,
        height: 130,
    },
});
