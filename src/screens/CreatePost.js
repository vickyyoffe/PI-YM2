import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
//auth.OnAuthStateChanged --> nos permite reconcer cambios en la sesion del usuario, si el usuario ya etsa logueado en firebase, me permite enviarlo a la home sin tener que se loguee cada evz que entra a la app

export default class CreatePost extends Component {
    constructor(props) { //se usa para inicializar el estado.
        super(props)
        this.state = {
            descripcion: ""
        }
    }

    agregarPost(desc) {
        db.collection('posts').add(
            {
                owner: auth.currentUser.email, //si el metodo tiene el mail del usuario uso solo el parametro,si no lo tiene uso el auth.currentuser
                createdAt: Date.now(),
                descripcion: desc, //NO es el estado
                like: []
            }
        )
    }

    render() {
        return (
            <View>
                <Text>Crear posteo</Text>
                <TextInput
                    style={
                        styles.input
                    }
                    keyboardType='default'
                    value={this.state.descripcion}
                    onChangeText={(text) => this.setState({ descripcion: text })}
                    placeholder='Ingresa tu descripción'
                />
                <TouchableOpacity onPress={() => this.agregarPost(this.state.descripcion)}>
                    <Text>Agregar posteo</Text>
                </TouchableOpacity>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    input: { //Este estilo se aplica a los TextInput.
        borderWidth: 2,
        borderColor: 'red'
    }
})