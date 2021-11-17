import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Amplify, { API, graphqlOperation, Storage, Auth } from "aws-amplify";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { withAuthenticator } from "aws-amplify-react-native";
import { Audio } from "expo-av";
import awsconfig from "./src/aws-exports";
import RecommendationScreen from "./screens/RecommendationScreen";
Amplify.configure(awsconfig);
const initialState = { name: "", description: "" };
const song = {
  uri: "http://localhost:20005",
};

const Stack = createNativeStackNavigator();
const App = () => {
  const [todos, setTodos] = useState([]);
  const onPlayBackStatusUpdate = (status) => {
    console.log(status);
  };
  const playCurrentSong = async () => {
    const audioData = await Storage.get("test.mp3");
    const { sound } = await Audio.Sound.createAsync(audioData);
    console.log(audioData);
    await sound.playAsync();
  };
  useEffect(() => {
    console.log("something");
    // try {
    //   Storage.list("");
    // } catch (error) {
    //   console.log(error);
    // }
    playCurrentSong();
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
  function DetailsScreen() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={RecommendationScreen} />
        <Stack.Screen name='Details' component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default withAuthenticator(App);
