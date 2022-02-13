import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  PinchGestureHandler,
  HandlerStateChangeEvent,
  PinchGestureHandlerEventPayload,
  State,
  TouchableWithoutFeedback,
  GestureDetector
} from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  ImageGalleryItemI,
  IMAGE_GALLERY_DATA,
  ROUTE_NAME,
} from '../../dataConfig';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {theme} from '../../utils/Theme';
import ImageModalView from '../../components/ImageModalView';

type Props = NativeStackScreenProps<RootStackParamList, 'ImageGalleryPreview'>;
interface ItemI {
  id: string;
  image: ImageSourcePropType;
}
const {width, height} = Dimensions.get('window');
function PreviewScreen({route}: Props) {
  const {id} = route.params;
  const topRef = React.useRef<any>();
  const thumbRef = React.useRef<any>();
  const lastTap = React.useRef(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  React.useEffect(() => {
    scrollToActiveIndex(parseInt(id));
  }, []);
  const onMomentumScrollEnd = (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset} = ev.nativeEvent;

    scrollToActiveIndex(Math.floor(contentOffset.x / width));
  };
  const scrollToActiveIndex = (index: number) => {
    setActiveIndex(index);

    topRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * IMAGE_SIZE - IMAGE_SIZE / 2 > width / 2) {
      thumbRef.current.scrollToOffset({
        offset: index * IMAGE_SIZE - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef.current.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
      setOpenModal(true);
    } else {
      lastTap.current = now;
    }
  };
  const RenderItem = ({item}: {item: ImageGalleryItemI}) => {
    const {image} = item;
    const scale = new Animated.Value(1);
    const onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {scale},
        },
      ],
      {
        useNativeDriver: true,
      },
    );
    const onHandlerStateChange = (
      event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>,
    ) => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <PinchGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <TouchableWithoutFeedback
          onPress={handleDoubleTap}
          style={styles.imageContainer}>
          <Animated.Image
            source={image}
            style={[styles.image, {transform: [{scale}]}]}
          />
        </TouchableWithoutFeedback>
      </PinchGestureHandler>
    );
  };
  const onClose = () => {
    setOpenModal(false);
  };
  return (
    <View style={styles.container}>
      <ImageModalView
        visible={openModal}
        onClose={onClose}
        image={IMAGE_GALLERY_DATA[activeIndex].image}
      />
      <FlatList
        ref={topRef}
        data={IMAGE_GALLERY_DATA}
        renderItem={RenderItem}
        keyExtractor={item => item.id}
        pagingEnabled
        horizontal
        onMomentumScrollEnd={onMomentumScrollEnd}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={16}
        initialNumToRender={20}
      />
      <FlatList
        ref={thumbRef}
        data={IMAGE_GALLERY_DATA}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
            <RenderPreviewImage
              index={index}
              item={item}
              activeIndex={activeIndex}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        horizontal
        style={{position: 'absolute', bottom: 30}}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
const IMAGE_SIZE = 80;
const RenderPreviewImage = ({
  item,
  index,
  activeIndex,
}: {
  item: ItemI;
  index: number;
  activeIndex: number;
}) => {
  const {image} = item;
  const isSelectedImage = index === activeIndex;
  return (
    <Image
      source={image}
      style={{
        width: IMAGE_SIZE,
        height: IMAGE_SIZE + 50,
        opacity: isSelectedImage ? 1 : 0.3,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    bottom: 100,
  },
  image: {
    width: width,
  },
});
export default PreviewScreen;
