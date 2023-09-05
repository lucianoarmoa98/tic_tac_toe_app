import React, { useEffect, useRef, useState } from "react";
import { Modal, Text, View } from "react-native";
import { COLOR_BACKGROUND_ROJO, COLOR_BACKGROUND_VERDE, COLOR_BACKGROUND_VERDER_AGUA, COLOR_WARNING, TEXT_BLACK, stylesModal } from "../styles/StyleGlobal";
import { Icon, Image } from "@rneui/base";
import XImage from '../assets/cruzar.png';
import OImage from '../assets/letra-o.png';
import WinnerJson from '../assets/winnerjson.json';
import Fire from '../assets/fire.json';
import animationWinner from '../assets/gato.json';
import LottieView from 'lottie-react-native';


const MessageModalSolo = ({ message, status }) => {


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={status}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{ backgroundColor: '#f8f8f8' }}>

                    {message !== null ?
                        <View style={{ padding: 10 }}>
                            {message === 'X' ?
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
                                :
                                <LottieView
                                    source={Fire}
                                    autoPlay
                                    loop
                                    style={{
                                        width: 300,
                                        height: 300,
                                        alignSelf: 'center',
                                    }}
                                />
                            }

                            <View style={{
                                width: '100%',
                                justifyContent: 'center',
                            }}>
                                {message === 'X' ?
                                    <View>
                                        <Text style={{ fontSize: 25, textAlign: 'center', color: TEXT_BLACK, }}>
                                            ¡Felicidades! Has ganado
                                        </Text>
                                    </View>
                                    : <View>
                                        <Text style={{ fontSize: 25, textAlign: 'center', color: TEXT_BLACK, }}>
                                            Lo sentimos, has perdido
                                        </Text>
                                    </View>
                                }
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

export default MessageModalSolo;