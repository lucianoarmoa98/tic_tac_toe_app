import React, { useEffect, useState } from 'react';
import { Platform,  View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// const adUnitIdAndroid = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2481334708720389~5286467453';
// const adUnitIdIOS = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2481334708720389~2598393237';

const adUnitIdAndroid = 'ca-app-pub-2481334708720389/4328945711';
const adUnitIdIOS = 'ca-app-pub-2481334708720389/6634764601';



const AdsPublicidad = () => {




    return (

        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
        }}>
            <BannerAd
                unitId={Platform.OS === 'ios' ? adUnitIdIOS : adUnitIdAndroid}
                // size={BannerAdSize.LARGE_BANNER}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: false,
                }}
                onAdLoaded={() => {
                    console.log('Advert loaded');
                }}
                onAdFailedToLoad={(error) => {
                    console.error('Advert failed to load: ', error);
                }}
            />
        </View>
    );
}
export default AdsPublicidad;