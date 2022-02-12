import React from 'react';
import {ActivityIndicator} from 'react-native';
import {theme} from '../utils/Theme';

const LoadingBar = () => {
  return <ActivityIndicator size="small" color={theme.colors.secondary} />;
};

export default LoadingBar;
