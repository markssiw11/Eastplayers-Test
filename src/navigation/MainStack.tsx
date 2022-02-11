// In App.js in a new project

import * as React from 'react';
import {StyleSheet} from 'react-native';
//
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationOptions} from '@react-navigation/native-stack';
//
import Home from '../containers/home';
import ToDo from '../containers/todoScreen';
//
import {navigationRef} from './RootNavigation';
//
import {theme} from '../utils/Theme';
import {ROUTE_LABEL, ROUTE_NAME} from '../dataConfig';
import HeaderLeft from '../components/HeaderLeft';

const Stack = createNativeStackNavigator();

function App() {
  const routeNameRef = React.useRef<any>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}>
      <Stack.Navigator
        screenOptions={({route, navigation}) => {
          const {name} = route;

          return {
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerStyle,
            headerMode: 'screen',
            headerTintColor: theme.colors.primary,
            headerTitle: ROUTE_LABEL[name],
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerLeft: (_) => <HeaderLeft routeName={name} />
          };
        }}>
        <Stack.Screen name={ROUTE_NAME.Home} component={Home} options={options} />
        <Stack.Screen name={ROUTE_NAME.Todo} component={ToDo} options={options} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
const options: NativeStackNavigationOptions = {
  headerShadowVisible: false
} 
const styles = StyleSheet.create({
  headerStyle: {
    fontSize: theme.fontSize.m,
    fontWeight: '800',
  }
})
export default App;
