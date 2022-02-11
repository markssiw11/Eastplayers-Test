import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import { ROUTE_NAME } from '../dataConfig';
import {goBack, RootStackParamList} from '../navigation/RootNavigation';

interface HeaderLeftI {
  routeName: string;
}
function HeaderLeft({routeName}: HeaderLeftI) {
  if (routeName === ROUTE_NAME.Home) return <View />;
  return (
    <TouchableOpacity
      hitSlop={{top: 5, right: 0, bottom: 0, left: 5}}
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
});
export default HeaderLeft;
