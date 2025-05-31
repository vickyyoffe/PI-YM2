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
    componentDidMount() { 
        auth.onAuthStateChanged((user) => {
          if (user) {
        this.props.navigation.navigate('Tab') 
        }
    })
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
                <TouchableOpacity style={styles.outlineButton} onPress={() => this.LoguearUsuario(this.state.email, this.state.password)}>
                    <Text style={styles.outlineButtonText}>Ingresar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.outlineButton}
                    onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.outlineButtonText}>¿No tenes cuenta? Registrate!</Text>
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

export default Login;