import React, {Component} from 'react'
import {Image, ScrollView, Text, AsyncStorage, Linking} from 'react-native'
import { Card, CardItem, Body, Left, Button, Icon, Right, Spinner} from 'native-base'
import {createStackNavigator} from 'react-navigation'
import Comments from './commentsCentros'

const GenerateCards = (obj) =>
{
    const navigate = obj.navigate
    var thisliked = false    
    if(obj.centros.length>0)
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
                <Image source={{uri: v.image}} style={{height:200, width:200, flex:1}} />
            </CardItem>
            <CardItem>
                <Left>
                    <Button transparent onPress={() => obj.handleLike(v.id, thisliked)}  >
                        <Icon  style={thisliked?"":{color: 'gray'}} name="thumbs-up"/>
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
    return <Spinner/>
}
class Centros extends Component
{
    state = 
    {
        liked: [{idcentro: 'a'}],
        likes: [126,133,12,89],
        city: "", centros:[], actualUser:""
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
                fetch("https://serverquedoctor.herokuapp.com/usuarioActual?usuario="+result);
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
            .then(res => this.setState({centros: res}))
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

    render()
    {
        const {centros, liked, likes} = this.state;
        
        // console.warn(liked)
        return(
            <ScrollView>
                <GenerateCards centros={centros} navigate={this.props.navigation} handleLike={this.handleLike} liked={liked} likes={likes} />
            </ScrollView>
        )
    }
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

export default class App extends Component {    
    render() {        
        return <RootStack/>
    }
}