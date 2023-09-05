import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import { COLOR_BACKGROUND_ANARANJADO, COLOR_BACKGROUND_ANARANJADO_CLARO, COLOR_BACKGROUND_CARD_WHITE, TEXT_BLACK } from '../../../styles/StyleGlobal';
import { Button } from '@rneui/base';
import XImage from '../../../assets/cruzar.png';
import OImage from '../../../assets/letra-o.png';
import AdsPublicidad from '../../AdsAdMob/AdsPublicidad';
import MessageModalSolo from '../../../components/MessageModalSolo';

const playerX = {
    name: 'X',
    image: XImage,
};

const playerO = {
    name: 'O',
    image: OImage,
};


const PlayMedioScreen = ({ navigation }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState('X');
    const [statusModal, setStatusModal] = useState(false);
    const [messageModal, setMessageModal] = useState("");
    const [counterGame, setCounterGame] = useState({
        playerX: 0,
        playerO: 0,
    })

    useEffect(() => {
        hanldeResult();
    }, [board]);

    useEffect(() => {
        if(statusModal){
            setTimeout(() => {
                setStatusModal(false);
            }, 2000);
        }
    }, [statusModal]);


    useEffect(() => {
        if (player === 'O') {
            makeAIMoveMedium();
        }
    }, [player]);

    const makeAIMoveMedium = () => {
        const emptySquares = board.reduce((acc, currentValue, index) => {
            if (currentValue === null) {
                acc.push(index);
            }
            return acc;
        }, []);

        if (emptySquares.length > 0) {
            let bestScore = -Infinity;
            let bestMove = null;

            emptySquares.forEach(move => {
                const newBoard = [...board];
                newBoard[move] = playerO.name;
                const score = minimaxAlphaBeta(newBoard, playerX.name, -Infinity, Infinity, 0);

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            });

            handleClick(bestMove);
        }
    };

    const dynamicEvaluation = (board, currentPlayer) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
    
        const playerLines = [];
        const opponentLines = [];
    
        // Evalúa cada patrón de victoria para el jugador actual y el oponente
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
    
            const line = [board[a], board[b], board[c]];
    
            // Cuenta las líneas ganadoras para el jugador actual y el oponente
            const playerCount = line.filter(cell => cell === currentPlayer).length;
            const opponentCount = line.filter(cell => cell === playerX.name).length;
    
            if (playerCount === 2 && line.includes(null)) {
                playerLines.push(line);
            }
    
            if (opponentCount === 2 && line.includes(null)) {
                opponentLines.push(line);
            }
        }
    
        let evaluation = 0;
    
        // Evalúa la cantidad de movimientos ganadores posibles
        evaluation += playerLines.length * 5;
        evaluation -= opponentLines.length * 5;
    
        // Evalúa las casillas centrales para obtener una posición ventajosa
        if (board[4] === currentPlayer) {
            evaluation += 2;
        } else if (board[4] === playerX.name) {
            evaluation -= 2;
        }
    
        // Evalúa las esquinas para bloquear al oponente y para tener oportunidades de ganar
        const cornerIndices = [0, 2, 6, 8];
        const currentPlayerCorners = cornerIndices.filter(index => board[index] === currentPlayer).length;
        const opponentCorners = cornerIndices.filter(index => board[index] === playerX.name).length;
    
        evaluation += currentPlayerCorners * 3;
        evaluation -= opponentCorners * 3;
    
        return evaluation;
    };
    

    const minimaxAlphaBeta = (currentBoard, currentPlayer, alpha, beta, depth) => {
        const availableMoves = currentBoard
            .map((value, index) => (value === null ? index : null))
            .filter(index => index !== null);

        if (checkWinner(currentBoard, playerX.name)) {
            return -1;
        } else if (checkWinner(currentBoard, playerO.name)) {
            return 1;
        } else if (availableMoves.length === 0 || depth >= 3) { // Ajusta la profundidad máxima de búsqueda
            return dynamicEvaluation(currentBoard, playerO.name); // Utiliza tu función de evaluación heurística
        }

        if (currentPlayer === playerO.name) {
            let maxScore = -Infinity;

            availableMoves.forEach(move => {
                const newBoard = [...currentBoard];
                newBoard[move] = currentPlayer;
                const score = minimaxAlphaBeta(newBoard, playerX.name, alpha, beta, depth + 1);
                maxScore = Math.max(maxScore, score);
                alpha = Math.max(alpha, maxScore);
                if (beta <= alpha) {
                    return maxScore;
                }
            });

            return maxScore;
        } else {
            let minScore = Infinity;

            availableMoves.forEach(move => {
                const newBoard = [...currentBoard];
                newBoard[move] = currentPlayer;
                const score = minimaxAlphaBeta(newBoard, playerO.name, alpha, beta, depth + 1);
                minScore = Math.min(minScore, score);
                beta = Math.min(beta, minScore);
                if (beta <= alpha) {
                    return minScore;
                }
            });

            return minScore;
        }
    };

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                console.log("Ganador: ", board[a]);
                return board[a];
            }
        }

        return null;
    };

    const hanldeResult = () => {
        const winner = checkWinner();
        if (winner) {
            if (winner === 'X') {
            setStatusModal(true);
            setMessageModal("X");
                setCounterGame({
                    ...counterGame,
                    playerX: counterGame.playerX + 1,
                });
            } else {
                setStatusModal(true);
                setMessageModal("O");
                setCounterGame({
                    ...counterGame,
                    playerO: counterGame.playerO + 1,
                });
            }
        } else if (!board.includes(null)) {
            setStatusModal(true);
            setMessageModal(null);
        }
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

    const makeAIMove = () => {
        const emptySquares = board.reduce((acc, currentValue, index) => {
            if (currentValue === null) {
                acc.push(index);
            }
            return acc;
        }, []);

        if (emptySquares.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptySquares.length);
            const aiMove = emptySquares[randomIndex];
            handleClick(aiMove);
        }
    };

    const renderSquare = (index) => {
        const rowIndex = Math.floor(index / 3);
        const colIndex = index % 3;
        const borderTopWidth = rowIndex === 0 ? 0 : 1;
        const borderLeftWidth = colIndex === 0 ? 0 : 1;
        const borderBottomWidth = rowIndex === 2 ? 0 : 1;
        const borderRightWidth = colIndex === 2 ? 0 : 1;


        const squareStyle = {
            borderWidth: 1,
            borderTopWidth,
            borderLeftWidth,
            borderBottomWidth,
            borderRightWidth,
            borderColor: TEXT_BLACK,
            width: 100,
            height: 100,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
        };

        console.log("index: ", board[index]);

        return (
            <TouchableOpacity style={squareStyle} onPress={() => handleClick(index)}>
                {board[index] === playerX.name && <Image source={playerX.image} style={{ width: 50, height: 50, tintColor: TEXT_BLACK }} />}
                {board[index] === playerO.name && <Image source={playerO.image} style={{ width: 50, height: 50, tintColor: TEXT_BLACK }} />}
            </TouchableOpacity>
        );
    };

    const renderStatus = () => {
        const winner = checkWinner();
        if (winner) {
            return (
                <View style={styles.viewStatus}>
                    <Text style={styles.statusActual}>Ganador: </Text>
                    <Image source={winner === 'X' ? playerX.image : playerO.image} style={{ width: 30, height: 30, tintColor: 'white' }} />
                </View>
            );
        } else if (!board.includes(null)) {
            return (
                <View style={styles.viewStatus}>
                    <Text style={styles.statusActual}>Empate</Text>
                </View>
            );
        } else {
            return (
                <View>
                    {player === 'X' ?
                        <View style={styles.viewStatus}>
                            <Text style={styles.statusActual}>Jugador actual: </Text>
                            <Image source={playerX.image} style={{ width: 30, height: 30, tintColor: 'white' }} />
                        </View>
                        :
                        <View style={styles.viewStatus}>
                            <Text style={styles.statusActual}>Jugador actual: </Text>
                            <Image source={playerO.image} style={{ width: 30, height: 30, tintColor: 'white' }} />
                        </View>
                    }
                </View>
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../../../assets/fondoPantalla.png')}
                style={{ flex: 1, resizeMode: 'cover' }}
                // imageStyle={{ opacity: 0.5 }}
            >
                <View style={{ padding: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{
                            flexDirection: 'row',
                            padding: 10,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={XImage} style={{ width: 35, height: 35, tintColor: TEXT_BLACK }} />
                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: TEXT_BLACK }}> : {counterGame.playerX}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            padding: 10,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={OImage} style={{ width: 35, height: 35, tintColor: TEXT_BLACK }} />
                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: TEXT_BLACK }}> : {counterGame.playerO}</Text>
                        </View>
                    </View>


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

                    <View style={styles.restartButton}>
                        <Button
                            title="Reiniciar"
                            onPress={handleRestart}
                            buttonStyle={styles.restartButtonStyle}
                        />
                    </View>
                </View>

                <MessageModalSolo message={messageModal} status={statusModal} />
                <AdsPublicidad />
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
    viewStatus: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.5)',
        opacity: 0.8,
        height: 50,
    },
    status: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLOR_BACKGROUND_CARD_WHITE,
    },
    statusActual: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    restartButton: {
        // alignSelf: 'center',
        marginTop: 20,
    },
    restartButtonStyle: {
        borderRadius: 10,
        height: 50,
        backgroundColor: COLOR_BACKGROUND_ANARANJADO_CLARO,
    },
});
export default PlayMedioScreen;
