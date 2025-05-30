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
            <View style={styles.container}>
                <Text style={styles.title}>Crear posteo</Text>
                <TextInput style={styles.input}
                    keyboardType='default'
                    value={this.state.descripcion}
                    onChangeText={(text) => this.setState({ descripcion: text })}
                    placeholder='Ingresa tu descripción'
                />
                <TouchableOpacity style={styles.button} onPress={() => this.agregarPost(this.state.descripcion)}>
                    <Text style={styles.buttonText}>Agregar posteo</Text>
                </TouchableOpacity>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 100,
        padding: 12,
        paddingTop: 16,
        marginVertical: 10,
        borderWidth: 1.5,
        borderColor: 'red',
        borderRadius: 10,
        backgroundColor: '#fff',
        color: '#000',
        textAlignVertical: 'top', // para que empiece desde arriba
    },
    button: {
        backgroundColor: 'red',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})