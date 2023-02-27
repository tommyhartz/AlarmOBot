/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './RootStackParams';

import List from './List';
import Video from './Video';

import 'react-native-gesture-handler';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Videos" component={List} />
        <Stack.Screen name="Watch" component={Video} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
