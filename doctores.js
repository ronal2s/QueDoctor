import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, AsyncStorage, Alert, Linking } from 'react-native'
import { Card, CardItem, Picker, Item, Icon, Fab, Textarea, View, Form, Content, Button, Body, List, ListItem, Left, Thumbnail, Right, Spinner, Container, Input } from 'native-base'
import { Avatar, Divider } from 'react-native-elements'
import moment from 'moment'
import Modal from "react-native-modal";
import { createStackNavigator } from 'react-navigation'
import Comments from './commentsDoctores'

const AddDoctor = (obj) => {
    return <View style={styles.modalContent}>

        <Text style={{fontWeight:"bold", fontSize: 22, textAlign: "center"}} >¿Quién fue tú Doctor?</Text>
        <Item>
            <Input placeholder="Nombre del doctor" value={obj.nombres} onChangeText={(text) => obj.handleFormChange(text, "nombres")} />
        </Item>
        <Item>
            <Input placeholder="Apellidos" value={obj.apellidos} onChangeText={(text) => obj.handleFormChange(text, "apellidos")} />
        </Item>
        <Item picker>
            <Picker
                mode="dropdown"
                placeholder="Seleccionar"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={obj.valueEspecialidad}
                // onValueChange={obj.handlePickerNombre}
                onValueChange={(text) => obj.handleFormChange(text, "valueEspecialidad")}
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
                // onValueChange={obj.handlePickerCentro}
                onValueChange={(text) => obj.handleFormChange(text, "idCentro")}
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
                // onValueChange={obj.handlePickerNombre}
                onValueChange={(text) => obj.handleFormChange(text, "valueServicio")}
            >
                <Picker.Item label="¿Que tal fue la experiencia?" value="0" />
                <Picker.Item label="Recomendado" value="recomendado" />
                <Picker.Item label="Aceptable" value="aceptable" />
                <Picker.Item label="No recomendado" value="noRecomendado" />
            </Picker>
        </Item>

        {/* <Content> */}
        <Form>
            <Textarea rowSpan={2} value={obj.comment} onChangeText={(text) => obj.handleFormChange(text, "comentario")} placeholder="Cuéntanos un poquito más" />
            <Button block style={{ backgroundColor: '#03a9f4' }} onPress={obj.agregarDoctor} ><Text style={{ color: "white" }} >Enviar</Text></Button>
        </Form>
    </View>
}


const Doctores = (obj) => {
    var thisliked = false;
    const navigate = obj.navigate;
    if (!obj.loading) {
        if (obj.doctores.length > 0) {
            return obj.doctores.map((v, i) => {
                numColor = Math.floor(Math.random() * (5 - 0) + 0)
                thisliked = false;
                if (obj.liked != undefined) {
                    for (let x = 0; x < obj.liked.length; x++) {
                        // alert(obj.liked[x].idcentro + " - " + v.id)
                        if (obj.liked[x].iddoctor == v.id) {
                            thisliked = true;
                            break;
                        }
                    }
                }


                return <Card key={i} >
                    <CardItem style={{ backgroundColor: v.verificado ? "white" : "#ffe0b2" }} >
                        <Body>
                            <Text style={{ fontWeight: "bold" }} >{v.nombres + ' ' + v.apellidos}</Text>
                            <Text note>{v.especialidad + " en el centro médico " + v.centro}</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => Alert.alert("Aviso","Un nombre verificado es aquel que hemos comprobado que está escrito correctamente y además, que trabaja en el lugar mencionado")}>
                                <Text>{v.verificado ? "" : "Nombre no verificado"}</Text>
                            </Button>
                        </Right>
                    </CardItem>

                    <CardItem style={{ backgroundColor: v.verificado ? "white" : "#ffe0b2" }}>
                        <Left>
                            <Button transparent onPress={() => obj.handleLike(v.id)}  >
                                <Icon style={{color: thisliked?'#03a9f4':'gray'}} name="thumbs-up" />
                                <Text>{" " + v.likes + " Likes"}</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Button transparent onPress={() => navigate.push("Commentx", { idDoctor: v.id })} >
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
        return <Spinner color='#03a9f4'/>
    }



}

class classComments extends Component {
    state =
        {
            valueServicio: "0", valueEspecialidad: "0", date: moment(new Date()).format("DD/MM/YYYY"), comment: "",
            avatarColors: ["#d32f2f", "#7b1fa2", "#1976d2", "#388e3c", "#ffa000", "#e64a19"],
            comments: [], username: "", idCentro: "", modal: false, loading: true,
            doctor: { nombres: "", apellidos: "", valueEspecialidad: "", valueServicio: "", comentario: "", idCentro: "" },
            doctores: [], centros: [{ id: -1, nombre: "Seleccionar centro médico" }], liked: [], date: moment(new Date()).format("DD/MM/YYYY"),
            alertMessage:false, 
            especialidades: ["Opcion","Pediatra", "Dermatología", "Ginecología","Oftalmología","Urología"], valueFiltro:"Todos"
        }


    componentDidMount() {
        
        // especialidadesFiltro.unshift("Todos")
        this.props.navigation.setParams({especialidades: this.especialidades(this.state.especialidades, 0), valueFiltro: this.state.valueFiltro, handleFiltro: this.handleFiltro})        

        AsyncStorage.getItem("username", (err, result) => {
            if (!err) {
                this.setState({ username: result })
                AsyncStorage.getItem("userCode", (err, result) => {
                    this.setState({userCode: result})
                    fetch("https://serverquedoctor.herokuapp.com/usuarioActual?usuario="+this.state.username+"&code="+this.state.userCode);
                    
                })
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
        const { doctor, username, date } = this.state;
        // alert("x")
        // const {nombres, apellidos, especialidad, verificado, agregadoPor, idCentro} = req.query;
        const response = await fetch("https://serverquedoctor.herokuapp.com/doctores/agregar?nombres=" + doctor.nombres + "&apellidos=" + doctor.apellidos + "&especialidad=" + doctor.valueEspecialidad + "&verificado=" + false + "&agregadoPor=" + username + "&idCentro=" + doctor.idCentro + "&recomendado=" + doctor.valueServicio + "&fecha=" + date + "&comentario=" + doctor.comentario);
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
            .then(res => {
                var { centros } = this.state;
                // centros.concat(res)
                // centros.unshift(res)
                Array.prototype.push.apply(centros,res);
                this.setState({ centros })
            })
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



    handleLike = (idDoctor) => {
        this.fetchLike(idDoctor)
            .then(res => {
                this.setState({ doctores: res })
                this.getMisLikes();
            })
            .catch(err => console.log(err));
    }

    fetchLike = async (idDoctor) => {
        const response = await fetch("https://serverquedoctor.herokuapp.com/doctores/like?idDoctor=" + idDoctor);
        const body = response.json();
        if (response.status != 200) throw Error(body.message)
        return body;
    }

    handleComment = (text) => {
        var { doctor } = this.state;
        doctor = { nombres: doctor.nombres, apellidos: doctor.apellidos, valueEspecialidad: doctor.valueEspecialidad, valueServicio: doctor.valueServicio, comentario: text, idCentro: doctor.idCentro }
        this.setState({ doctor })
    }

    static navigationOptions =  {
        header: null
        // return {header: (<Item style={{backgroundColor: "white", borderColor:"white"}} picker>
        //         <Picker
    
        //             mode="dropdown"
        //             placeholder="Seleccionar"
        //             iosIcon={<Icon name="ios-arrow-down-outline" />}
        //             placeholderStyle={{ color: "#bfc6ea" }}
        //             placeholderIconColor="#007aff"
        //             selectedValue={navigation.getParam("valueFiltro")}
        //             // onValueChange={obj.handlePickerNombre}
        //             onValueChange={(text) => navigation.getParam("handleFiltro")(text)}
        //         >
        //             {/* <Picker.Item value="" label="Todos"/> */}
        //             {navigation.getParam("especialidades")}
        //         </Picker>
        //     </Item>)
        // }
    }

handleFiltro = (text) =>
{
    // alert(text)
    this.setState({valueFiltro: text, loading:true})
    
    this.fetchFiltros(text)
    .then(res => this.setState({doctores: res, valueFiltro: text, loading:false}))
    .catch(err => {
        Alert.alert("Error", "Ha ocurrido un error, intentar más tarde")
        console.log(err)
        // this.setState({loading:false})
    })
}


fetchFiltros = async(esp) =>
{    
    const response = await fetch("https://serverquedoctor.herokuapp.com/doctores/filtro?esp="+esp)
    const body = response.json()
    if(response.status != 200) throw Error(body.message)
    return body;
}

    handleFormChange = (text, obj) => {
        var { doctor } = this.state;
        doctor[obj] = text;
        // alert(doctor[obj])
        this.setState({ doctor })
    }

    especialidades = (especialidades, opcion) => {        
        especialidades[0] = "Seleccionar especialidad"
        if(opcion == 0)
        {
            especialidades[0] = "Todos"
        }
        return especialidades.map((v, i) => {
            return <Picker.Item label={v} value={v} />
        })
    }
    
    
    centros = (centros) => {
        return centros.map((v, i) => {

            return <Picker.Item label={v.nombre} value={v.id} />
        })
    }

    getMisLikes = () => {
        this.fetchMisLikes()
            .then(res => this.setState({ liked: res }))
            .catch(err => console.log(err));
    }
    agregarDoctor = () => {
        var { doctor } = this.state;
        // Alert.alert("Ha ocurrido un error", doctor.idCentro)
        if (doctor.nombres != "") {
            if (doctor.apellidos != "") {
                if (doctor.valueEspecialidad != "") {
                    if (doctor.idCentro != "") {
                        if (doctor.valueServicio != "") {
                            if (doctor.comentario != "") {
                                this.fetchAgregar()
                                    .then(res => this.setState({ doctores: res, modal: false }))
                                    .catch(err => {
                                        console.log(err)
                                        Alert.alert("Ha ocurrido un error", "Favor intentar más tarde")
                                    });
                            } else {
                                Alert.alert("Ha ocurrido un error", "Favor contarnos por qué es importante que ese Doctor esté aquí")
                            }
                        } else {
                            Alert.alert("Ha ocurrido un error", "Debe seleccionar que tal fue la experiencia con su Doctor")
                        }
                    } else {
                        Alert.alert("Ha ocurrido un error", "Debe seleccionar el centro médico donde labora el Doctor")
                    }
                } else {
                    Alert.alert("Ha ocurrido un error", "Debe seleccionar cual es la especialidad del Doctor")
                }
            } else {
                Alert.alert("Ha ocurrido un error", "El campo de apellidos no debe estar vacío")
            }
        } else {
            // alert("Debe escribir el nombre del Doctor");
            Alert.alert("Ha ocurrido un error", "Debe escribir el nombre del Doctor");
        }

    }

    fetchMisLikes = async () => {
        const response = await fetch("https://serverquedoctor.herokuapp.com/doctores/misLikes");
        const body = response.json();
        if (response.status != 200) throw Error(body.message)
        return body;
    }

    render() {
        const { doctor, avatarColors, liked, doctores, username, centros, modal, loading, especialidades } = this.state
        // var especialidades = ["Seleccionar especialidad", "Pediatra"]
        // console.warn(comments)
        return (
            <Container style={{ backgroundColor: "white" }}>
                <ScrollView  >

                    {/* <AddDoctor comment={comment} handleComment={this.handleComment} enviarComentario={this.agregarComentario} handlePickerNombre={this.handlePickerNombre} handlePickerServicio={this.handlePickerServicio}
                         valueServicio={valueServicio} valueNombre={valueNombre} username={username} /> */}
                         <Item style={{backgroundColor: "white", borderColor:"white"}} picker>
                <Picker
    
                    mode="dropdown"
                    placeholder="Seleccionar"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.valueFiltro}
                    // onValueChange={obj.handlePickerNombre}
                    onValueChange={(text) => this.handleFiltro(text)}
                >
                    {this.especialidades(especialidades,0)}
                </Picker>
            </Item>
                    <Divider />
                    <Doctores navigate={this.props.navigation} liked={liked} handleLike={this.handleLike} loading={loading} actualUser={username} colors={avatarColors} doctores={doctores} />
                </ScrollView>
                <View style={{ flex: 1 }} >
                    <Fab
                        active={this.state.active}
                        //#03a9f4
                        containerStyle={{}}
                        style={{ backgroundColor: '#03a9f4' }}
                        position="bottomRight"
                        onPress={() => this.setState({ modal: true })}>
                        <Icon type="MaterialIcons" name="person-add" />

                    </Fab>
                </View>
                <Modal
                    isVisible={modal}
                    animationIn="slideInLeft"
                    animationOut="slideOutRight"
                    onBackdropPress={() => this.setState({ modal: false })}
                >
                    <AddDoctor centros={this.centros(centros)} especialidades={this.especialidades(especialidades,1)} comment={doctor.comentario}
                        handleComment={this.handleComment} agregarDoctor={this.agregarDoctor} handlePickerCentro={this.handlePickerCentro}
                        handlePickerServicio={this.handlePickerServicio} nombres={doctor.nombres} apellidos={doctor.apellidos} handleFormChange={this.handleFormChange}
                        valueServicio={doctor.valueServicio} valueEspecialidad={doctor.valueEspecialidad} valueCentro={doctor.idCentro} username={username} />
                </Modal>
            </Container>
        )
    }
}
const RootStack = createStackNavigator(
    {
        Home: classComments,
        Commentx: Comments,
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