import { navigate, RootStackParamList } from "../navigation/RootNavigation"


interface RouteNameI {
    Home: keyof RootStackParamList;
    Todo: keyof RootStackParamList;
    Country: keyof RootStackParamList;
    ImageGallery: keyof RootStackParamList;
}
export interface HomeDataItemI {
    id: string;
    label: keyof RouteNameI,
    onPress: () => void;
}
export const ROUTE_NAME : RouteNameI = {
    Home: "Home",
    Todo: "Todo",
    Country: "Country",
    ImageGallery : "ImageGallery"
}
export const ROUTE_LABEL: any = {
    Home: "Eastplayers Test",
    Todo: "Todo list",
    Country: "Country list",
    ImageGallery : "Image gallery"
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
        label: ROUTE_LABEL.Country,
        onPress: () => navigate(ROUTE_NAME.ImageGallery)
    }
]

export const HOME_CIRCLE_SIZE = 38;