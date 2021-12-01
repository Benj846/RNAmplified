import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Amplify, { API, graphqlOperation, Storage, Auth } from "aws-amplify";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { withAuthenticator } from "aws-amplify-react-native";
import { Audio } from "expo-av";
import awsconfig from "./src/aws-exports";
import RecommendationScreen from "./screens/RecommendationScreen";
import Player from "./modals/Player";
Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();
const App = () => {
  const [todos, setTodos] = useState([]);

  const playCurrentSong = async () => {
    try {
      // const audioData = await Storage.get("test.mp3");
      const { sound } = await Audio.Sound.createAsync(require("./assets/test.mp3"));
      await sound.playAsync().catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const onPausePlay = (isPlaying) => {
    if (isPlaying) {
    }
  };

  // useEffect(() => {
  //   console.log("something");
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);
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
      <Player />
    </NavigationContainer>
  );
};

export default withAuthenticator(App);
