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
      const {centrosSantago, centrosSantoDomingo} = this.props;
        return(
            <View flex={1} >
  <View flex={1} style={styles.caja1} >
    <ImageBackground blurRadius={1} source={{ uri: "https://images.visitarepublicadominicana.org/Monumento-a-los-Heroes-de-la-Restauracion-Republica-Dominicana.jpg" }} style={styles.drawerImages}>
      <View flex={1} style={styles.optionsCity} >
        <TouchableOpacity onPress={centrosSantago} >
          <Text style={[styles.drawerTitles, { marginVertical: 60 }]} >Santiago</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
  <View flex={1} style={styles.caja1} >
    <ImageBackground blurRadius={1} source={{ uri: "https://1.bp.blogspot.com/-AU37w-3VPk4/WpBbqo8AhGI/AAAAAAADfSU/0-1Gd0q4KOY5v342VcYaFIrVzDkYjSoMgCLcBGAs/s1600/plazabanderaaerea.png" }} style={styles.drawerImages}>
      <View flex={1} style={styles.optionsCity} >
        <TouchableOpacity onPress={centrosSantoDomingo} >
          <Text style={[styles.drawerTitles, { marginVertical: 60 }]} >Santo Domingo</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
  <View flex={1} style={styles.caja1} >
    <ImageBackground blurRadius={1} source={{ uri: "https://static.panoramio.com.storage.googleapis.com/photos/large/21828857.jpg" }} style={styles.drawerImages}>
      <View flex={1} style={styles.optionsCity} >
        <TouchableOpacity>
          <Text style={[styles.drawerTitles, { marginVertical: 60 }]} >La vega</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
  <View flex={1} style={styles.caja1} >
    <ImageBackground blurRadius={1} source={{ uri: "http://www.cocnoticias.com/wp-content/uploads/2016/06/Catedral-San-Pedro-Apostol.jpg" }} style={styles.drawerImages}>
      <View flex={1} style={styles.optionsCity} >
        <TouchableOpacity>
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