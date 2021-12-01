import React, { useEffect, useState } from "react";
import { Image, Button, View, Text, StyleSheet } from "react-native";
import Amplify, { API, graphqlOperation, Storage, Auth } from "aws-amplify";
import { listTodos } from "../src/graphql/queries";

export default function RecommendationScreen({ navigation }) {
  const [todos, setTodos] = useState([]);
  useEffect(async () => {
    fetchTodos();
  }, []);
  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos", err);
    }
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>RecommendationScreen</Text>
      {/* <Image source={audioData} /> */}
      {todos.map((todo, index) => (
        <View key={todo.id ? todo.id : index} style={styles.todo}>
          <Text style={styles.todoName}>{todo.name}</Text>
          <Text>{todo.description}</Text>
        </View>
      ))}
      <Button title='Go to Details' onPress={() => navigation.navigate("Details")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
