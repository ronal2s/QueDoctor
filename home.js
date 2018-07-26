import React, { Component } from 'react';
import {
  AppRegistry, View,
  Text, StyleSheet,
  Image, ImageBackground, TouchableOpacity
} from 'react-native';
import {Card, CardItem} from 'native-base';

export default class Home extends Component {
  render()
  {
    const {windowDetails} = this.props
    return(
      <View flex={1} style={styles.home} >        
  <Card>
    <CardItem button onPress={windowDetails} >
         <ImageBackground blurRadius={1} resizeMode='cover' source={{ uri: "http://www.besthealthmag.ca/wp-content/uploads/2016/01/doctor_2.jpg" }} style={styles.homeImages}>
           <View flex={1} style={styles.boxes} >
           {/* <TouchableOpacity> */}
             <Text style={[styles.homeTitles, { marginVertical: 70 }]} >¿Qué doctor?</Text>
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
             <Text style={[styles.homeTitles, { marginVertical: 70 }]} >¿Cuál clínica?</Text>
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
    width: 400, height:300,  
    left: 0,
    right: 0,
    margin: -20
  },
  
  boxes: {
    backgroundColor: "rgba(129,212,250,0.5)"
  }
})