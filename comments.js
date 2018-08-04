import React, { Component } from 'react'
import { ScrollView, Text, AsyncStorage } from 'react-native'
import { Card, CardItem, Picker, Item, Icon, Label, Textarea, Form, Content, Button, Body, List, ListItem, Left, Thumbnail, Right } from 'native-base'
import { Avatar, Divider } from 'react-native-elements'

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
    return <Content >

        <Text style={{ textAlign: "center" }} >Escribir comentario</Text>
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
                onValueChange={obj.handlePickerNombre}
            >
                <Picker.Item label="¿Que tal fue el servicio?" value="0" />
                <Picker.Item label="Recomendado" value="recomendado" />
                <Picker.Item label="Aceptable" value="aceptable" />
                <Picker.Item label="No recomendado" value="noRecomendado" />
            </Picker>
        </Item>
        {/* <Content> */}
        <Form>
            <Textarea rowSpan={5} placeholder="Escribir comentario" />
            <Button block success ><Text style={{ color: "white" }} >Enviar</Text></Button>
        </Form>
    </Content>
}

const Comments = (obj) => {
    return [1, 2, 3, 4].map((v, i) => {
        return <Card key={i} >
            <CardItem header bordered >
                <Text style={{ fontWeight: "bold" }} >Usuario o anónimo</Text>
            </CardItem>
            <CardItem>
                <Body>
                    <Text>
                        Blablablablabla
            </Text>
                </Body>
            </CardItem>
            <CardItem footer>
                <Text>Fecha</Text>
            </CardItem>
        </Card>
    })
}

const Comments2 = (obj) => {
    var numColor = 0;
    return [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => {
        numColor = Math.floor(Math.random() * (5 - 0) + 0)
        // alert(numColor)
        return <List key={i} >
            <ListItem avatar>
                <Left>
                    {/* <Thumbnail source={{uri: ""}}/> */}
                    <Avatar size="small" rounded title="A" activeOpacity={0.7} overlayContainerStyle={{ backgroundColor: obj.colors[numColor] }} />
                </Left>
                <Body>
                    <Text style={{ fontWeight: "bold" }} >Usuario | Anónimo</Text>
                    <Text> RECOMENDADO - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vestibulum libero vitae finibus placerat. Nulla quis felis tellus. Curabitur pretium molestie nunc vestibulum porttitor. Nulla facilisi. Proin non faucibus libero. </Text>
                </Body>
                <Right>
                    <Text note>Fecha</Text>
                </Right>
            </ListItem>
        </List>
    })
}

export default class classComments extends Component {
    state =
        {
            valueServicio: "0", valueNombre: "0", username: "",
            avatarColors: ["#d32f2f", "#7b1fa2", "#1976d2", "#388e3c", "#ffa000", "#e64a19"]
        }
    handlePickerServicio = (value: string) => {
        this.setState({ valueServicio: value })
    }
    handlePickerNombre = (value: string) => {
        this.setState({ valueNombre: value })
    }

    componentDidMount() {
        const x = this.props.navigation.getParam("prueba");
        alert(x)
        AsyncStorage.getItem("username", (err, result) => {
            if (!err) {
                this.setState({ username: result })
            } else {
                console.error(err)
            }
        })
    }

    static navigationOptions = {
        header: null
    }

    render() {
        const { valueServicio, valueNombre, avatarColors, username } = this.state
        return (
            <ScrollView style={{ backgroundColor: "white" }} >
                <AddComment2 handlePickerNombre={this.handlePickerNombre} handlePickerServicio={this.handlePickerServicio}
                    valueServicio={valueServicio} valueNombre={valueNombre} username={username} />
                <Divider />
                <Comments2 colors={avatarColors} />
            </ScrollView>
        )
    }
}