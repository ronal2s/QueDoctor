import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, AsyncStorage, Alert } from 'react-native'
import { Card, CardItem, Picker, Item, Icon, Fab, Textarea, View, Form, Content, Button, Body, List, ListItem, Left, Thumbnail, Right, Spinner, Container } from 'native-base'
import { Avatar, Divider } from 'react-native-elements'
import moment from 'moment'
import Modal from "react-native-modal";

const AddComment = (obj) => {
    return <Card>
        <CardItem header>
            <Text>Escribir comentario</Text>
        </CardItem>
        <CardItem>
            <Item picker>
                <Picker

                    mode="dropdown"
                    placeholder="Seleccionar"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={obj.valueNombre}
                    onValueChange={obj.handlePickerNombre}
                >
                    <Picker.Item label="¿Anónimo?" value="0" />
                    <Picker.Item label="Anónimo" value="anonimo" />
                    <Picker.Item label="Juan Perez Blabla" value="nombre" />
                </Picker>
            </Item>
        </CardItem>
        <CardItem>
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
                    <Picker.Item label="¿Que tal fue el servicio?" value="0" />
                    <Picker.Item label="Recomendado" value="recomendado" />
                    <Picker.Item label="Aceptable" value="aceptable" />
                    <Picker.Item label="No recomendado" value="noRecomendado" />
                </Picker>
            </Item>
        </CardItem>
        <CardItem>
            <Content>
                <Form>
                    <Textarea rowSpan={5} placeholder="Escribir comentario" />
                    <Button block success ><Text style={{ color: "white" }} >Enviar</Text></Button>
                </Form>
            </Content>
        </CardItem>
    </Card>
}

const AddComment2 = (obj) => {
    return <View style={styles.modalContent}>

        <Text style={{fontWeight:"bold", fontSize: 22, textAlign: "center"}} >Escribir comentario</Text>
        <Item picker>
            <Picker

                mode="dropdown"
                placeholder="Seleccionar"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={obj.valueNombre}
                onValueChange={obj.handlePickerNombre}
            >
                <Picker.Item label="¿Anónimo?" value="0" />
                <Picker.Item label="Anónimo" value="Anónimo" />
                <Picker.Item label={obj.username} value={obj.username} />
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
                onValueChange={obj.handlePickerServicio}
            >
                <Picker.Item label="¿Que tal fue el servicio?" value="0" />
                <Picker.Item label="Recomendado" value="recomendado" />
                <Picker.Item label="Aceptable" value="aceptable" />
                <Picker.Item label="No recomendado" value="noRecomendado" />
            </Picker>
        </Item>
        {/* <Content> */}
        <Form>
            <Textarea rowSpan={5} value={obj.comment} onChangeText={(text) => obj.handleComment(text)} placeholder="Escribir comentario" />
            <Button block success onPress={obj.enviarComentario} style={{ backgroundColor: '#03a9f4' }}><Text style={{ color: "white" }} >Enviar</Text></Button>
        </Form>
    </View>
}


const Comments2 = (obj) => {
    var numColor = 0;
    var firstLetterUserName;
    // console.warn(obj.comments)
    // alert(obj.comments)
    // alert(obj.loading)
    // alert(obj.loading + "-" +obj.comments.length)
    // console.warn(obj.comments)
    if (!obj.loading) {
        if (obj.comments.length > 0) {
            return obj.comments.map((v, i) => {
                numColor = Math.floor(Math.random() * (5 - 0) + 0)
                // firstLetterUserName = v.usuario.toUpperCase();
                // alert(numColor)
                firstLetterUserName = v.usuario != undefined ? v.usuario[0].toUpperCase():"X";
                return <List key={i} on >
                    <ListItem avatar >
                        <Left>
                            {/* <Thumbnail source={{uri: ""}}/> */}
                            <Avatar size="small" rounded title={firstLetterUserName} activeOpacity={0.7} overlayContainerStyle={{ backgroundColor: obj.letterColor[firstLetterUserName] }} />
                        </Left>
                        <Body>
                            <Text style={{ fontWeight: "bold" }} >{v.usuario}</Text>
                            <Text>{v.recomendado.toUpperCase() + " - " + v.comentario}</Text>
                            {obj.userCode == v.usercode ?
                                <Button block transparent onPress={() => obj.deleteComment(v.id)}><Text>Borrar comentario</Text></Button>
                                : <Text />}
                        </Body>
                        <Right>
                            <Text note>{v.fecha}</Text>
                        </Right>
                    </ListItem>
                </List>
            })
        } else {
            return <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                <Text  >Sin comentarios</Text>
            </View>
        }

    } else {
        return <Spinner color='#03a9f4'/>
    }



}

export default class classComments extends Component {
    state =
        {
            valueServicio: "0", valueNombre: "0", date: moment(new Date()).format("DD/MM/YYYY"), comment: "",
            avatarColors: ["#d32f2f", "#7b1fa2", "#1976d2", "#388e3c", "#ffa000", "#e64a19"],
            comments: [], username: "", idDoctor: "", modal: false, loading: true, userCode:"",
            letterColor: {A: "#e57373", B: "f06292", C: "#ba68c8", D: "#9575cd", E:"#7986cb", F: "#64b5f6", G:"#4fc3f7", H:"#4dd0e1", I:"#4db6ac", 
            J:"#81c784", K:"#aed581", L:"#dce775", M:"#fff176", N:"#ffd54f", O:"#ffb74d", P:"#ff8a65", Q:"#a1887f", R:"#90a4ae", S:"#f57c00",
            T: "#ffa000", U:"#fbc02d", V:"#afb42b", W:"#689f38", X:"#388e3c", Y:"#0097a7", Z:"#1976d2" }
        }
    handlePickerServicio = (value: string) => {
        // alert(value)
        this.setState({ valueServicio: value })
    }
    handlePickerNombre = (value: string) => {
        this.setState({ valueNombre: value })
    }

    componentDidMount() {
        var idDoctor = this.props.navigation.getParam("idDoctor");
        this.setState({ idDoctor })
        // alert(idDoctor)
        AsyncStorage.getItem("username", (err, result1) => {
            if (!err) {
                this.setState({ username: result1 }); 
                AsyncStorage.getItem("userCode", (err, result2) => {
                    this.setState({userCode: result2}); 
                    fetch("https://serverquedoctor.herokuapp.com/usuarioActual?usuario="+result1+"&code="+result2);

                })
            } else {
                console.error(err)
            }
        })

        this.getComentarios(idDoctor);

    }

    deleteComment = (idComment) => {
        const { idDoctor } = this.state;
        // alert(idComment)
        this.fetchDeleteComment(idComment, idDoctor)
            .then(res => this.setState({ comments: res }))
            .catch(err => {
                console.log("Error borrando comentario: " + err);
                Alert.alert("Ha ocurrido un error", "Ha ocurrido un error eliminando el comentario")
            })
    }

    fetchDeleteComment = async (idComment, idDoctor) => {
        const response = await fetch("https://serverquedoctor.herokuapp.com/comentarios/doctor/eliminar?id=" + idComment + "&fkDoctor=" + idDoctor);
        const body = response.json();
        if (response.status != 200) throw Error(body.message)
        return body;
    }
    // const {usuario, fecha, comentario, fkDoctor} = req.query;
    fetchAgregar = async () => {
        const { valueServicio, valueNombre, date, comment, idDoctor, userCode } = this.state;
        // alert("x")
        const response = await fetch("https://serverquedoctor.herokuapp.com/comentarios/doctor/agregar?fkDoctor=" + idDoctor + "&fecha=" + date + "&comentario=" + comment + "&usuario=" + valueNombre + "&userCode="+userCode+ "&recomendado=" + valueServicio);
        const body = response.json();
        if (response.status != 200) throw Error(body.message)
        return body;
    }

    getComentarios = (idDoctor) => {
        this.fetchComentarios(idDoctor)
            .then(res => this.setState({ comments: res, loading: false }))
            .catch(err => {
                Alert.alert("Ha ocurrido un error", "Error obteniendo comentarios")
                console.log(err)
            })
    }

    fetchComentarios = async (idDoctor) => {
        const response = await fetch("https://serverquedoctor.herokuapp.com/comentarios/doctor?fkDoctor=" + idDoctor);
        const body = response.json();
        if (response.status != 200) throw Error(body.message)
        return body;
    }

    agregarComentario = (idDoctor) => {
        const { valueServicio, valueNombre, date, comment } = this.state;
        if (valueNombre != 0) {
            if (valueServicio != 0) {
                if (comment != "") {
                    this.fetchAgregar(idDoctor)
                        .then(res => {
                            this.setState({ comments: res, comment: "", valueServicio: "0", modal: false })
                        })
                        .catch(err => {
                            console.log(err);
                            Alert.alert("Ha ocurrido un error", "Error obteniendo nuevos comentarios")
                        })
                } else {
                    Alert.alert("Ha ocurrido un error", "El comentario no puede estar vacío")
                }
            } else {
                Alert.alert("Ha ocurrido un error", "Debe seleccionar que tal fue el servicio")
            }
        } else {
            Alert.alert("Ha ocurrido un error", "Debe seleccionar si ser anónimo o el nombre registrado")
        }

    }



handleComment = (text) => {
    this.setState({ comment: text })
}

    static navigationOptions = {
    header: null
}

render() {
    const { valueServicio, valueNombre, userCode, comment, letterColor, username, comments, modal, loading } = this.state
    // console.warn(comments)
    // alert(comments[0])
    return (
        <Container style={{ backgroundColor: "white" }}>
            <ScrollView  >

                {/* <AddComment2 comment={comment} handleComment={this.handleComment} enviarComentario={this.agregarComentario} handlePickerNombre={this.handlePickerNombre} handlePickerServicio={this.handlePickerServicio}
                         valueServicio={valueServicio} valueNombre={valueNombre} username={username} /> */}
                <Divider />
                <Comments2 loading={loading} userCode={userCode} deleteComment={this.deleteComment} letterColor={letterColor} comments={comments} />
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
                <AddComment2 comment={comment} handleComment={this.handleComment} enviarComentario={this.agregarComentario} handlePickerNombre={this.handlePickerNombre} handlePickerServicio={this.handlePickerServicio}
                    valueServicio={valueServicio} valueNombre={valueNombre} username={username} />
            </Modal>
        </Container>
    )
}
}

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
