import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: false
        }
    }
    LoguearUsuario(email, password) {
        if (
            (email !== '' && password !== '')
            && password.length >= 6 && email.includes('@')
        ) {
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    this.props.navigation.navigate('Tab')
                })
                .catch(err => console.log('err:', err))
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Iniciar Sesión</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    value={this.state.email}
                    onChangeText={(texto) => this.setState({ email: texto, error: false })}
                    placeholder='Ingresa tu email'
                    placeholderTextColor="#666"
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    value={this.state.password}
                    onChangeText={(texto) => this.setState({ password: texto, error: false })}
                    placeholder='Ingresa tu contraseña'
                    placeholderTextColor="#666"
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.LoguearUsuario(this.state.email, this.state.password)}>
                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>¿No tenes cuenta? Registrate!</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2', // gris claro
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
    button2: {
        backgroundColor: 'grey',
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

export default Login
