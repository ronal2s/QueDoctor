import React from 'react';
import { StyleSheet, Text, View, DrawerLayoutAndroid } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Font, AppLoading } from "expo";
import Main from './Main'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
    isReady: false
    };
    }
    
    async componentWillMount() {
    await Expo.Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
    }
  render() {
    if(!this.state.isReady)
    {
      return (
<Text>Loading</Text>
      )
      
    }
    return (
      <Main/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
