import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { connect } from 'react-redux'
import { complete } from './reducers/todos'
import ListItem from './components/ListItem'

const mapStateToProps = state => {
  console.log("state", state)
  return {data: state.todos}
}

const mapDispatchToProps = dispatch => ({
  complete: () => dispatch(complete(id))
})

const App = ({data, complete}) => {
  return (
    <View style={styles.container}>
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
  