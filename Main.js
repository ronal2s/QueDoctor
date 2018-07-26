import React, { Component } from 'react';
import {
  AppRegistry, View,
  Text, StyleSheet,
  Image, ImageBackground, TouchableOpacity
} from 'react-native';
import { Drawer, Content, Spinner, Badge, Container, Card, CardItem, List, ListItem, Header, Left, Right, Button, Title, Tab, Tabs, Icon, Body, Separator, Fab } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import Home2 from './home'
import ContentDrawer from './contentDrawer'
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}



class Main extends Component {
  state = {
    active: false, blurImages: [1,1,1,1,1,1,1]
  }

  componentDidMount()
  {
    this.props.navigation.setParams({openDrawer: this.openDrawer})
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };  
  static navigationOptions = ({navigation}) => {
    return{
      title: "Título profundo", 
      headerTintColor: "black",       
      headerLeft: (
        <Button transparent onPress={navigation.getParam('openDrawer')}>
        <Icon name='menu' style={{ color: "black" }} />
      </Button>
      ),
      
    }
  };
  render() {
    return (
      <Drawer
        openDrawerOffset={0.5}
        panCloseMask={0.5}
        ref={(ref) => { this.drawer = ref; }}
        content={
          <ContentDrawer/>
        }
        onClose={() => this.closeDrawer()} >                  
          <Home2 windowDetails={() => this.props.navigation.navigate('Details')}/>
      </Drawer >
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: Main,
    Details: HomeScreen,
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'transparent',
        alignContent: 'center'
      },
      headerTitleStyle: {        
        justifyContent: 'space-between',
        textAlign: 'center',
        flex:1
      }      
    },
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

// module.exports = Main;