import React, {Component} from 'react'
import {Image, View,ImageBackground,ScrollView, Text, AsyncStorage, Linking} from 'react-native'
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
                <ImageBackground source={{uri: v.image}} style={{height:200, width:400, margin: 3, flex:1}}>
                <View flex={1} style={{backgroundColor: "rgba(129,212,250,0.3)"}} />
                </ImageBackground>
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
        city: "", centros:[], actualUser:"", loading:true, userCode:""
    }

    componentDidMount()
    {        
        this.getCentrosTodos();     
        this.getMisLikes();
        AsyncStorage.getItem("username", (err, result) => {
            if(!err)
            {
                // alert(result)
                this.setState({actualUser: result});
                AsyncStorage.getItem("userCode", (err, result) => {
                    this.setState({userCode: result}); 
                    fetch("https://serverquedoctor.herokuapp.com/usuarioActual?usuario="+this.state.actualUser+"&code="+this.state.userCode);
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

    fetchCentrosTodos = async () => {
        const response = await fetch("https://serverquedoctor.herokuapp.com/centros/");
        const body = response.json();
        if(response.status != 200) throw Error(body.message)
        return body;
    }

    getCentrosTodos = () => {
        this.fetchCentrosTodos()
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
        // alert(liked)
        // if(liked)
        // {
        //     this.fetchUnLike(idCentro)
        //         .then(res => {
        //             this.setState({centros: res})
        //             this.getMisLikes();
        //         })
        //         .catch(err => console.log(err));
        //         this.getMisLikes();                            
        // } else {
        //     this.fetchLike(idCentro)
        //         .then(res => {
        //             this.setState({centros: res})
        //             this.getMisLikes();
        //         })
        //         .catch(err => console.log(err));
        //     }
            this.fetchLike(idCentro)
            .then(res => {
                this.setState({centros: res})
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
    }
)

export default class App extends Component {    
    render() {        
        return <RootStack/>
    }
}