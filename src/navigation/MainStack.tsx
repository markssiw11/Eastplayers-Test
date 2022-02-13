// In App.js in a new project

import * as React from 'react';
import {StyleSheet} from 'react-native';
//
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
// screen
import Home from '../containers/home';
import ToDo from '../containers/todoScreen';
import Country from '../containers/countryScreen';
import ImageGallery from '../containers/imageGalleryScreen';
import ImageGalleryPreview from '../containers/imageGalleryScreen/Preview';

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
        screenOptions={({route}) => {
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
            headerLeft: _ => <HeaderLeft routeName={name} />,
          };
        }}>
        <Stack.Screen
          name={ROUTE_NAME.Home}
          component={Home}
          options={{...options, title: ROUTE_LABEL.Home}}
        />
        <Stack.Screen
          name={ROUTE_NAME.Todo}
          component={ToDo}
          options={{...options, title: ROUTE_LABEL.ToDo}}
        />
        <Stack.Screen
          name={ROUTE_NAME.Country}
          component={Country}
          options={{...options, title: ROUTE_LABEL.Country}}
        />
        <Stack.Screen
          name={ROUTE_NAME.ImageGallery}
          component={ImageGallery}
          options={{...options, title: ROUTE_LABEL.ImageGallery}}
        />
        <Stack.Screen
          name={ROUTE_NAME.ImageGalleryPreview}
          component={ImageGalleryPreview}
          options={{...options, title: ROUTE_LABEL.ImageGalleryPreview}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const options: NativeStackNavigationOptions = {
  headerShadowVisible: false,
};
const styles = StyleSheet.create({
  headerStyle: {
    fontSize: theme.fontSize.m,
    fontWeight: '800',
  },
});
export default App;
