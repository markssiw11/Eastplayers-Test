import React from 'react';
import {
  Modal,
  View,
  Dimensions,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {IImageInfo} from 'react-native-image-zoom-viewer/built/image-viewer.type';
const {width, height} = Dimensions.get('window');

interface ImageModalViewI {
  visible: boolean;
  image: ImageSourcePropType;
  onClose: () => void;
}
const ImageModalView = ({visible, image, onClose}: ImageModalViewI) => {
  const imageUrls: IImageInfo[] = [
    {
      props: {
        source: image,
      },
      url: '',
      width,
      height: width,
    },
  ];
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <ImageViewer
          enableSwipeDown
          imageUrls={imageUrls}
          onSwipeDown={onClose}
          enableImageZoom={true}
          onClick={onClose}
          style={styles.image}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  image: {
    width,
    height,
  },
});

export default ImageModalView;
