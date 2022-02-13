import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {theme} from 'utils/Theme';

interface TodoItemI {
  name: string;
  isDone: boolean;
  index: number;
}
interface TextInputFieldI {
  onAddItem: (name?: string) => void;
}

function TodoScreen() {
  const [listTodo, setListToDo] = React.useState<TodoItemI[]>([]);
  const dismissKeyBoard = () => {
    Keyboard.dismiss();
  };
  const onAddItem = (name?: string) => {
    if (name) {
      const newList = [
        ...listTodo,
        {
          name,
          isDone: false,
          index: listTodo.length + 1,
        },
      ];
      setListToDo(newList);
    }
  };
  const onChangeStatusItem = (item: TodoItemI) => {
    const {index, isDone} = item;
    const newList = [...listTodo];
    newList.splice(index -1, 1, {...item, isDone: !isDone});
    setListToDo(newList);
  };
  const doneLength = getLenthDoneList(listTodo)
  return (
    <TouchableWithoutFeedback onPress={dismissKeyBoard}>
      <View style={styles.container}>
        <TextInputField onAddItem={onAddItem} />
        <Text style={styles.title}>
          There are <Text style={styles.doneText}>{doneLength}</Text> tasks left out of{' '}
          {listTodo.length} tasks
        </Text>
        <FlatList
          data={listTodo}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({item}: {item: TodoItemI}) => (
            <RenderItem item={item} onPressItem={onChangeStatusItem} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
type ItemType = {
  item: TodoItemI,
  onPressItem: (item: TodoItemI) => void; 
}
const RenderItem = ({item, onPressItem}: ItemType) => {
  const {name, isDone} = item;
  const _onPressItem = () => {
    onPressItem(item)
  }
  const nameStyle = isDone ? styles.isDone : styles.name;
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={_onPressItem}>
      <View style={styles.dot} />
      <Text style={nameStyle} >{name}</Text>
    </TouchableOpacity>
  );
};

const TextInputField = ({onAddItem}: TextInputFieldI) => {
  const [textValue, setTextValue] = React.useState('');
  const ref = React.createRef<TextInput>();

  const onChangeText = (text: string) => {
    setTextValue(text);
  };
  const _onAddItem = () => {
    if (textValue) {
      onAddItem(textValue);
      ref.current?.clear();
    }
  };
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        ref={ref}
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="sentences"
        style={styles.textInput}
        placeholder="Search"
        placeholderTextColor="#BBBCC5"
        onChangeText={onChangeText}
        
      />
      <TouchableOpacity onPress={_onAddItem}>
        <Text style={styles.add}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};
const getLenthDoneList = (arr?: TodoItemI[]) => {
  const arrLenth = arr?.length || 0;
  const newArr = (arr || []).filter(e => e.isDone).length;
  return arrLenth - newArr;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.m,
  },
  textInputContainer: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: theme.borderRadius.s,
    flexDirection: 'row',
    alignItems: "center",
    paddingHorizontal: theme.spacing.xs
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
    lineHeight: 21
  },
  add: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingHorizontal: theme.spacing.xs,
  },
  title: {
    color: theme.colors.text,
    fontWeight: '700',
    paddingVertical: theme.spacing.s,
  },
  doneText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: theme.spacing.xs,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
    backgroundColor: theme.colors.text,
    margin: theme.spacing.xs,
  },
  isDone: {
    textDecorationLine: "line-through",
    fontSize: theme.fontSize.m,
    color: theme.colors.text
  },
  name: {
    fontSize: theme.fontSize.m,
    color: theme.colors.text

  }
});

export default TodoScreen;
