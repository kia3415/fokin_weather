import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Alert} from "react-native"
import Loading from "./Loading";
import * as Location from "expo-location"

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getLocation = async() =>{
    try{
      await Location.requestPermissionsAsync();
      const {
        coords:{latitude,longitude}
      } = await Location.getCurrentPositionAsync();
      this.setState({isLoading:false});
      // Send to API to get Weather
      console.log(coords.latitude, coords.longitude);
    }catch (e){
      Alert.alert("Can't find you.","So sad");
    }
  }
  componentDidMount() {
    this.getLocation();
  }

  render() {
    const {isLoading}=this.state;
    return isLoading ? <Loading/> : null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  yellowView:{
    flex:1,
    backgroundColor:"yellow"
  },
  blueView:{
    flex:3,
    backgroundColor:"blue"
  }
});

