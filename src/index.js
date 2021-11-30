import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { connect } from 'react-redux'
import { complete, submit } from './reducers/todos'
import Input from './components/Input'
import ListItem from './components/ListItem'

const mapStateToProps = state => {
  return {data: state.todos}
}

const mapDispatchToProps = dispatch => ({
  complete: (id) => dispatch(complete(id)),
  submit: (val) => dispatch(submit(val)),
})

const App = ({data, complete, submit}) => {
  
  //states
  const [titleValue, setTitleValue] = useState('');
  const [value, setDescValue] = useState('');

  const handleDesc = (val) => {
    console.log(val)
    setDescValue(val)
  }

  const handleSubmit = () => {
    submit(value)
    setDescValue('')
  }

  return (
    <View style={styles.container}>
      <Input onChange={handleDesc} value={value} onSubmit={handleSubmit} />
      <FlatList
      style={styles.list}
      data={data}
      keyExtractor={ x => String(x.id) }
      renderItem={({item}) => 
      <ListItem completed={item.completed} onPress={() => complete(item.id)} desc= {item.desc} />}
       />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginTop: 35,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    list : {
      alignSelf: 'stretch',
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(App)
  