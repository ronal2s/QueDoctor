import React, { Component } from 'react';
import {
  View, AsyncStorage,
  Text, StyleSheet,
  ImageBackground, TouchableOpacity
} from 'react-native';
import { Card, CardItem, Button, Item, Label, Input, Container, Content } from 'native-base';
import Modal from "react-native-modal";
const HomeCards = (obj) => {
  return <View flex={1} style={styles.home} >
    <Card>
      <CardItem button button onPress={obj.doctores} >
        <ImageBackground blurRadius={1} resizeMode='cover' source={{ uri: "https://cdn.aarp.net/content/dam/aarp/health/healthy-living/2018/03/1140-patient-memory-recall.imgcache.rev853817f01aa4fbfebf56cebad6d639aa.jpg" }} style={styles.homeImages}>
          <View flex={1} style={styles.boxes} >
            {/* <TouchableOpacity> */}
            <Text style={[styles.homeTitles, { marginVertical: 70 }]} >¿Cuál doctor?</Text>
            {/* </TouchableOpacity> */}
          </View>
        </ImageBackground>
      </CardItem>
    </Card>
    <Card>
      <CardItem button onPress={obj.centros}>
        <ImageBackground blurRadius={1} source={{ uri: "https://www.teleradioamerica.com/wp-content/uploads/2017/05/Hospital-Dr.-Ney-Arias-Lora.jpg" }} style={[styles.homeImages]}>
          <View flex={1} style={styles.boxes} >
            {/* <TouchableOpacity> */}
            <Text style={[styles.homeTitles, { marginVertical: 70 }]} >¿Dónde ir?</Text>
            {/* </TouchableOpacity> */}
          </View>
        </ImageBackground>
      </CardItem>
    </Card>
    <Card>
      <CardItem button onPress={obj.diagnostico} >
        <ImageBackground blurRadius={1} source={{ uri: "https://radiofelicidad.mx/wp-content/uploads/2018/01/enfermo-1.jpg" }} style={styles.homeImages}>
          <View flex={1} style={styles.boxes} >
            {/* <TouchableOpacity> */}
            <Text style={[styles.homeTitles, { marginVertical: 70 }]} >¿Qué tengo?</Text>
            {/* </TouchableOpacity> */}
          </View>
        </ImageBackground>
      </CardItem>
    </Card>
  </View>
}

export default class Home extends Component {
  state = {
    modal: false, username:""
  }

  componentDidMount() 
  {
    AsyncStorage.getItem("firstIni", (err, result) => {
      if(result != 1)
      {
        this.setState({modal:true})
      }
    })
  }

  handleModal = () => {
    // alert(this.state.modal)
    this.setState({ modal: false })
  }
  renderButton = () => (
    <TouchableOpacity onPress={this.handleModal}>
      <View style={styles.button}>
        <Text>Cerrar</Text>
      </View>
    </TouchableOpacity>
  );

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text style={{ fontWeight: "bold" }} >¿Cuál es tu nombre?</Text>
      <Text note>No será compartido a menos que así lo prefieras </Text>
      <Item floatingLabel>
        <Label>Escribir nombre</Label>
        <Input value={this.state.username} onChangeText={(username) => this.setState({username})} />
      </Item>
      <Button block primary onPress={this.saveName} >
        <Text style={{color:"white"}} >Aceptar</Text>
      </Button>
    </View>
  );

  saveName = async () =>
  {
    const {username} = this.state;
    if(username != "")
    {
      try {
        await AsyncStorage.setItem("username",username);
        AsyncStorage.setItem("firstIni", "1");        
      } catch(error) {
        console.log("Error on saving: " + error);
        // alert(error)
      }
      // alert(username);
    }
    this.setState({ modal: false });
  }  

  render() {
    const { centros, doctores, diagnostico } = this.props
    const { modal } = this.state    
    
    return (
      <View style={{ flex: 1 }} >
        <HomeCards centros={centros} doctores={doctores} diagnostico={diagnostico}/>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    margin: 15
  },
  homeTitles: {
    fontSize: "bold", textAlign: "center", textAlignVertical: "center", fontSize: 45,
    color: "rgba(255,255,255,1)"
  },
  homeImages: {
    width: 400, height: 300,
    left: 0,
    right: 0,
    margin: -20
  },

  boxes: {
    backgroundColor: "rgba(129,212,250,0.5)"
  }
})