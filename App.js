import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainStack from './src/navigation/MainStack';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}} >
      <MainStack />
    </GestureHandlerRootView>
  );
};

export default App;
