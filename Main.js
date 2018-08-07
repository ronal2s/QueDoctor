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
import Doctores from './doctores'
import CentrosSantiago from './centrosSantiago'
import CentrosSantoDomingo from './centrosSantoDomingo'
import CentrosLaVega from './centrosLaVega'
import CentrosMacoris from './centrosMacoris'
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
    active: false, blurImages: [1, 1, 1, 1, 1, 1, 1], modal: false, username: "", terms:true
  }

  componentDidMount() {
    this.props.navigation.setParams({ openDrawer: this.openDrawer, openModal: this.openModal})
    var number = Math.random();
    number.toString();
    var id = number.toString(36).substr(2,9);    
    AsyncStorage.getItem("firstIni", (err, result) => {
      if (result != 1) {
        this.setState({ terms: true, modal:true })
        AsyncStorage.setItem("userCode", id);
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
      <Text style={{fontWeight:"bold", fontSize: 22}} >¿Cuál es tu nombre?</Text>
      <Text note>No será compartido a menos que así lo prefieras </Text>
      <Item floatingLabel>
        <Label>Escribir nombre completo</Label>
        <Input value={this.state.username} onChangeText={(username) => this.setState({ username })} />
      </Item>
      <Button style={{ backgroundColor: '#03a9f4'}} block primary onPress={this.saveName} >
        <Text style={{ color: "white" }} >Aceptar</Text>
      </Button>
    </View>
  );
  renderTerms = () => (
    <View style={styles.modalContent}>
      <Text style={{fontWeight:"bold", fontSize: 22}}> Términos y condiciones de uso {'\n'}{'\n'}</Text>
      <Text >
      Nosotros no controlamos lo que las personas hacen o dicen, y no somos responsables de sus acciones o conductas en la aplicación o fuera de ella. Nosotros solo somos una vía donde los usuarios pueden comentar y calificar el servicio médico que el hospital o doctor le ha dado.

Con esta aplicación se pretende ayudar a decidir al usuario a donde ir en momentos de urgencias a base de los mismos votos de la comunidad. También tenemos el objetivo de causar un impacto social y que los centros médicos y profesionales del área mejoren para así ofrecer un servicio de calidad para los pacientes.
      </Text>      
      <Button style={{ backgroundColor: '#03a9f4', marginVertical: 10 }} block onPress={() => this.setState({terms:false})}>
      <Text style={{color:"white"}} >Aceptar</Text>
      </Button>
    </View>
  );

  saveName = async () => {
    const { username } = this.state;
    if (username != "") { 
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
    const { modal, terms} = this.state
    const navigate = this.props.navigation;
    return (
      <Drawer
        openDrawerOffset={0.5}
        panCloseMask={0.5}
        ref={(ref) => { this.drawer = ref; }}
        content={
          <ContentDrawer centrosSantago={() => navigate.push("CentrosSantiago") } 
          centrosSantoDomingo={() => navigate.push("CentrosSantoDomingo")}
          centrosLaVega={() => navigate.push("CentrosLaVega")}
          centrosMacoris={() => navigate.push("CentrosMacoris")} />
        }
        onClose={() => this.closeDrawer()} >
        <Modal
          isVisible={modal}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          // onBackdropPress={() => this.setState({ modal: false })}
        >
        {terms? this.renderTerms(): this.renderModalContent()}
          {/* {this.renderModalContent()} */}
        </Modal>
        <Home2 centros={() => navigate.push("Centros", {city: "all"})} doctores={() => navigate.navigate("Doctores")} />
      </Drawer >
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: Main,
    Centros: Centros,
    Doctores: Doctores,
    CentrosSantiago: CentrosSantiago,
    CentrosSantoDomingo: CentrosSantoDomingo,
    CentrosLaVega: CentrosLaVega,
    CentrosMacoris: CentrosMacoris,
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