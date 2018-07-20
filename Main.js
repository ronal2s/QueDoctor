import React, { Component } from 'react';
import {
  AppRegistry, View,
  Text, StyleSheet,
  Image, ImageBackground,
} from 'react-native';
import { Drawer, Content, Spinner, Badge, Container, Card, CardItem, List, ListItem, Header, Left, Right, Button, Title, Tab, Tabs, Icon, Body, Separator, Fab } from 'native-base';
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
export default class Main extends Component {
  state = {
    active: false
  }
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
  render() {
    const {active} = this.state
    return (
      <Drawer
        openDrawerOffset={0.5}
        panCloseMask={0.5}
        ref={(ref) => { this.drawer = ref; }}
        content={
          // <ImageBackground source={{uri: "https://www.barovaja.com/uploads/images/hero-doctor1.jpg"}} style={{width:200, height:"100%"}} >
          //   <Container  style={styles.drawerContainer}>
          //     <Content>

          //     </Content>
          //   </Container>
          // </ImageBackground >  

          <View  flex={1} >
            <Card>
              <CardItem cardBody button lisItemPadding={0} >
                <ImageBackground source={{ uri: "http://www.besthealthmag.ca/wp-content/uploads/2016/01/doctor_2.jpg" }} style={styles.homeImages}>
                  <View flex={1} style={styles.caja1} >
                    <Text style={styles.homeTitles} >Santiago</Text>
                  </View>
                </ImageBackground>
              </CardItem>
            </Card>
            <Card>
              <CardItem cardBody button >
                <ImageBackground source={{ uri: "http://www.besthealthmag.ca/wp-content/uploads/2016/01/doctor_2.jpg" }} style={styles.homeImages}>
                  <View flex={1} style={styles.caja1} >
                    <Text style={styles.homeTitles} >Santo Domingo</Text>
                  </View>
                </ImageBackground>
              </CardItem>
            </Card>
            <Card>
              <CardItem cardBody button >
                <ImageBackground source={{ uri: "http://www.besthealthmag.ca/wp-content/uploads/2016/01/doctor_2.jpg" }} style={styles.homeImages}>
                  <View flex={1} style={styles.caja1} >
                    <Text style={styles.homeTitles} >La vega</Text>
                  </View>
                </ImageBackground>
              </CardItem>
            </Card>
            <Card>
              <CardItem cardBody button >
                <ImageBackground source={{ uri: "http://www.besthealthmag.ca/wp-content/uploads/2016/01/doctor_2.jpg" }} style={styles.homeImages}>
                  <View flex={1} style={styles.caja1} >
                    <Text style={styles.homeTitles} >Macoris</Text>
                  </View>
                </ImageBackground>
              </CardItem>
            </Card>
          </View>
        }
        onClose={() => this.closeDrawer()} >
        <AppHeader openDrawer={this.openDrawer} />
        <View flex={1} style={styles.home}>
          <Card>
            <CardItem cardBody button >
              <ImageBackground source={{ uri: "http://www.besthealthmag.ca/wp-content/uploads/2016/01/doctor_2.jpg" }} style={styles.homeImages}>
                <View flex={1} style={styles.caja1} >
                  <Text style={styles.homeTitles} >¿Qué doctor?</Text>
                </View>
              </ImageBackground>
            </CardItem>
          </Card>
          <Card   >
            <CardItem cardBody button >
              <ImageBackground source={{ uri: "https://storage.googleapis.com/mmc-elcaribe-bucket/uploads/2017/12/fcd8b684-homs-fe.jpg" }} style={styles.homeImages}>
                <View flex={1} style={styles.caja2} >
                  <Text style={styles.homeTitles} >¿Cual clínica?</Text>
                </View>
              </ImageBackground>
            </CardItem>
          </Card>
          <Card>
            <CardItem cardBody button >
              <ImageBackground source={{ uri: "https://www.betootaadvocate.com/wp-content/uploads/2017/12/dad-directions.jpg" }} style={styles.homeImages}>
                <View flex={1} style={styles.caja3} >
                  <Text style={styles.homeTitles} >¿Cómo llegar?</Text>
                </View>
              </ImageBackground>
            </CardItem>
            <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ position: "absolute"}}
            style={{ backgroundColor: 'orange',position: "absolute"}}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="warning" />
            <Button style={{backgroundColor: "red"}}>
              <Text>911</Text>
            </Button>            
            {/* <Button disabled style={{ backgroundColor: '#DD5144' }}>
              <Icon name="mail" />
            </Button> */}
          </Fab>
          </Card>          
        </View>        
      </Drawer >
    );
  }
}
const styles = StyleSheet.create({
  home: {
    
    // backgroundColor: ""
    // justifyContent: "center", 
    // alignContent: "center",
    // flexDirection: "column",
    // textAlign: "center"
  },
  homeTitles: {
    marginVertical: 80, fontSize: "bold", textAlign: "center", textAlignVertical: "center", color: "white", fontSize: 45
  },
  homeImages: {
    width: '100%', height: 200, resizeMode: "stretch"
  },
  caja1: {
    backgroundColor: 'rgba(128,222,234, 0.5)',
    // backgroundImage: "http://www.besthealthmag.ca/wp-content/uploads/2016/01/doctor_2.jpg"
    // margin: 15,    
    // borderRadius: 10

  },
  caja2: {
    backgroundColor: "rgba(128,203,196,0.5)",
    // margin: 15,
    // borderRadius: 10
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
    backgroundColor: "transparent"
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
module.exports = Main;