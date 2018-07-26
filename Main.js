import React, { Component } from 'react';
import {
  AppRegistry, View,
  Text, StyleSheet,
  Image, ImageBackground, TouchableOpacity
} from 'react-native';
import { Drawer, Content, Spinner, Badge, Container, Card, CardItem, List, ListItem, Header, Left, Right, Button, Title, Tab, Tabs, Icon, Body, Separator, Fab } from 'native-base';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppHeader = function (func) {
  //console.log(func)
  return <Header style={styles.header} noShadow androidStatusBarColor={styles.statusBar}>
    <Left style={styles.leftHeader} >
      <Button transparent
        onPress={func.openDrawer}>
        <Icon name='menu' style={{ color: "black" }} />
      </Button>
    </Left>
    <Body >
      <Title style={{ color: "black" }} >¿Qué doctor?</Title>
    </Body>

    <Right>
      <Button transparent>
        {/* <Icon name='alert' style={{color:'red'}} /> */}
        <Text style={{ color: 'black' }} >911</Text>
      </Button>
    </Right>

  </Header>
}

const Home = () =>
{
  return         <View flex={1} style={styles.home} >
        
  <Card>
    <CardItem button >
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
}

const ContentDrawer = () =>
{
  return <View flex={1} >
  <View flex={1} style={styles.caja1} >
    <ImageBackground blurRadius={1} source={{ uri: "https://images.visitarepublicadominicana.org/Monumento-a-los-Heroes-de-la-Restauracion-Republica-Dominicana.jpg" }} style={styles.drawerImages}>
      <View flex={1} style={styles.optionsCity} >
        <TouchableOpacity>
          <Text style={[styles.drawerTitles, { marginVertical: 60 }]} >Santiago</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
  <View flex={1} style={styles.caja1} >
    <ImageBackground blurRadius={1} source={{ uri: "https://1.bp.blogspot.com/-AU37w-3VPk4/WpBbqo8AhGI/AAAAAAADfSU/0-1Gd0q4KOY5v342VcYaFIrVzDkYjSoMgCLcBGAs/s1600/plazabanderaaerea.png" }} style={styles.drawerImages}>
      <View flex={1} style={styles.optionsCity} >
        <TouchableOpacity>
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
      title: "¿Qué Doctor?", 
      headerTintColor: "black",       
      headerLeft: (
        <Button transparent onPress={navigation.getParam('openDrawer')}>
        <Icon name='menu' style={{ color: "black" }} />
      </Button>
      ),
      
    }
    // headerTitle instead of title
    // headerTitle: <AppHeader openDrawer={() => this.drawer._root.open()} />,
    
  };
  render() {
    const { active, blurImages } = this.state
    return (
      <Drawer
        openDrawerOffset={0.5}
        panCloseMask={0.5}
        ref={(ref) => { this.drawer = ref; }}
        content={
          <ContentDrawer/>
        }
        onClose={() => this.closeDrawer()} >
        {/* <AppHeader openDrawer={this.openDrawer} /> */}
        
          <Home/>
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


const styles = StyleSheet.create({
  home: {
    margin: 15
  },
  homeTitles: {
    fontSize: "bold", textAlign: "center", textAlignVertical: "center", fontSize: 45,
    color: "rgba(255,255,255,1)"
  },
  drawerTitles: {
    fontSize: "bold", textAlign: "center", textAlignVertical: "center", fontSize: 25,
    color: "rgba(255,255,255,1)"
  },
  drawerTitles: {
    fontSize: "bold", textAlign: "center", textAlignVertical: "center", fontSize: 25 ,
    color: "rgba(255,255,255,1)"
  },
  homeImages: {
    width: 400, height:300,  
    left: 0,
    right: 0,
    margin: -20
  },
  drawerImages: {
    width: '100%', height:300,  
  },
  optionsCity: {
    backgroundColor: "rgba(165,214,167,0.5)"
  },
  boxes: {
    backgroundColor: "rgba(129,212,250,0.5)"
  },
  caja1: {
    backgroundColor: 'rgba(128,222,234, 0.5)',
  },
  caja2: {
    backgroundColor: "rgba(128,203,196,0.5)",

  },
  caja3: {
    backgroundColor: "rgba(165,214,167,0.5)",
    // margin: 15,
    // borderRadius: 10
  },
  footerButtons: {
    color: "white"
  },
  header: {
    // backgroundColor: "#29b6f6",
    backgroundColor: "transparent",
    // backgroundImage: "http://www.besthealthmag.ca/wp-content/uploads/2016/01/doctor_2.jpg"
  },
  leftHeader: {
    flex: 0,
    paddingLeft: 6,
    width: 62
  },
  drawerContainer: {
    backgroundColor: "rgba(156,204,101,0.5)"
  },
  listText: {
    color: "black"
  }
})

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

// module.exports = Main;