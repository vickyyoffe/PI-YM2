import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            email: '',
            password: '',
            username: '',
            registrado: false 
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user && !this.state.registrado) { //si el usuario está registrado
                this.props.navigation.navigate('Tab')
            }
        })
    }

    register(email, password, username) {
        if (email !== "" && password !== '' && username !== '') {
            if (email.includes('@')) {
                if (password.length > 6) {
                    if (username.length > 3) {
                        this.setState({ registrado: true }); 
                        auth.createUserWithEmailAndPassword(email, password)
                            .then(() => {
                                return db.collection('users').add({
                                    owner: email,
                                    createdAt: Date.now(),
                                    updatedAt: Date.now(),
                                    username: username
                                });
                            })
                            .then(() => {
                                return auth.signOut();
                                //Uso signOut() para que, luego de registrarse, el usuario sea redirigido a la pantalla 
                                // de Login como pide la consigna, y no quede logueado automáticamente como hace Firebase 
                                // por defecto
                            })
                            .then(() => {
                                this.setState({ registering: false });
                                this.props.navigation.navigate('Login');
                            })
                            .catch(err => {
                                alert('Ocurrió un error: ' + err.message);
                                console.log(err);
                            });
                    } else {
                        alert("El usuario debe tener más de 3 caracteres");
                    }
                } else {
                    alert("La contraseña debe tener más de 6 caracteres");
                }
            } else {
                alert("El email debe contener un @");
            }
        } else {
            alert("Ningún campo puede estar vacío");
        }
    }

    render() {
        return (
            <View style={styles.container}>
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
                    onChangeText={(texto) => this.setState({ password: texto, error: false })}
                    placeholder='Ingresa tu password'
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text, error: false })}
                    placeholder='Ingresa tu username'
                />
                <TouchableOpacity style={styles.outlineButton} 
                onPress={() => this.register(this.state.email, this.state.password, this.state.username)}>
                 <Text style={styles.outlineButtonText}>Registrarme</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.outlineButton} 
                onPress={() => this.props.navigation.navigate('Login')}>
                 <Text style={styles.outlineButtonText}>¿Ya tenés cuenta? Iniciá sesión</Text>
                </TouchableOpacity>
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
    padding: 14,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#d62828',
    borderRadius: 12,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#d62828',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: '100%',
    marginVertical: 8,
  },
  outlineButtonText: {
    color: '#d62828',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});