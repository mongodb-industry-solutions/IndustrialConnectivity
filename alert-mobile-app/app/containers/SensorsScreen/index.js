/**
 *
 * SensorsScreen
 *
 */

import { setRealmConnection } from 'containers/HomeScreen/actions';
import { Box, Center, HStack, Image, Skeleton, Text, VStack } from 'native-base';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useLayoutEffect } from 'react';
import {
  Alert, BackHandler, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet,
  View
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getDate, getSensorImage, getStatus, getType, logoutUser } from '../../utils/helper';
import { logout } from 'containers/DetailsScreen/actions';
import { setLoading } from './actions';
let Calander = require('app/images/calendar.png');
let List = require('app/images/list.png');
let Loader = require('app/images/loader.png');
let Power = require('app/images/power.png');

export function SensorsScreen({
  navigation,
}) {
  const realmConnection = useSelector(state => state?.global?.realmConnection)
  const isLoading = useSelector(state => state?.global?.isLoading ?? true)
  const [sensors, setSensors] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoadingSensors, setIsLoadingSensors] = React.useState(isLoading);
  const dispatch = useDispatch();
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getSensorsFromRealm();
    setRefreshing(false);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#053333',
      },
      headerTitle: () => (
        <Text fontSize={18} fontWeight={700} color={'white'} >Alerts
        </Text>
      ),
      headerRight: () => (
        <Pressable onPress={async () => {
          dispatch(logout())
          logoutUser(navigation)
        }
        }>
          <Image
            alt='Img'
            size={6}
            marginRight={3}
            source={Power}
          />
        </Pressable>
      ),
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View />
      ),
    });
  }, []);

  async function getSensorsFromRealm() {
    setSensors([])
    setIsLoadingSensors(true);
    let sensors = realmConnection
      .objects("sensorData")
    setSensors(sensors);
    dispatch(setLoading(false))
    setIsLoadingSensors(false);
    dispatch(setRealmConnection(realmConnection));
  }

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

  const onRealmChange = async () => {
    await getSensorsFromRealm();
  }

  useEffect(async () => {
    realmConnection.addListener("change", onRealmChange);
    setSensors([])
    navigation.addListener('focus', async () => {
      await getSensorsFromRealm();
    });
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const onPressSensorFromList = (sensor) => {
    navigation.navigate('Details', { sensor })
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={1}
          />
        }
      >
        <View style={styles.container}>
          <View style={{ padding: 15 }}>
            {isLoadingSensors ? <Center w="100%">
              <VStack w="90%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                borderColor: "coolGray.300"
              }} _light={{
                borderColor: "coolGray.200"
              }}>
                <View />
                <Skeleton px="3" my="3" rounded="md" />
                <View />
                <Skeleton.Text px="4" />
                <Skeleton px="3" my="3" rounded="md" />
                <View />
                <Skeleton.Text px="4" />
                <Skeleton px="3" my="3" rounded="md" />
                <Skeleton.Text px="4" />
                <Skeleton px="3" my="3" rounded="md" />
              </VStack>

            </Center> : sensors?.map(item => (
              <Pressable onPress={() => onPressSensorFromList(item)}>
                <View>
                  <Box borderColor="coolGray.200" shadow={10} borderLeftColor={'gray.900'} borderRadius='14' borderRightWidth={3} borderBottomWidth={3} _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700"
                  }} _web={{
                    shadow: 2,
                    borderWidth: 0
                  }} _light={{
                    backgroundColor: "gray.50"
                  }}>
                    <Box style={{ padding: 4 }}
                      _dark={{
                        borderColor: "gray.600"
                      }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                      <HStack space={2} >
                        <Image alt='Img' borderRadius={10} height={132} width={145} source={{
                          uri: getSensorImage(item?.data)
                        }} />
                        <View />
                        <VStack paddingTop={1} justifyContent="space-between">
                          <HStack paddingBottom={2} space={5} justifyContent="flex-start">
                            <Image alt='Img' marginTop={1} size="29px" background={'white'} source={Calander} />
                            <VStack >
                              <Text fontWeight={400} _dark={{
                                color: "warmGray.50"
                              }} color="coolGray.800" >
                                {'Date'}
                              </Text>
                              <Text fontWeight={800} fontSize={15} color="black" bold _dark={{
                                color: "black"
                              }}>
                                {getDate(item?.ts)}
                              </Text>
                            </VStack>
                          </HStack>
                          <HStack paddingBottom={2} space={5} justifyContent="flex-start">
                            <Image alt='Img' marginTop={1} size="29px" background={'white'} source={List} />
                            <VStack>
                              <Text fontWeight={400} _dark={{
                                color: "warmGray.50"
                              }} color="coolGray.800" >
                                {'Type'}
                              </Text>
                              <Text fontWeight={800} fontSize={15} color="black" bold _dark={{
                                color: "black"
                              }}>
                                {getType(item?.code)}
                              </Text>
                            </VStack>
                          </HStack>
                          <HStack paddingBottom={2} space={5} justifyContent="flex-start">
                            <Image alt='Img' marginTop={1} size="29px" background={'white'} source={Loader} />
                            <VStack>
                              <Text fontWeight={400} _dark={{
                                color: "warmGray.50"
                              }} color="coolGray.800" >
                                {'Status'}
                              </Text>
                              <Text fontWeight={800} fontSize={15} color={item?.acknowledged ? 'green.700' : 'orange.400'} bold _dark={{
                                color: "black"
                              }}>
                                {getStatus(item?.acknowledged)}
                              </Text>
                            </VStack>
                          </HStack>
                        </VStack>
                      </HStack>
                    </Box>
                  </Box>
                  <Text></Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

SensorsScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  scrollView: {
    backgroundColor: '#F3F3F3',
  },
});

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(SensorsScreen);
