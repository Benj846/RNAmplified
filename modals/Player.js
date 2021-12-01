import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Storage } from "aws-amplify";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
export default function Player() {
  const [Datasound, setDataSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.2);
  const onPlayBackStatusUpdate = async (status) => {
    setIsPlaying(status.isPlaying);
    console.log(isPlaying);
  };
  useEffect(async () => {
    // try {
    console.log("Loading Sound");
    // const sourceUrl = await Storage.get("test.mp3");
    const { sound } = await Audio.Sound.createAsync(
      { uri: await Storage.get("test.mp3") },
      { shouldPlay: false },
      onPlayBackStatusUpdate
    ).catch((error) => {
      console.log(error);
    });
    setDataSound(sound);
    // } catch (error) {
    //   console.log(error);
    // }
  }, []);
  async function playSound() {
    // try {
    //   console.log("Playing Sound");
    //   await Datasound.playAsync();
    // } catch (error) {
    //   console.log(error);
    // }
    const [play, playErr] = await Datasound.playAsync();
  }
  const pauseSound = async () => {
    console.log("object");
    try {
      await Datasound.setStatusAsync({ shouldPlay: false });
      console.log(await Datasound.getStatusAsync());
    } catch (error) {
      console.log(error);
    }
  };
  const volumeUp = async () => {
    setSoundVolume(soundVolume + 0.1);
    try {
      await Datasound.setVolumeAsync(soundVolume);
    } catch (error) {
      console.log(error);
    }
  };
  const volumeDown = async () => {
    setSoundVolume(soundVolume - 0.1);
    try {
      await Datasound.setVolumeAsync(soundVolume);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.wrapper}>
      <Button title='press to play' onPress={playSound} />
      {/* {console.log(sound)} */}
      <AntDesign
        name={isPlaying ? "pausecircle" : "play"}
        size={28}
        color='black'
        onPress={playSound}
      />
      <AntDesign name='pausecircle' size={28} color='black' onPress={pauseSound} />
      <Button title='volume up' onPress={volumeUp} />
      <Button title='volume down' color='green' onPress={volumeDown} />
      <Button
        title='set rate to 2'
        onPress={async () => {
          await Datasound.setStatusAsync({ rate: 2 });
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    height: 80,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});
