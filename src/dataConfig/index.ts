import { ImageSourcePropType } from "react-native";
import { navigate, RootStackParamList } from "../navigation/RootNavigation"


interface RouteNameI {
    Home: keyof RootStackParamList;
    Todo: keyof RootStackParamList;
    Country: keyof RootStackParamList;
    ImageGallery: keyof RootStackParamList;
    ImageGalleryPreview: keyof RootStackParamList;

}
export interface HomeDataItemI {
    id: string;
    label: keyof RouteNameI,
    onPress: () => void;
}
export interface ImageGalleryItemI {
    id: string;
    image: ImageSourcePropType;
  }
export const ROUTE_NAME : RouteNameI = {
    Home: "Home",
    Todo: "Todo",
    Country: "Country",
    ImageGallery : "ImageGallery",
    ImageGalleryPreview: "ImageGalleryPreview"
}
export const ROUTE_LABEL: any = {
    Home: "Eastplayers Test",
    Todo: "Todo list",
    Country: "Country list",
    ImageGallery : "Image gallery",
    ImageGalleryPreview: "Preview"
}

export const HOME_DATA: HomeDataItemI[] = [
    {
        id: '1',
        label: ROUTE_LABEL.Todo,
        onPress: () => navigate(ROUTE_NAME.Todo)
    },
    {
        id: '2',
        label: ROUTE_LABEL.Country,
        onPress: () => navigate(ROUTE_NAME.Country)
    },
    {
        id: '3',
        label: ROUTE_LABEL.ImageGallery,
        onPress: () => navigate(ROUTE_NAME.ImageGallery)
    }
]

export const HOME_CIRCLE_SIZE = 38;

export const BASE_URL = "https://restcountries.com";
export const IMAGE_GALLERY_DATA: ImageGalleryItemI[] = [
    {
        id: "0",
        image: require("../assets/images/1.jpeg"),
    },
    {
        id: "1",
        image: require("../assets/images/2.jpeg"),
    },
    {
        id: "2",
        image: require("../assets/images/3.jpeg"),
    },
    {
        id: "3",
        image: require("../assets/images/4.jpeg"),
    },
    {
        id: "4",
        image: require("../assets/images/5.jpeg"),
    },
    {
        id: "5",
        image: require("../assets/images/6.jpeg"),
    },
    {
        id: "6",
        image: require("../assets/images/7.jpeg"),
    },
    {
        id: "7",
        image: require("../assets/images/8.jpeg"),
    },
    {
        id: "8",
        image: require("../assets/images/9.jpeg"),
    },
    {
        id: "9",
        image: require("../assets/images/10.jpeg"),
    },
    {
        id: "10",
        image: require("../assets/images/11.jpeg"),
    },
    {
        id: "11",
        image: require("../assets/images/12.jpeg"),
    },
    {
        id: "12",
        image: require("../assets/images/13.jpeg"),
    },
    {
        id: "13",
        image: require("../assets/images/14.jpeg"),
    },
    {
        id: "14",
        image: require("../assets/images/15.jpeg"),
    },
    {
        id: "15",
        image: require("../assets/images/16.jpeg"),
    },
    {
        id: "16",
        image: require("../assets/images/17.jpeg"),
    },
    {
        id: "17",
        image: require("../assets/images/18.jpeg"),
    },
    {
        id: "18",
        image: require("../assets/images/19.jpeg"),
    },
    {
        id: "19",
        image: require("../assets/images/20.jpeg"),
    }
]