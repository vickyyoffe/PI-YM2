import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
//auth.OnAuthStateChanged --> nos permite reconcer cambios en la sesion del usuario, si el usuario ya etsa logueado en firebase, me permite enviarlo a la home sin tener que se loguee cada evz que entra a la app

export default class CreatePost extends Component {
    constructor(props) { //se usa para inicializar el estado.
        super(props)
        this.state = {
            descripcion: "",
            mensajeExito: ""
        }
    }

    agregarPost(desc) {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            descripcion: desc,
            like: []
        })
            .then(() => {
                this.setState({
                    mensajeExito: '¡Tu posteo ya fue creado!',
                });
            })
            .catch(error => {
                console.log(error);
                alert('Hubo un error al crear el posteo');
            });
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Crear Posteo</Text>
                <TextInput style={styles.input}
                    keyboardType='default'
                    value={this.state.descripcion}
                    onChangeText={(text) => this.setState({ descripcion: text })}
                    placeholder='Ingresa tu descripción'
                />
                <TouchableOpacity style={styles.button} onPress={() => this.agregarPost(this.state.descripcion)}>
                    <Text style={styles.buttonText}>Agregar posteo</Text>
                </TouchableOpacity>
                {this.state.mensajeExito !== '' && (
                    <Text style={styles.mensajeExito}>{this.state.mensajeExito}</Text>
                )}
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff0f0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#d62828',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        minHeight: 100,
        padding: 14,
        borderWidth: 2,
        borderColor: '#d62828',
        borderRadius: 12,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#000',
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    button: {
        borderWidth: 2,
        borderColor: '#d62828',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#d62828',
        fontSize: 16,
        fontWeight: '600',
    },
    mensajeExito: {
        color: '#d62828',
        fontSize: 16,
        marginTop: 20,
        fontWeight: 'bold',
    }
});
