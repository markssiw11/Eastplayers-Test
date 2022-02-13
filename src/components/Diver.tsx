import React from 'react';
import {View, StyleSheet, ColorValue} from 'react-native';
import {theme} from 'utils/Theme';
interface DiverI {
  color?: ColorValue | undefined;
}
const Diver = ({color = theme.colors.border}: DiverI) => (
  <View style={[styles.diver, {backgroundColor: color}]} />
);

const styles = StyleSheet.create({
  diver: {
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.border,
  },
});
export default Diver;
