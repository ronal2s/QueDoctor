import React, {Component} from 'react'
import {Image, ScrollView, Text, AsyncStorage, Linking, ImageBackground, View, StyleSheet} from 'react-native'
import { Card, CardItem, Body, Left, Button, Icon, Right, Spinner, Container, Fab, Item, Label, Input} from 'native-base'
import {createStackNavigator} from 'react-navigation'
import Comments from './commentsCentros'
import Modal from "react-native-modal";
const GenerateCards = (obj) =>
{
    const navigate = obj.navigate
    var thisliked = false    
    if(obj.centros.length>0 && !obj.loading )
    {
        return obj.centros.map((v,i) => {
            thisliked=false;        
            if(obj.liked != undefined)
            {
                for(let x=0; x<obj.liked.length;x++)
                {
                    // alert(obj.liked[x].idcentro + " - " + v.id)
                    if(obj.liked[x].idcentro == v.id)
                    {
                        thisliked = true;
                        break;
                    }
                }
            }                  
            return <Card key={i} >
            <CardItem>
                <Body>
                    <Text>{v.nombre}</Text>
                    <Text note>{v.ciudad + ", " + v.direccion}</Text>
                </Body>
            </CardItem>
            <CardItem cardBody>
                {/* <Image source={{uri: v.image}} style={{height:200, width:200, flex:1}} /> */}
                <ImageBackground source={{uri: v.image}} style={{height:200, width:400, margin: 3, flex:1}}>
                <View flex={1} style={{backgroundColor: "rgba(129,212,250,0.3)"}} />
                </ImageBackground>
            </CardItem>
            <CardItem>
                <Left>
                    <Button transparent onPress={() => obj.handleLike(v.id, thisliked)}  >
                        <Icon  style={{color: thisliked?'#03a9f4':'gray'}} name="thumbs-up"/>
                        <Text>{" " + v.likes + " Likes"}</Text>
                    </Button>
                </Left>
                <Body>
                    <Button transparent onPress={() => navigate.push("Commentx", {idCentro: v.id})} >
                        <Icon style={{color: "gray"}} name="chatbubbles"/>
                        <Text>Comentarios</Text>
                    </Button>
                </Body>
                <Right>
                    <Button transparent onPress={() => Linking.openURL("https://www.google.com/maps/search/?api=1&query="+v.nombre+"+Hospital")} >
                        <Icon style={{color: "gray"}} name="map"/>
                        <Text> Cómo llegar</Text>
                    </Button>
                </Right>
            </CardItem>
        </Card>
        })
    }
    return <Spinner color='#03a9f4'/>
}
class Centros extends Component
{
    state = 
    {
        liked: [{idcentro: 'a'}],
        likes: [126,133,12,89],
        city: "", centros:[], actualUser:"", userCode:"", loading:true, modal:false, filtro:""
    }

    componentDidMount()
    {        
        // const city = this.props.navigation.getParam("ciudad");
        // alert(city)
        this.getCentrosCiudad("La Vega");     
        this.getMisLikes();
        AsyncStorage.getItem("username", (err, result) => {
            if(!err)
            {
                // alert(result)
                this.setState({actualUser: result});
                AsyncStorage.getItem("userCode", (err, result) => {
                    this.setState({userCode: result}); 
                    fetch("https://serverquedoctor.herokuapp.com/usuarioActual?usuario="+result+"&code="+result);
                })
                
            }
        })
    }

    

    getMisLikes = () =>
    {
        this.fetchMisLikes()
            .then(res => this.setState({liked: res}))
            .catch(err => console.log(err));
    }
    
    fetchMisLikes = async() => {
        const response = await fetch("https://serverquedoctor.herokuapp.com/centros/misLikes");
        const body = response.json();
        if(response.status != 200) throw Error(body.message)
        return body;
    }

    fetchCentrosCiudad = async (city) => {
        const response = await fetch("https://serverquedoctor.herokuapp.com/centros/ciudad?ciudad="+city);
        const body = response.json();
        if(response.status != 200) throw Error(body.message)
        return body;
    }

    getCentrosCiudad = (city) => {
        this.fetchCentrosCiudad(city)
            .then(res => this.setState({centros: res, loading:false}))
            .catch(err => console.log(err));
    }

    fetchLike = async(idCentro) =>
    {
        const response = await fetch("https://serverquedoctor.herokuapp.com/centros/like?idCentro="+idCentro);
        const body = response.json();
        if(response.status != 200) throw Error(body.message)
        return body;
    }
    fetchUnLike = async(idCentro) =>
    {
        const response = await fetch("https://serverquedoctor.herokuapp.com/centros/unlike?idCentro="+idCentro);
        const body = response.json();
        if(response.status != 200) throw Error(body.message)
        return body;
    }

    handleLike = (idCentro, liked) => {
        // alert(numHospital)
        // if(!liked)
        // {
        //     this.fetchLike(idCentro)
        //         .then(res => {
        //             // this.setState({centros: res})
        //             this.getCentrosCiudad("Santiago De Los Caballeros");                         
        //             this.getMisLikes();
        //         })
        //         .catch(err => console.log(err));
                
            
        // } else {
        //     this.fetchUnLike(idCentro)
        //         .then(res => {
        //             // this.setState({centros: res})
        //             this.getCentrosCiudad("Santiago De Los Caballeros");
        //             this.getMisLikes();
        //         })
        //         .catch(err => console.log(err));
        //         this.getMisLikes();
        //     }
        this.fetchLike(idCentro)
            .then(res => {
                // this.setState({centros: res})
                this.getCentrosCiudad("La Vega");
                this.getMisLikes();
            })
            .catch(err => console.log(err));
        
    }

    static navigationOptions = {
        header: null
        // title: "asdaasdsa"
    }
    fetchFiltro = async (value) => {
        const response = await fetch("https://serverquedoctor.herokuapp.com/centros/buscarEnCiudad?value=" + value+"&ciudad="+"La Vega");
        const body = response.json()
        if (response.status != 200) throw Error(body.message)
        return body;
    }
    getFiltro = (value) => {        
        this.fetchFiltro(value)
            .then(res => {
                this.setState({ centros: res, loading: false, filtro:"" })
            })
            .catch(err => {
                console.log(err)
                Alert.alert("Error", "Ha ocurrido un error, favor volver a intentar")
            })
    }

    filtro = () =>
    {
        this.setState({ modal: false, loading: true, centros:[] })
        const {filtro} = this.state;
        this.getFiltro(filtro);
    } 

    renderModalContent = () => {
        return <View style={styles.modalContent}>
            <Text style={{ fontWeight: "bold", fontSize: 22 }} >Buscar</Text>
            <Item floatingLabel>
                <Label>Dejar casilla vacía para obtener todo</Label>
                <Input value={this.state.filtro} onChangeText={(filtro) => this.setState({ filtro })} />
            </Item>
            <Button style={{ backgroundColor: '#03a9f4' }} block primary onPress={() => this.filtro(this.state.filtro)} >
                <Text style={{ color: "white" }} >Buscar</Text>
            </Button>
        </View>
    }

    render()
    {
        const {centros, liked, likes, modal, loading} = this.state;
        
        // console.warn(liked)
        return(
            <Container>
                <Modal
                    isVisible={modal}
                    animationIn="slideInLeft"
                    animationOut="slideOutRight"
                    onBackdropPress={() => this.setState({ modal: false })}>
                    
                    {this.renderModalContent()}
                </Modal>
                <ScrollView>                    
                    <GenerateCards loading={loading} centros={centros} navigate={this.props.navigation} handleLike={this.handleLike} liked={liked} likes={likes} />
                </ScrollView>


                <View style={{ flex: 1 }} >
                    <Fab
                        active={this.state.active}
                        //#03a9f4
                        containerStyle={{}}
                        style={{ backgroundColor: '#03a9f4' }}
                        position="bottomRight"
                        onPress={() => this.setState({ modal: true })}>
                        <Icon type="MaterialIcons" name="search" />

                    </Fab>
                </View>
            </Container>
        )}
    }
//Si pongo esta vaina entonces no me sirve getParam, pero si no lo pongo no me sirve el Commentx :D
const RootStack = createStackNavigator(
    {
        Home: Centros,
        Commentx: Comments,
    },
    {
        initialRouteName: "Home",
        initialRouteParams: {city:"si"}
    }
)

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

export default class App extends Component {    
    render() {        
        return <RootStack/>
    }
}