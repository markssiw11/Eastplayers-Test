import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import { ROUTE_NAME } from 'dataConfig';
import {goBack} from 'navigation/RootNavigation';

interface HeaderLeftI {
  routeName: string;
}
function HeaderLeft({routeName}: HeaderLeftI) {
  if (routeName === ROUTE_NAME.Home) return <View />;
  return (
    <TouchableOpacity
      hitSlop={{top: 5, right: 5, bottom: 5, left: 5}}
      style={styles.container}
      onPress={goBack}>
      <Image
        resizeMode="cover"
        source={require('../assets/images/chevron-left.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 10,
    height: 18,
  },
  container: {
    paddingRight: 10
  }
});
export default HeaderLeft;
