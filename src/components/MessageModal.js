import React, { useEffect, useRef, useState } from "react";
import { Modal, Text, View } from "react-native";
import { COLOR_BACKGROUND_ROJO, COLOR_BACKGROUND_VERDE, COLOR_BACKGROUND_VERDER_AGUA, COLOR_WARNING, TEXT_BLACK, stylesModal } from "../styles/StyleGlobal";
import { Icon, Image } from "@rneui/base";
import XImage from '../assets/cruzar.png';
import OImage from '../assets/letra-o.png';
import WinnerJson from '../assets/winnerjson.json';
import animationWinner from '../assets/gato.json';
import LottieView from 'lottie-react-native';


const MessageModal = ({ message, status }) => {


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={status}
        >
            <View style={stylesModal.centeredView}>
                <View style={[stylesModal.contentModalTextProduct, { backgroundColor: '#f0f0f0' }]}>

                    {message !== null ?
                        <View style={{ padding: 10 }}>
                            <LottieView
                                source={WinnerJson}
                                autoPlay
                                loop
                                style={{
                                    width: 300,
                                    height: 300,
                                    alignSelf: 'center',
                                }}
                            />
                            <View style={{
                                width: '100%',
                                justifyContent: 'center',
                            }}>
                                <Text style={{ fontSize: 25, textAlign: 'center', color: TEXT_BLACK, }}>
                                    Ganador de la partida:
                                </Text>

                                <View style={{ alignItems: 'center' }}>
                                    {message === 'X' ?
                                        <Image source={XImage} style={{ width: 35, height: 35, padding: 5, tintColor: COLOR_BACKGROUND_VERDER_AGUA }} />
                                        : <Image source={OImage} style={{ width: 35, height: 35, padding: 5, tintColor: COLOR_BACKGROUND_VERDER_AGUA }} />
                                    }
                                </View>
                            </View>
                        </View>
                        :
                        <View style={{ padding: 10 }}>
                            <LottieView
                                source={animationWinner}
                                autoPlay
                                loop
                                style={{
                                    width: 300,
                                    height: 300,
                                    alignSelf: 'center',
                                }}
                            />
                            <View style={{
                                width: '100%',
                                justifyContent: 'center',
                            }}>
                                <Text style={{ fontSize: 25, textAlign: 'center', color: TEXT_BLACK, }}>
                                    ¡Empate! La próxima será mas emocionante...
                                </Text>
                            </View>
                        </View>
                    }
                </View>
            </View>
        </Modal>

    );
};

export default MessageModal;