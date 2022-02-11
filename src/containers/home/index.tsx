import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {HomeDataItemI, HOME_CIRCLE_SIZE, HOME_DATA} from '../../dataConfig';
import {theme} from '../../utils/Theme';
const ChevronRightImage = require('../../assets/images/chevron-right.png');

function Home() {
  return (
    <View style={styles.container}>
      <FlatList
        data={HOME_DATA}
        keyExtractor={item => item.id}
        renderItem={RenderItem}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
}
const RenderItem = ({item}: {item: HomeDataItemI}) => {
  const {id, label, onPress} = item;
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.circle}>
        <Text style={styles.circleText}>{id}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
      <Image
        resizeMode="cover"
        source={ChevronRightImage}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainerStyle: {
    marginTop: theme.spacing.m,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.s,
    marginBottom: 20,
    marginHorizontal: 16,
    ...theme.shadow,
  },
  circle: {
    width: HOME_CIRCLE_SIZE,
    height: HOME_CIRCLE_SIZE,
    borderRadius: HOME_CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.buttonSurface,
    margin: 12,
  },
  circleText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.m,
    fontWeight: '700',
  },
  label: {
    fontSize: theme.fontSize.m,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    flex: 1,
  },
  icon: {
    width: 6,
    height: 12,
    marginHorizontal: theme.spacing.s,
  },
});

export default Home;
