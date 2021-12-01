import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { complete, submit} from "./actions/todos";
import Detail from "./components/Detail";
import Input from "./components/Input";
import ListItem from "./components/ListItem";
import Modal from "./components/Modal";

const mapStateToProps = (state) => {
  return { data: state.todos };
};

const mapDispatchToProps = (dispatch) => ({
  complete: (id) => dispatch(complete(id)),
  submit: (id, title) => dispatch(submit(id, title)),
});

const App = ({ data, complete, submit }) => {

  const [task, setTasks] = useState([]);
  const [unfilteredToDos, setUnfilteredToDos] = useState(false);
  const [filterToDos, setFilterToDos] = useState([]);
  const [filterCompleted, setFilterCompleted] = useState([])
  const [value, setDescValue] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [selectedTask, setSelectedTask] = useState();

  useEffect(() => {
    console.log("psando por elefect")
    setTasks(data);

    if(filterToDos) {
      handleFilter(2)
      console.log("psando por elefect primer if")
    }

    if(filterCompleted) {
      console.log("psando por elefect 2 if")
      handleFilter(3)
    }
    
  },[data])

  const handleDesc = (val) => {
    setDescValue(val);
  };

  const handleSubmit = () => {
    const id = data.length + 1
    submit(id, value);
    setDescValue('');
  };

  const handleChangeState = () => {
    complete(selectedTask.id);
    reset();
  };

  const handleDetail = (item) => {
    setSelectedTask(item);
    setVisibility(true);
  };

  const handleFilter = (type) => {
    if(type == 1) {
      setUnfilteredToDos(false);
      setFilterToDos(false);
      setFilterCompleted(false);      
    }

    if(type == 2) {
      setUnfilteredToDos(true);
      setFilterCompleted(false);
      const filter = data.filter(x => x.completed === false)
      setFilterToDos(filter);
    }

    if(type == 3) {
      setUnfilteredToDos(true);
      setFilterToDos(false);
      const filter = data.filter(x => x.completed === true)
      setFilterCompleted(filter);
    }    
  }

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
      <TouchableOpacity onPress={() => handleFilter(1)} style={styles.filter}>
        <Text style={styles.filterText}>ALL</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleFilter(2)} style={styles.filter}>
      <Text style={styles.filterText}>TO DO</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleFilter(3)} style={styles.filter}>
      <Text style={styles.filterText}>COMPLETED</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.body}>

{      !unfilteredToDos && task ? (   
        <FlatList
          style={styles.list}
          data={task}
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
) : null }    

        {filterToDos ?
        (
          <FlatList
          style={styles.list}
          data={filterToDos}
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
        ) : null}

{filterCompleted ?
        (
          <FlatList
          style={styles.list}
          data={filterCompleted}
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
        ) : null}


        {visibility ? (
          <Modal>
            <Detail
              showDetailTitle={selectedTask.title}
              showDetailDesc={selectedTask.desc}
              closeModal={reset}
              changeState={handleChangeState}
              completed={selectedTask.completed}
            />
          </Modal>
        ) : null}
      </View>
      <View style={styles.footer}>          
        <Input value={value} onChange={handleDesc} onSubmit={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterText: {
    color: 'white',
  },
  filter: {
    flex: 33,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#1E1A3C",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  filters: {
    flex: 0.8,
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
