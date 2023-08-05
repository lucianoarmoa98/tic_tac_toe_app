import React, { useState } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import { COLOR_BACKGROUND_ANARANJADO, COLOR_BACKGROUND_CARD_WHITE } from '../../styles/StyleGlobal';

const PlayJuegoScreen = ({ navigation }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState('X');

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return null;
    };

    const handleClick = (index) => {
        if (board[index] || checkWinner()) {
            return;
        }

        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);

        setPlayer(player === 'X' ? 'O' : 'X');
    };

    const handleRestart = () => {
        setBoard(Array(9).fill(null));
        setPlayer('X');
    };

    const renderSquare = (index) => (
        <TouchableOpacity style={styles.square} onPress={() => handleClick(index)}>
            <Text style={styles.squareText}>{board[index]}</Text>
        </TouchableOpacity>
    );

    const renderStatus = () => {
        const winner = checkWinner();
        if (winner) {
            return (
                <Text style={styles.status}>Ganador: {winner}</Text>
            );
        } else if (!board.includes(null)) {
            return (
                <Text style={styles.status}>Empate</Text>
            );
        } else {
            return (
                <Text style={styles.status}>Jugador actual: {player}</Text>
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../../assets/fondoPantalla.png')}
                style={{ flex: 1, resizeMode: 'cover' }}
                imageStyle={{ opacity: 0.5 }}
            >
                <View style={{ padding: 15 }}>
                    <View style={styles.board}>
                        <View style={styles.row}>
                            {renderSquare(0)}
                            {renderSquare(1)}
                            {renderSquare(2)}
                        </View>
                        <View style={styles.row}>
                            {renderSquare(3)}
                            {renderSquare(4)}
                            {renderSquare(5)}
                        </View>
                        <View style={styles.row}>
                            {renderSquare(6)}
                            {renderSquare(7)}
                            {renderSquare(8)}
                        </View>
                    </View>
                    {renderStatus()}
                    <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
                        <Text style={styles.restartButtonText}>Reiniciar</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_BACKGROUND_ANARANJADO,
    },
    board: {
        marginVertical: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    square: {
        borderWidth: 2,
        borderColor: COLOR_BACKGROUND_CARD_WHITE,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    squareText: {
        fontSize: 36,
        color: COLOR_BACKGROUND_CARD_WHITE,
    },
    status: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLOR_BACKGROUND_CARD_WHITE,
    },
    restartButton: {
        backgroundColor: COLOR_BACKGROUND_CARD_WHITE,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
    },
    restartButtonText: {
        color: COLOR_BACKGROUND_ANARANJADO,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PlayJuegoScreen;
