
import {createNavigationContainerRef} from '@react-navigation/native';
import { ImageSourcePropType } from 'react-native';
export type RootStackParamList = {
    Home: undefined;
    Todo: undefined;
    Country: undefined;
    ImageGallery: undefined;
    ImageGalleryPreview: {
      id: string;
      image: ImageSourcePropType;
    }
  };
// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    // Perform navigation if the app has mounted
    navigationRef.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}


export function goBack() {
  navigationRef.current?.goBack();
}
