import React, { Component } from 'react';
import {
  AppRegistry, View,
  Text, StyleSheet,AsyncStorage,
  Image, ImageBackground, TouchableOpacity
} from 'react-native';
import { Drawer, Item, Label, Input, Content, Spinner, Badge, Container, Card, CardItem, List, ListItem, Header, Left, Right, Button, Title, Tab, Tabs, Icon, Body, Separator, Fab } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import Modal from "react-native-modal";
import Home2 from './home'
import ContentDrawer from './contentDrawer'
import Centros from './centros'
import CentrosSantiago from './centrosSantiago'
import Comments from './comments'

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}


console.disableYellowBox = true;


class Main extends Component {
  state = {
    active: false, blurImages: [1, 1, 1, 1, 1, 1, 1], modal: false, username: ""
  }

  componentDidMount() {
    this.props.navigation.setParams({ openDrawer: this.openDrawer, openModal: this.openModal})

    AsyncStorage.getItem("firstIni", (err, result) => {
      if (result != 1) {
        this.setState({ modal: true })
      }
    })

  }

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
  openModal = () => {
    this.setState({modal:true})
  }
  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text style={{ fontWeight: "bold" }} >¿Cuál es tu nombre?</Text>
      <Text note>No será compartido a menos que así lo prefieras </Text>
      <Item floatingLabel>
        <Label>Escribir nombre</Label>
        <Input value={this.state.username} onChangeText={(username) => this.setState({ username })} />
      </Item>
      <Button block primary onPress={this.saveName} >
        <Text style={{ color: "white" }} >Aceptar</Text>
      </Button>
    </View>
  );

  saveName = async () => {
    const { username } = this.state;
    if (username != "") { alert("x")
      try {
        await AsyncStorage.setItem("username", username);
        AsyncStorage.setItem("firstIni", "1");
      } catch (error) {
        console.error("Error on saving: " + error);
        // alert(error)
      }
      // alert(username);
    }
    this.setState({ modal: false });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // header: null,
      title: "QueDoctor",
      headerTintColor: "black",
      headerLeft: (
        <Button transparent onPress={navigation.getParam('openDrawer')}>
          <Icon name='menu' style={{ color: "black" }} />
        </Button>
      ),
      headerRight: (
        <Button transparent onPress={navigation.getParam('openModal')}>
          <Icon name="person" style={{ color: "black" }} />
        </Button>
      )

    }
  };

  render() {
    const { modal } = this.state
    const navigate = this.props.navigation;
    return (
      <Drawer
        openDrawerOffset={0.5}
        panCloseMask={0.5}
        ref={(ref) => { this.drawer = ref; }}
        content={
          <ContentDrawer centrosSantago={() => navigate.push("CentrosSantiago") }/>
        }
        onClose={() => this.closeDrawer()} >
        <Modal
          isVisible={modal}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          onBackdropPress={() => this.setState({ modal: false })}
        >
          {this.renderModalContent()}
        </Modal>
        <Home2 centros={() => navigate.push("Centros", {city: "all"})} />
      </Drawer >
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: Main,
    Centros: Centros,
    CentrosSantiago: CentrosSantiago
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
        flex: 1,
        marginLeft: -50
      }
    },
  }
);

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
})

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

// module.exports = Main;