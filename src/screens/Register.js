import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
//auth.OnAuthStateChanged --> nos permite reconcer cambios en la sesion del usuario, si el usuario ya etsa logueado en firebase, me permite enviarlo a la home sin tener que se loguee cada evz que entra a la app

export default class Register extends Component {
    constructor(props) { //se usa para inicializar el estado.
        super(props)
        this.state = {
            error: false, // es un booleano que indica si hubo un error al registrarse.
            email: '',
            password: '',
            username: ''
        }
    }
    componentDidMount() { 
        auth.onAuthStateChanged((user) => {
          if (user) {
        this.props.navigation.navigate('Tab') 
        }
    })
    }
    register(email, password, username) {
        if (email !== "" && password !== '' && username !== '') {
            if (email.includes('@')) {
                if (password.length > 6) {
                    if (username.length > 3) {
                        auth.createUserWithEmailAndPassword(email, password)
                            .then(() => {
                                this.props.navigation.navigate('Login')
                                //yo quieor que cunaod el usuario se loguee, que quede el nombre del username como un valor
                                db.collection('users').add(
                                    {
                                        owner: email, //si el metodo tiene el mail del usuario uso solo el parametro,si no lo tiene uso el auth.currentuser
                                        createdAt: Date.now(),
                                        updatedAt: Date.now(),
                                        username: username
                                    }
                                )
                            })
                            .catch(err => console.log('err', err)); //poner alert!! elimino console 
                    } else {
                        alert("El usuario debe tener más de 3 caracteres")
                    }
                } else {
                    alert("La contraseña debe tener más de 6 caracteres")
                }
            } else {
                alert("El email debe contener un @")
            }
        }
        else {
            alert("Ningún campo puede estar vacío")
        }
    }

    render() {
        return (
            <View style= {styles.container}>
                <Text style={styles.title}>Registrarse</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text, error: false })}
                    placeholder='Ingresa tu email'
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    value={this.state.password}
                    onChangeText={(texto) => this.setState({ password: texto, error: false })} //Segundo campo de entrada (contraseña).
                    placeholder='Ingresa tu password'
                    secureTextEntry={true} //para ocultar el texto.
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text, error: false })}
                    placeholder='Ingresa tu username'
                />
                <TouchableOpacity style={styles.button} onPress={() => this.register(this.state.email, this.state.password, this.state.username)}>
                    <Text style={styles.buttonText}>Registrarme</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>¿Ya tenés cuenta? Iniciá sesión</Text>
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
        padding: 12,
        marginVertical: 10,
        borderWidth: 1.5,
        borderColor: 'red',
        borderRadius: 10,
        backgroundColor: '#fff',
        color: '#000',
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

