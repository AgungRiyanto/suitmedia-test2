/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {SafeAreaView, StatusBar, View, Text} from 'react-native';
import Routing from './Router';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <Routing />
    </SafeAreaView>
  );
};

export default App;

console.disableYellowBox = true;
