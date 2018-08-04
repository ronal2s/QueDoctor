import React, {Component} from 'react'
import {Image, ScrollView, Text,} from 'react-native'
import { Card, CardItem, Body, Left, Button, Icon, Right} from 'native-base'
import {createStackNavigator} from 'react-navigation'
import Comments from './comments'
const GenerateCards = (obj) =>
{
    const navigate = obj.navigate
    // console.warn(obj.centros)
    // const centros = obj.centros != undefined? obj.centros: [];
    // console.warn(obj.centros)
    return obj.centros.map((v,i) => {
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
                <Button transparent onPress={() => obj.handleLike(i)}  >
                    <Icon  style={obj.liked[i]?"":{color: 'gray'}} name="thumbs-up"/>
                    <Text>{" " + v.likes + " Likes"}</Text>
                </Button>
            </Left>
            <Body>
                <Button transparent onPress={() => navigate.push("Commentx", {prueba: "funciona"})} >
                    <Icon style={{color: "gray"}} name="chatbubbles"/>
                    <Text>Comentarios</Text>
                </Button>
            </Body>
            <Right>
                <Button transparent>
                    <Icon style={{color: "gray"}} name="map"/>
                    <Text> Cómo llegar</Text>
                </Button>
            </Right>
        </CardItem>
    </Card>
    })
}
class Centros extends Component
{
    state = 
    {
        liked: [false,false,false,false],
        likes: [126,133,12,89],
        city: "", centros:[]
    }

    componentDidMount()
    {
        const city = this.props.navigation.getParam("city");
        alert(this.state.city)
        // console.warn(this.props.navigation)
        this.setState({city});
        
        if(city == "all")
        {
            this.getCentrosTodos();
        }
        // this.getCentrosTodos("");

        
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



    handleLike = (numHospital) => {
        // alert(numHospital)
        var {liked, likes} = this.state;
        likes[numHospital] = liked[numHospital]? likes[numHospital] - 1: likes[numHospital] + 1;
        liked[numHospital] = liked[numHospital]?false:true;
        this.setState({likes, liked})
        
    }

    static navigationOptions = {
        header: null
        // title: "asdaasdsa"
    }

    render()
    {
        const {centros, liked, likes} = this.state;
        // console.warn(centros)
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