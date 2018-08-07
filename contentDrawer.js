import React, { Component } from 'react';
import {
  AppRegistry, View,
  Text, StyleSheet,
  Image, ImageBackground, TouchableOpacity
} from 'react-native';
import { Drawer, Content, Spinner, Badge, Container, Card, CardItem, List, ListItem, Header, Left, Right, Button, Title, Tab, Tabs, Icon, Body, Separator, Fab } from 'native-base';

export default class contentDrawer extends Component {
    render()
    {
      const {centrosSantago, centrosSantoDomingo, centrosLaVega, centrosMacoris} = this.props;
        return(
            <View flex={1} >
  <View flex={1} style={styles.caja1} >
    <ImageBackground blurRadius={1} source={require("./santiago.jpg") } style={[styles.drawerImages, {marginTop: -50}]}>
      <View flex={1} style={styles.optionsCity} >
        <TouchableOpacity onPress={centrosSantago} >
          <Text style={[styles.drawerTitles, { marginTop: 110 }]} >Santiago</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
  <View flex={1} style={styles.caja1} >
    <ImageBackground blurRadius={1} source={require("./santodomingo.jpg")} style={[styles.drawerImages, {marginTop: -10}]}>
      <View flex={1} style={styles.optionsCity} >
        <TouchableOpacity onPress={centrosSantoDomingo} >
          <Text style={[styles.drawerTitles, { marginVertical: 60 }]} >Santo Domingo</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
  <View flex={1} style={styles.caja1} >
    <ImageBackground blurRadius={1} source={require("./lavega.jpg")} style={[styles.drawerImages]}>
      <View flex={1} style={styles.optionsCity} >
        <TouchableOpacity onPress={centrosLaVega} >
          <Text style={[styles.drawerTitles, { marginVertical: 60 }]} >La vega</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
  <View flex={1} style={styles.caja1} >
    <ImageBackground blurRadius={1} source={require("./macoris.jpg")} style={styles.drawerImages}>
      <View flex={1} style={styles.optionsCity} >
        <TouchableOpacity onPress={centrosMacoris}>
          <Text style={[styles.drawerTitles, { marginVertical: 60 }]} >Macoris</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
</View>
        )
    }
}

const styles = StyleSheet.create({
    home: {
      margin: 15
    },
    
    drawerTitles: {
      fontSize: "bold", textAlign: "center", textAlignVertical: "center", fontSize: 25,
      color: "rgba(255,255,255,1)"
    },
    
    drawerImages: {
      width: '100%', height:300,  
    },
    optionsCity: {
      backgroundColor: "rgba(165,214,167,0.5)"
    },
    
    caja1: {
      backgroundColor: 'rgba(128,222,234, 0.5)',
    },
    
  })