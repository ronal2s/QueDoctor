import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, AsyncStorage } from 'react-native'
import { Card, CardItem, Picker, Item, Icon, Fab, Textarea, View, Form, Content, Button, Body, List, ListItem, Left, Thumbnail, Right, Spinner, Container, Input } from 'native-base'
import { Avatar, Divider } from 'react-native-elements'
import moment from 'moment'
import Modal from "react-native-modal";
import { createStackNavigator } from 'react-navigation'


const AddDoctor = (obj) => {
    return <View style={styles.modalContent}>

        <Text style={{ textAlign: "center" }} >¿Quién fue tú Doctor?</Text>
        <Item>
            <Input placeholder="Nombre del doctor" />
        </Item>
        <Item>
            <Input placeholder="Apellidos" />
        </Item>
        <Item picker>
            <Picker
                mode="dropdown"
                placeholder="Seleccionar"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={obj.valueEspecialidad}
                onValueChange={obj.handlePickerNombre}
            >
                {obj.especialidades}
            </Picker>
        </Item>
        <Item picker>
            <Picker
                mode="dropdown"
                placeholder="Seleccionar"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={obj.valueCentro}
                onValueChange={obj.handlePickerCentro}
            >
                {obj.centros}
            </Picker>
        </Item>
        <Item picker>
            <Picker

                mode="dropdown"
                placeholder="Seleccionar"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={obj.valueServicio}
                onValueChange={obj.handlePickerNombre}
            >
                <Picker.Item label="¿Que tal fue la experiencia?" value="0" />
                <Picker.Item label="Recomendado" value="recomendado" />
                <Picker.Item label="Aceptable" value="aceptable" />
                <Picker.Item label="No recomendado" value="noRecomendado" />
            </Picker>
        </Item>

        {/* <Content> */}
        <Form>
            <Textarea rowSpan={5} value={obj.comment} onChangeText={(text) => obj.handleComment(text)} placeholder="Cuéntanos un poquito más" />
            <Button block style={{ backgroundColor: '#03a9f4' }} onPress={obj.enviarComentario} ><Text style={{ color: "white" }} >Enviar</Text></Button>
        </Form>
    </View>
}


const Doctores = (obj) => {    
    var thisliked = false;    
    if (!obj.loading) {
        if (obj.doctores.length > 0) {
            return obj.doctores.map((v, i) => {
                numColor = Math.floor(Math.random() * (5 - 0) + 0)
                thisliked = false;
                if(obj.liked != undefined)
                {
                    for(let x=0; x<obj.liked.length;x++)
                    {
                        // alert(obj.liked[x].idcentro + " - " + v.id)
                        if(obj.liked[x].iddoctor == v.id)
                        {
                            thisliked = true;
                            break;
                        }
                    }
                }
                

                return <Card key={i} >
                    <CardItem style={{backgroundColor: v.verificado?"white":"#ffab40"}} >
                        <Body>
                            <Text style={{ fontWeight: "bold" }} >{v.nombres + ' ' + v.apellidos}</Text>
                            <Text note>{v.especialidad + " en el centro médico " + v.centro}</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => alert("Un nombre verificado es aquel que hemos comprobado que está escrito correctamente y además, que trabaja en el lugar mencionado")}>
                                <Text>{v.verificado?"Nombre verificado":"Nombre no verificado"}</Text>
                            </Button>                            
                        </Right>
                    </CardItem>

                    <CardItem style={{backgroundColor: v.verificado?"white":"#ffab40"}}>
                        <Left>
                            <Button transparent onPress={() => obj.handleLike(v.id)}  >
                                <Icon style={thisliked ? "" : { color: 'gray' }} name="thumbs-up" />
                                <Text>{" " + v.likes + " Likes"}</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Button transparent onPress={() => navigate.push("Commentx", { idCentro: v.id })} >
                                <Icon style={{ color: "gray" }} name="chatbubbles" />
                                <Text>Comentarios</Text>
                            </Button>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => Linking.openURL("https://www.google.com/maps/search/?api=1&query=" + v.centro + "+Hospital")} >
                                <Icon style={{ color: "gray" }} name="map" />
                                <Text> Cómo llegar</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
                // return <List key={i} on >
                //     <ListItem avatar >
                //         <Left>
                //             {/* <Thumbnail source={{uri: ""}}/> */}
                //             <Avatar size="small" rounded title={v.nombres != undefined ? v.nombres[0].toUpperCase() : ""} activeOpacity={0.7} overlayContainerStyle={{ backgroundColor: obj.colors[numColor] }} />
                //         </Left>
                //         <Body>
                //             <Text style={{ fontWeight: "bold" }} >{v.nombres + ' ' + v.apellidos}</Text>
                //             <Text>{"CENTRO"}</Text>                            
                //         </Body>
                //         <Right>
                //             <Text note>{"xxx"}</Text>
                //         </Right>
                //     </ListItem>
                // </List>
            })
        } else {
            return <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                <Text  >Sin doctores</Text>
            </View>
        }

    } else {
        return <Spinner />
    }



}

class classComments extends Component {
    state =
        {
            valueServicio: "0", valueEspecialidad: "0", date: moment(new Date()).format("DD/MM/YYYY"), comment: "",
            avatarColors: ["#d32f2f", "#7b1fa2", "#1976d2", "#388e3c", "#ffa000", "#e64a19"],
            comments: [], username: "", idCentro: "", modal: false, loading: true,
            doctor: { nombres: "", apellidos: "", valueEspecialidad: "", valueServicio: "", comentario: "", idCentro: "" },
            doctores: [], centros: [], liked: []
        }
    handlePickerServicio = (value: string) => {
        var { doctor } = this.state;
        doctor = { nombres: doctor.nombres, apellidos: doctor.apellidos, valueEspecialidad: doctor.valueEspecialidad, valueServicio: value, comentario: doctor.comentario, idCentro: doctor.idCentro }
        // this.setState({ valueServicio: value })
        this.setState({ doctor })
    }
    handlePickerEspecialidad = (value: string) => {
        var { doctor } = this.state;
        doctor = { nombres: doctor.nombres, apellidos: doctor.apellidos, valueEspecialidad: value, valueServicio: doctor.valueServicio, comentario: doctor.comentario, idCentro: doctor.idCentro }
        this.setState({ doctor })
    }
    handlePickerCentro = (value: string) => {
        var { doctor } = this.state;
        doctor = { nombres: doctor.nombres, apellidos: doctor.apellidos, valueEspecialidad: doctor.valueEspecialidad, valueServicio: doctor.valueServicio, comentario: doctor.comentario, idCentro: value }
        this.setState({ doctor })
    }

    componentDidMount() {
        // var idCentro = this.props.navigation.getParam("idCentro");
        // this.setState({ idCentro })
        // alert(idCentro)
        AsyncStorage.getItem("username", (err, result) => {
            if (!err) {
                this.setState({ username: result })
            } else {
                console.error(err)
            }
        })

        this.getDoctores();
        this.getCentros();
        this.getMisLikes();

    }


    // const {usuario, fecha, comentario, fkCentro} = req.query;
    fetchAgregar = async () => {
        const { doctor, username } = this.state;
        // alert("x")
        // const {nombres, apellidos, especialidad, verificado, agregadoPor, idCentro} = req.query;
        const response = await fetch("https://serverquedoctor.herokuapp.com/doctores/agregar?nombres=" + doctor.nombres + "&apellidos=" + doctor.apellidos + "&especialidad=" + doctor.valueEspecialidad + "&verificado=" + false + "&agregadoPor=" + username + "&idCentro=" + doctor.idCentro);
        const body = response.json();
        if (response.status != 200) throw Error(body.message)
        return body;
    }

    getDoctores = () => {
        this.fetchDoctores()
            .then(res => this.setState({ doctores: res, loading: false }))
            .catch(err => {
                alert("Error obteniendo comentarios")
                console.log(err)
            })
    }

    fetchDoctores = async () => {
        const response = await fetch("https://serverquedoctor.herokuapp.com/doctores");
        const body = response.json();
        if (response.status != 200) throw Error(body.message)
        return body;
    }
    getCentros = () => {
        this.fetchCentros()
            .then(res => this.setState({ centros: res }))
            .catch(err => {
                alert("Error obteniendo comentarios")
                console.log(err)
            })
    }

    fetchCentros = async () => {
        const response = await fetch("https://serverquedoctor.herokuapp.com/centros");
        const body = response.json();
        if (response.status != 200) throw Error(body.message)
        return body;
    }

    agregarComentario = (idCentro) => {
        this.fetchAgregar(idCentro)
            .then(res => {
                this.setState({ comments: res, comment: "", valueServicio: "0", modal: false })
            })
            .catch(err => {
                console.log(err);
                alert("Error obteniendo nuevos comentarios")
            })
    }

    handleLike = (idDoctor) => {
        this.fetchLike(idDoctor)
            .then(res => {
                this.setState({ doctores: res })
                this.getMisLikes();
            })
            .catch(err => console.log(err));
    }

    fetchLike = async(idDoctor) =>
    {
        const response = await fetch("https://serverquedoctor.herokuapp.com/doctores/like?idDoctor="+idDoctor);
        const body = response.json();
        if(response.status != 200) throw Error(body.message)
        return body;
    }

    handleComment = (text) => {
        this.setState({ comment: text })
    }

    static navigationOptions = {
        header: null
    }

    especialidades = (especialidades) => {
        return especialidades.map((v, i) => {

            return <Picker.Item label={v} value={v} />
        })
    }
    centros = (centros) => {
        return centros.map((v, i) => {

            return <Picker.Item label={v.nombre} value={v.nombre} />
        })
    }

    getMisLikes = () => {
        this.fetchMisLikes()
            .then(res => this.setState({ liked: res }))
            .catch(err => console.log(err));
    }

    fetchMisLikes = async () => {
        const response = await fetch("https://serverquedoctor.herokuapp.com/doctores/misLikes");
        const body = response.json();
        if (response.status != 200) throw Error(body.message)
        return body;
    }

    render() {
        const { doctor, avatarColors,liked, doctores, username, centros, modal, loading } = this.state
        const especialidades = ["Seleccionar especialidad", "Pediatra"]
        // console.warn(comments)
        return (
            <Container style={{ backgroundColor: "white" }}>
                <ScrollView  >

                    {/* <AddDoctor comment={comment} handleComment={this.handleComment} enviarComentario={this.agregarComentario} handlePickerNombre={this.handlePickerNombre} handlePickerServicio={this.handlePickerServicio}
                         valueServicio={valueServicio} valueNombre={valueNombre} username={username} /> */}
                    <Divider />
                    <Doctores liked={liked}  handleLike={this.handleLike} loading={loading} actualUser={username} colors={avatarColors} doctores={doctores} />
                </ScrollView>
                <View style={{ flex: 1 }} >
                    <Fab
                        active={this.state.active}
                        //#03a9f4
                        containerStyle={{}}
                        style={{ backgroundColor: '#03a9f4' }}
                        position="bottomRight"
                        onPress={() => this.setState({ modal: true })}>
                        <Icon type="MaterialCommunityIcons" name="comment-plus-outline" />

                    </Fab>
                </View>
                <Modal
                    isVisible={modal}
                    animationIn="slideInLeft"
                    animationOut="slideOutRight"
                    onBackdropPress={() => this.setState({ modal: false })}
                >
                    <AddDoctor centros={this.centros(centros)} especialidades={this.especialidades(especialidades)} comment={doctor.comentario} handleComment={this.handleComment} enviarComentario={this.agregarComentario} handlePickerNombre={this.handlePickerNombre} handlePickerServicio={this.handlePickerServicio}
                        valueServicio={doctor.valueServicio} valueEspecialidad={doctor.valueEspecialidad} username={username} />
                </Modal>
            </Container>
        )
    }
}
const RootStack = createStackNavigator(
    {
        Home: classComments,
        // Commentx: Comments,
    },
    {
        initialRouteName: "Home",
    }
)

const styles = StyleSheet.create({
    modalContent: {

        backgroundColor: "white",
        padding: 22,
        // justifyContent: "center",
        // alignItems: "center",
        borderRadius: 4,
        // borderColor: "rgba(0, 0, 0, 0.1)"
    },
})

export default class App extends Component {
    render() {
        return <RootStack />
    }
}