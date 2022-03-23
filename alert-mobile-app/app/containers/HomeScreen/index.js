/**
 *
 * HomeScreen
 *
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, Button, Center, FormControl, Heading, HStack, Image, Input, Text, VStack } from 'native-base';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useLayoutEffect, useRef } from 'react';
import { Alert, BackHandler, Pressable, ScrollView, View } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getAndSetFCMToken } from 'utils/firebase';
import { validateEmail } from 'utils/helper';
import { getRealm, loginUser } from 'utils/realm';
import { setRealmConnection, setRealmUserEmail } from './actions';
import styles from './styles';

let PMongo = require('app/images/pmongo.png');
let LoginHeader = require('app/images/loginheader.png');
let Wekan = require('app/images/wekan.png');
let Eye = require('app/images/eye.png');
let Eyex = require('app/images/eyex.png');

export function HomeScreen({ navigation }) {

  const dispatch = useDispatch();
  const [formData, setData] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = React.useState(true);
  const [errors, setErrors] = React.useState({
    err: null
  });
  const passwordInputRef = useRef();
  const backAction = () => {
    Alert.alert("Hang on!", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };
  useEffect(() => {
    async function checkLoggedIn() {
      let userEmail = await AsyncStorage.getItem('userEmail')
      if (userEmail != null) {
        navigation.navigate('Sensors');
      } else {
        navigation.navigate('Home');
      }
    }
    checkLoggedIn()
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };

  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#032b2b',
      },
      headerTitle: () => (
        <Text fontSize={18} fontWeight={700} color={'white'} >
        </Text>
      ),
      headerRight: () => (
        <View />
      ),
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View />
      ),
    });
  }, []);

  const onSubmitLogin = async () => {
    try {
      setIsLoggingIn(true);
      let fcmToken = await getAndSetFCMToken();
      let user = await loginUser(formData?.email, formData?.password, 'master', fcmToken)
      const realm = await getRealm(user, 'master');
      setData({});
      dispatch(setRealmConnection(realm));
      dispatch(setRealmUserEmail(formData?.email));
      await AsyncStorage.setItem('userEmail', formData?.email)
      await AsyncStorage.setItem('userId', user?.id)
      setIsLoggingIn(false);
      navigation.navigate('Sensors');
    } catch (error) {
      console.log('error: ', error);
      setData({})
      setIsLoggingIn(false)
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={{ flex: 1 }}>
          <View>
            <Image alt='Img' style={{ flex: 1, height: 200 }}
              source={LoginHeader}
            />
          </View>
          <Image alt='Img' style={styles.close} source={Wekan} />
          <View style={{ paddingTop: 20 }} />
          <View style={styles.body}>
            <Center w="100%">
              <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" fontSize={35} fontWeight="600" color="black" _dark={{
                  color: "warmGray.50"
                }}>
                  Welcome,
                </Heading>
                <Heading size="lg" fontSize={30} fontWeight="600" color="black" mt="1" _dark={{
                  color: "warmGray.200"
                }}>
                  Login Now.
                </Heading>
                <InputScrollView>

                  <VStack space={3} mt="5">
                    <FormControl isRequired isInvalid={'emailError' in errors}>
                      <Input
                        size="lg"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordInputRef.current.focus()}
                        value={formData.email}
                        h={12}
                        placeholder="Email" onChangeText={value => {
                          setData({
                            ...formData,
                            email: value
                          })
                          if (!validateEmail(value)) {
                            setIsLoginButtonDisabled(true);
                            setErrors({
                              ...errors,
                              emailError: 'Email id is invalid.'
                            });
                          } else {
                            if (formData?.password?.length < 3) {
                              setIsLoginButtonDisabled(true);
                            } else {
                              setIsLoginButtonDisabled(false);
                            }
                            setErrors({});
                          }
                        }
                        } />
                      {'emailError' in errors && <FormControl.ErrorMessage>{errors?.emailError}</FormControl.ErrorMessage>}
                    </FormControl>
                    <FormControl isRequired isInvalid={'passwordError' in errors}>
                      <Input
                        ref={passwordInputRef}
                        size="lg"
                        value={formData.password}
                        InputRightElement={
                          <Pressable onPress={() => setShowPassword(!showPassword)} ><Image alt='img' marginRight={3} paddingLeft={3} size={7} source={showPassword ? Eyex : Eye} /></Pressable>}
                        h={12}
                        placeholder="Password" onChangeText={value => {
                          setData({
                            ...formData,
                            password: value
                          })
                          if (value.length < 3) {
                            setIsLoginButtonDisabled(true);
                            setErrors({
                              ...errors,
                              passwordError: 'Password is too short'
                            });
                          } else {
                            if (validateEmail(formData?.email)) {
                              setIsLoginButtonDisabled(false);
                            } else {
                              setIsLoginButtonDisabled(true);
                            }
                            setErrors({})
                          }
                        }}
                        type={showPassword ? 'text' : 'password'} />
                      {'passwordError' in errors && <FormControl.ErrorMessage>{errors?.passwordError}</FormControl.ErrorMessage>}
                    </FormControl>
                    <View />
                    <Button _spinner={{
                      color: "black"
                    }} _loading={{
                      bg: "amber.400:alpha.70",
                      _text: {
                        color: "black",
                        fontSize: 19,
                        fontWeight: 600
                      }
                    }}
                      isDisabled={isLoginButtonDisabled}
                      isLoadingText="Logging In" isLoading={isLoggingIn} h={50} onPress={onSubmitLogin} color={'black'} backgroundColor={'green.500'} borderColor={'black.500'} variant="outline">
                      <Text fontSize={19} fontWeight={600} >Login</Text>
                    </Button>
                  </VStack>
                </InputScrollView>
              </Box>
            </Center>
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingBottom: 10, textAlign: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <HStack justifyContent="center">
          <Center>
            <Text style={{ color: '#041624' }} >Powered by</Text>
          </Center>
          <Center paddingBottom={1}>
            <Image style={{ marginBottom: 0 }} alt='Img' height={6} width={100} source={PMongo} />
          </Center>
        </HStack>
      </View>
    </View>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
});


export function mapDispatchToProps(dispatch) {
  return {};
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(HomeScreen);
