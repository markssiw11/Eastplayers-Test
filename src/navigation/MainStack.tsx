// In App.js in a new project

import * as React from 'react';
import {StyleSheet} from 'react-native';
//
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
// screen
import Home from 'containers/home';
import ToDo from 'containers/todoScreen';
import Country from 'containers/countryScreen';
import ImageGallery from 'containers/imageGalleryScreen';
import ImageGalleryPreview from 'containers/imageGalleryScreen/Preview';

//
import {navigationRef, RootStackParamList} from './RootNavigation';
//
import {theme} from 'utils/Theme';
import {ROUTE_LABEL, ROUTE_NAME} from 'dataConfig';
import HeaderLeft from 'components/HeaderLeft';

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
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerLeft: _ => <HeaderLeft routeName={name} />,
          };
        }}>
        <Stack.Screen
          name={ROUTE_NAME.Home}
          component={Home}
          options={getOptions}
        />
        <Stack.Screen
          name={ROUTE_NAME.Todo}
          component={ToDo}
          options={getOptions}
        />
        <Stack.Screen
          name={ROUTE_NAME.Country}
          component={Country}
          options={getOptions}
        />
        <Stack.Screen
          name={ROUTE_NAME.ImageGallery}
          component={ImageGallery}
          options={getOptions}
        />
        <Stack.Screen
          name={ROUTE_NAME.ImageGalleryPreview}
          component={ImageGalleryPreview}
          options={getOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const getOptions = ({
  route,
}: {
  route: RouteProp<ParamListBase, keyof RootStackParamList>;
}) => {
  const {name} = route;

  return {
    headerShadowVisible: false,
    title: ROUTE_LABEL[name],
  };
};

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: theme.fontSize.m,
    fontWeight: '800',
  },
});
export default App;
