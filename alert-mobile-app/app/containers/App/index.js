/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from '../DetailsScreen';
import HomeScreen from '../HomeScreen';
import SensorsScreen from '../SensorsScreen';
import SplashScreen from '../SplashScreen';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor='#053333' />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" options={{ headerShown: false }} component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Sensors" component={SensorsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>

  );
}
