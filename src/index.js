import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { connect } from "react-redux";
import {
  complete,
  submit,
  addDescription,
  deleteToDo,
  deleteAllTasks,
} from "./actions/todos";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import Input from "./components/Input";
import ListItem from "./components/ListItem";
import CustomModal from './components/Modal';

const mapStateToProps = (state) => {
  return { data: state.todos };
};

const mapDispatchToProps = (dispatch) => ({
  complete: (id) => dispatch(complete(id)),
  submit: (id, title) => dispatch(submit(id, title)),
  addDescription: (id, desc) => dispatch(addDescription(id, desc)),
  deleteToDo: (id) => dispatch(deleteToDo(id)),
  deleteAllTasks: () => dispatch(deleteAllTasks()),
});

const App = ({
  data,
  complete,
  submit,
  addDescription,
  deleteToDo,
  deleteAllTasks,
}) => {


  const [task, setTasks] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('Todos')
  const [unfilteredToDos, setUnfilteredToDos] = useState(false);
  const [filterToDos, setFilterToDos] = useState([]);
  const [filterCompleted, setFilterCompleted] = useState([]);
  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [selectedTask, setSelectedTask] = useState();

  useEffect(() => {
    setTasks(data);

    if (filterToDos) {
      handleFilter(2);
    }

    if (filterCompleted) {
      handleFilter(3);
    }
    
  }, [data]);


  const handleTitleTask = (val) => {
    console.log(val)
    setTitleValue(val);
  };

  const handleSubmitTitleTask = () => {
    //Evito que entren tareas vacias
    if (titleValue == "") {
      return;
    }
    const newID = uuid();
    console.log(newID, titleValue)
    submit(newID, titleValue);
    setTitleValue("");
  };

  const handleDescTask = (val) => {
    setDescValue(val);
    //se que no es la manera con mejor performance, pero estoy demorado
    //addDescription(selectedTask.id, descValue);
  };

  const handleDeleteToDo = () => {
    deleteToDo(selectedTask.id);
    reset();
  };

  const handleDeleteAllTasks = () => {
    deleteAllTasks();
    reset();
  };

  const handleChangeState = (item) => {
    complete(item.id);
    reset();
  };

  const handleDetail = (item) => {
    setSelectedTask(item);
    setVisibility(true);
  };

  const handleFilter = (type) => {
    console.log('recibiend tipo', type)
    if (type == 1) {
      setUnfilteredToDos(false);
      setFilterToDos(false);
      setFilterCompleted(false);
      setSelectedFilter('Todos');
      setVisibility(false);
    }

    if (type == 2) {
      setUnfilteredToDos(true);
      setFilterCompleted(false);
      const filter = data.filter((x) => x.completed === false);
      setFilterToDos(filter);
      setSelectedFilter('No Realizados');
      setVisibility(false);
    }

    if (type == 3) {
      setUnfilteredToDos(true);
      setFilterToDos(false);
      const filter = data.filter((x) => x.completed === true);
      setFilterCompleted(filter);
      setSelectedFilter('Realizados');
      setVisibility(false);
    }
  };

  const reset = () => {
    if (descValue != "") {
      if (selectedTask.desc !== descValue) {
        addDescription(selectedTask.id, descValue);
      }
    }
    setSelectedTask();
    setDescValue("");
    setVisibility(false);
  };

  return (
    <View style={styles.containerHome}>
      <View style={styles.contLog}>
        <Image
          style={styles.contLogo}
          source={require("../assets/png/pcnt-logo.png")}
        />
      </View>

      {/* Estilo cuando no tengo tareas pendientes*/}
      {task.length == 0 ? (
        <View style={styles.contWithoutTask}>
          <View style={styles.contTitle}>
            <Text style={styles.title}>To do list</Text>
          </View>

          <View style={styles.contSubTitle}>
            <Text style={styles.subtitle}>
              ¿Que cosas tenés que terminar hoy?
            </Text>            
          </View>
            <View style={styles.contInputToDoWitouhtTask}>
              <Input
                value={titleValue}
                onChange={handleTitleTask}
              />
            </View>
                
          <View style={styles.contBody}>
          </View>
        </View>
      ) 
      : ( 
        <View style={styles.contWithList}>

          <View styles={styles.contInputToDo}>
            <Input
              value={titleValue}
              onChange={handleTitleTask}
            />
          </View>

          <View style={styles.taskList}>
            
            <View style={styles.taskListTitle}>
              <View style={styles.contListAndFilter}>
              <Text style={styles.textTaskListTitle}>To do list</Text>
              <TouchableOpacity onPress={() => setVisibility(true)}>
              <Text style={styles.filters}>{selectedFilter}</Text>
              </TouchableOpacity>
              </View>
            </View>

            <View style={styles.taskListBody}>

            {!unfilteredToDos && task ? (
            <FlatList
            testID="unfiltered-list"
            data={task}
            keyExtractor={(x) => String(x.id)}
            renderItem={({ item }) => (
              <ListItem
                completed={item.completed}
                changeState={() => handleChangeState(item)}
                title={item.title}
                desc={item.desc}
              />
            )}
          />
        ) : null}

        {filterToDos ? (
            <FlatList
            testID="unfiltered-list"
            data={filterToDos}
            keyExtractor={(x) => String(x.id)}
            renderItem={({ item }) => (
              <ListItem
                completed={item.completed}
                changeState={() => handleChangeState(item)}
                title={item.title}
                desc={item.desc}
              />
            )}
          />
        ) : null}

        {filterCompleted ? (
            <FlatList
            testID="unfiltered-list"
            data={filterCompleted}
            keyExtractor={(x) => String(x.id)}
            renderItem={({ item }) => (
              <ListItem
                completed={item.completed}
                changeState={() => handleChangeState(item)}
                title={item.title}
                desc={item.desc}
              />
            )}
          />
        ) : null}

          </View>

          {visibility ? (
          <CustomModal>
          <View style={styles.modalFilters}>
          <TouchableOpacity onPress={() => handleFilter(1)}><Text>Todos</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter(2)}><Text>No Realizados</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter(3)}><Text>Realizados</Text></TouchableOpacity>
          </View>
          </CustomModal>    
          
        ) : null}

</View>
        </View>
      )}

      <View style={styles.contAgregar}>
        <TouchableOpacity style={styles.touchAgregar} onPress={() => handleSubmitTitleTask()}>
          <Text style={styles.textAgregar}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.falseLabel} />
    </View>
  );
};

{
  /* <View style={styles.filters}>
        <TouchableOpacity onPress={() => handleFilter(1)} style={styles.filter}>
          <Text style={styles.filterText}>ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilter(2)} style={styles.filter}>
          <Text style={styles.filterText}>TO DO</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilter(3)} style={styles.filter}>
          <Text style={styles.filterText}>COMPLETED</Text>
        </TouchableOpacity>
      </View> */
}

{
  /* <View style={styles.body}>
        {!unfilteredToDos && task ? (
          <FlatList
            testID='unfiltered-list'
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
        ) : null}

        {filterToDos ? (
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

        {filterCompleted ? (
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
          <CustomModal>
            <Detail
              showDetailTitle={selectedTask.title}
              showDetailDesc={selectedTask.desc}
              closeModal={reset}
              changeState={handleChangeState}
              completed={selectedTask.completed}
              deleteTask={handleDeleteToDo}
              onChange={handleDescTask}
              value={descValue}
            />
          </CustomModal>
        ) : null}
      </View>
      <View style={styles.footer}>
        <Input
          value={titleValue}
          onChange={handleTitleTask}
          onSubmit={handleSubmitTitleTask}
        />
      </View> */
}

const styles = StyleSheet.create({
  containerHome: {
    backgroundColor: "#E5E5E5",
    marginTop: 45,
    flex: 1,
    flexDirection: "column",
  },
  contWithoutTask: {
    flex: 40,
  },
  contWithList:{
    flex: 55, 
    paddingTop: 15
  },
  taskList: {
    marginVertical: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 15,
    flex: 1,    
  },
  taskListTitle: {
    flex: 1,
    paddingLeft: 15,  
  },
  textTaskListTitle:{
    fontWeight:'bold',
    fontSize: 18,
  },
  taskListBody: {
    flex: 8,
  },
  contListAndFilter: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  filters: {
    marginRight: 15
  },
  modalFilters: {
    fontSize: 16,
    color: "black",
    marginLeft: 20,
  },
  logo: {
    width: 30.99,
    height: 40,
    left: 38,
    top: 121,
  },
  contLog: {
    justifyContent: "center",
    paddingLeft: 20,
    flex: 10,
  },
  contTitle: {
    flex: 10,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    paddingLeft: 20,
  },
  contSubTitle: {
    flex: 5,
    paddingLeft: 20,
  },
  subtitle: {
    fontWeight: "normal",
  },
  contBody: {
    flex: 55,
    paddingLeft: 20,
  },
  contInputToDo: {
    flex: 5,
    paddingLeft: 20,
    justifyContent: "center",
  },
  contInputToDoWitouhtTask: {
    flex: 5,
    justifyContent: "center",
  },
  contAgregar: {
    flex: 10,
    justifyContent: "center",
    alignItems: "stretch",
  },
  touchAgregar: {
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 30,
    alignItems: "center",
  },
  textAgregar: {
    color: "rgba(0, 0, 0, 0.5)",
  },
  falseLabel: {
    flex: 5,
    borderTopWidth: 4,
    marginHorizontal: 150,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
