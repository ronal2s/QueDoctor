import React, { Component } from 'react';
import {
  View,
  Text, StyleSheet,
  ImageBackground, TouchableOpacity
} from 'react-native';
import { Card, CardItem, Button, Item, Label, Input, Container, Content } from 'native-base';
import Modal from "react-native-modal";
const HomeCards = (obj) => {
  return <View flex={1} style={styles.home} >
    <Card>
      <CardItem button onPress={obj.windowDetails} >
        <ImageBackground blurRadius={1} resizeMode='cover' source={{ uri: "http://www.besthealthmag.ca/wp-content/uploads/2016/01/doctor_2.jpg" }} style={styles.homeImages}>
          <View flex={1} style={styles.boxes} >
            {/* <TouchableOpacity> */}
            <Text style={[styles.homeTitles, { marginVertical: 70 }]} >¿Cuál doctor?</Text>
            {/* </TouchableOpacity> */}
          </View>
        </ImageBackground>
      </CardItem>
    </Card>
    <Card>
      <CardItem button>
        <ImageBackground blurRadius={1} source={{ uri: "https://storage.googleapis.com/mmc-elcaribe-bucket/uploads/2017/12/fcd8b684-homs-fe.jpg" }} style={styles.homeImages}>
          <View flex={1} style={styles.boxes} >
            {/* <TouchableOpacity> */}
            <Text style={[styles.homeTitles, { marginVertical: 70 }]} >¿Dónde ir?</Text>
            {/* </TouchableOpacity> */}
          </View>
        </ImageBackground>
      </CardItem>
    </Card>
    <Card>
      <CardItem button>
        <ImageBackground blurRadius={1} source={{ uri: "https://www.betootaadvocate.com/wp-content/uploads/2017/12/dad-directions.jpg" }} style={styles.homeImages}>
          <View flex={1} style={styles.boxes} >
            {/* <TouchableOpacity> */}
            <Text style={[styles.homeTitles, { marginVertical: 70 }]} >¿Cómo llegar?</Text>
            {/* </TouchableOpacity> */}
          </View>
        </ImageBackground>
      </CardItem>
    </Card>
  </View>
}

export default class Home extends Component {
  state = {
    modal: true
  }

  handleModal = () => {
    alert(this.state.modal)
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
        <Input />
      </Item>
      <Button block primary ><Text style={{color:"white"}} >Aceptar</Text></Button>
    </View>
  );
  render() {
    const { windowDetails } = this.props
    const { modal } = this.state
    // alert(modal)
    return (
      <View style={{ flex: 1 }} >
        <HomeCards windowDetails={windowDetails} />
        <Modal
          isVisible={modal}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          onBackdropPress={() => this.setState({ modal: false })}
        >
          {this.renderModalContent()}
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    margin: 15
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
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