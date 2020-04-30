import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import FirstScreen from './src/ui/screens/FirstScreen';
import SecondScreen from './src/ui/screens/SecondScreen';
import ThirdScreen from './src/ui/screens/ThirdScreen';
const Root = () => (
  <Router>
    <Stack key="root">
      <Scene
        initial
        hideNavBar
        key="first"
        component={FirstScreen}
        title="first"
      />
      <Scene hideNavBar key="second" component={SecondScreen} title="second" />
      <Scene hideNavBar key="third" component={ThirdScreen} title="third" />
    </Stack>
  </Router>
);

export default Root;
