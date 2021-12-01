import React, { useState } from "react";
import { StyleSheet, View, FlatList, Text, Button } from "react-native";
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
  //states
  const [titleValue, setTitleValue] = useState("");
  const [value, setDescValue] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [showDetailId, setShowDetailId] = useState("");
  const [showDetailTitle, setShowDetailTitle] = useState("");
  const [showDetailDesc, setShowDetailDesc] = useState("");

  const handleDesc = (val) => {
    console.log(val);
    setDescValue(val);
  };

  const handleSubmit = () => {
    submit(value);
    setDescValue("");
  };

  const handleDetail = (id, title, desc) => {
    setShowDetailId(id);
    setShowDetailTitle(title);
    setShowDetailDesc(desc);
    setVisibility(true);
  };

  const handleCloseDetail = () => {
    setShowDetailId("");
    setShowDetailTitle("");
    setShowDetailDesc("");
    setVisibility(false);
  };

  return (
    <View style={styles.containerHome}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task Lists</Text>
      </View>

      <View>
        <Input onChange={handleDesc} value={value} onSubmit={handleSubmit} />
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(x) => String(x.id)}
          renderItem={({ item }) => (
            <ListItem
              completed={item.completed}
              onPress={() => handleDetail(item.id, item.title, item.desc)}
              title={item.title}
              desc={item.desc}
            />
          )}
        />

        <Modal visibility={visibility}>
          {visibility ? (
            <View>
              <View>
                <Text>{showDetailTitle}</Text>
              </View>
              <View>
                <Text>{showDetailDesc}</Text>
              </View>
              <View>
                <Button title="Aceptar" />
                <Button title="Cerrar" onPress={() => setVisibility(false)} />
              </View>
            </View>
          ) : (
            <Detail closeModal={() => handleCloseDetail()} />
          )}
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#3F0138",
  },
  header: {
    marginTop: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 25,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  list: {
    alignSelf: "stretch",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
