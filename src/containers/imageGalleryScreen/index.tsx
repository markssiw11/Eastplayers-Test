import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  ImageSourcePropType,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {IMAGE_GALLERY_DATA, ROUTE_NAME} from '../../dataConfig';
import { navigate } from '../../navigation/RootNavigation';
import {theme} from '../../utils/Theme';
const {width, height} = Dimensions.get('screen');
 interface ItemI {
    id: string;
    image: ImageSourcePropType;
  }
function ImageGalleryScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(_, index) => `${index}`}
        data={IMAGE_GALLERY_DATA}
        renderItem={RenderItem}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const RenderItem = ({item}: {item: ItemI}) => {
  const {image} = item;
  const onPress= () => {
      navigate(ROUTE_NAME.ImageGalleryPreview, item);
  }
  return (
    <TouchableOpacity style={styles.imageContainer} onPress={onPress} >
      <Image resizeMode="cover" source={image} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    height: width / 3,
    width: width/3
  },
});

export default ImageGalleryScreen;
