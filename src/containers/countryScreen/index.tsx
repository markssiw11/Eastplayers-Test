import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  FlatList,
  SafeAreaView
} from 'react-native';
import debounce from 'lodash.debounce';
import {theme} from '../../utils/Theme';
import LoadingBar from '../../components/LoadingBar';
import Diver from '../../components/Diver';
import { BASE_URL } from '../../dataConfig';

interface SearchBarI {
    onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

function CountryScreen() {
  const [searchKey, setSearchKey] = React.useState('');
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const onChangeSearch = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const {nativeEvent} = e;
    const txt = nativeEvent.text;
    if (txt) {
      debounceGetData(nativeEvent.text);
    } else {
      setData([]);
    }
  };
  const getDataApi = (txt: string) => {
    setLoading(true);
    return fetch(`${BASE_URL}/v3.1/name/${txt}`)
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const debounceGetData = React.useCallback(
    debounce((nextValue: string) => getDataApi(nextValue), 500),
    [searchKey],
  );
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onChange={onChangeSearch} />
      {loading && <LoadingBar />}
      <FlatList
        data={data}
        renderItem={RenderItem}
        keyExtractor={(_, index) => `${index}`}
        ItemSeparatorComponent={Diver}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
const RenderItem = ({item}: any) => {
  const {name} = item;
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>{name?.common}</Text>
    </View>
  );
};


const SearchBar = ({onChange}: SearchBarI) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search"
        style={styles.textInput}
        onChange={onChange}
      />
      <Image
        source={require('../../assets/images/chevron-right.png')}
        style={styles.chevronRight}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  textInputContainer: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: theme.borderRadius.s,
    padding: theme.spacing.xs,
    flexDirection: 'row',
    margin: theme.spacing.m,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
  },
  chevronRight: {
    width: 6,
    height: 12,
    tintColor: '#6561F5',
    marginHorizontal: theme.spacing.xs,
  },
  itemContainer: {
    padding: theme.spacing.m,
  },
  text: {
    fontWeight: 'bold',
  },
});
export default CountryScreen;
