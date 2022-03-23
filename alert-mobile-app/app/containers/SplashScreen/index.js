/**
 *
 * SplashScreen
 *
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { setRealmConnection } from 'containers/HomeScreen/actions';
import React, { memo, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getAndSetFCMToken, firebaseMessageHandler } from 'utils/firebase';
import { getRealm, loginUser } from 'utils/realm';

let Splash = require('app/images/splash.png');

export function SplashScreen({
  navigation,
}) {
  const dispatch = useDispatch();

  useEffect(async () => {
    let fcmToken = await getAndSetFCMToken();
    let userEmail = await AsyncStorage.getItem('userEmail')
    firebaseMessageHandler(userEmail);
    if (userEmail != null && fcmToken != null) {
      const user = await loginUser(userEmail, '', 'master', fcmToken)
      const realm = await getRealm(user, 'master');
      dispatch(setRealmConnection(realm));
      navigation.navigate('Sensors')
    } else {
      setTimeout(async () => {
        navigation.navigate('Home')
      }, 3000)
    }
  }, []);

  return (
    <ImageBackground source={Splash} style={{ width: '100%', height: '100%' }}>
    </ImageBackground>
  );
}

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(SplashScreen);
