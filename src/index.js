import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { complete, submit } from "./actions/todos";
import Detail from "./components/Detail";
import Input from "./components/Input";
import ListItem from "./components/ListItem";
import Modal from "./components/Modal";

const mapStateToProps = (state) => {
  return { data: state.todos };
};

const mapDispatchToProps = (dispatch) => ({
  complete: (id) => dispatch(complete(id)),
  submit: (val) => dispatch(submit(val)),
});

const App = ({ data, complete, submit }) => {
  const [value, setDescValue] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [selectedTask, setSelectedTask] = useState();

  const handleDesc = (val) => {
    console.log(val);
    setDescValue(val);
  };

  const handleSubmit = () => {
    submit(value);
    setDescValue("");
  };

  handleCompletedTask = () => {
    complete(selectedTask.id);
    console.log(selectedTask);
    reset();
  };

  const handleDetail = (item) => {
    setSelectedTask(item);
    setVisibility(true);
  };

  const reset = () => {
    setSelectedTask();
    setVisibility(false);
  };

  return (
    
    <View style={styles.containerHome}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TODO LIST</Text>
      </View>

      <View style={styles.filters}>
      <TouchableOpacity onPress={reset} style={styles.filter}>
        <Text style={styles.filterText}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset} style={styles.filter}>
      <Text style={styles.filterText}>To do</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset} style={styles.filter}>
      <Text style={styles.filterText}>Completed</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(x) => String(x.id)}
          renderItem={({ item }) => (
            <ListItem
              completed={item.completed}
              onPress={() => handleDetail(item)}
              title={item.title}
              desc={item.desc}
            />
          )}
        />


        {visibility ? (
          <Modal>
            <Detail
              showDetailTitle={selectedTask.title}
              showDetailDesc={selectedTask.desc}
              closeModal={reset}
              completed={handleCompletedTask}
            />
          </Modal>
        ) : null}
      </View>
      <View style={styles.footer}>          
        <Input onChange={handleDesc} value={value} onSubmit={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterText: {
    color: 'white',
  },
  filter: {
    color: '#3E3364',
    flex: 3,
    margin: 5,
    padding: 5,
  },
  filters: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3E3364',
    alignItems: 'stretch'
  },
  body: {
    flex: 8
  },
  footer: {
    flex: 1
  },
  containerHome: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#1E1A3C",
  },
  header: {
    flex: 1,
    marginLeft: 15,
    marginTop: 35,
    justifyContent: "center",
  },
  headerTitle: {
    color: "white",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 25,
  },
  list: {
    alignSelf: "stretch",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
