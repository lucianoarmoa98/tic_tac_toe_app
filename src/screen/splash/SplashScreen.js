import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Image } from '@rneui/base';
import { COLOR_BACKGROUND_ANARANJADO, COLOR_BACKGROUND_CARD_WHITE } from '../../styles/StyleGlobal';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('HomeScreen');
    }, 2000);
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}> 
        <Image
          source={require('../../assets/tic-tac-toe.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default SplashScreen;

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
    width: 250,
    height: 250,
  },
});
