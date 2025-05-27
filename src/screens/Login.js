import { Text, View, TextInput, StyleSheet,TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../firebase/config'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            error: false
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.props.navigation.navigate('tab')
            }
        })
    }

    LoguearUsuario(email, password){
        if(
            (email !== '' && password !== '')
                && password.length >= 6 && email.includes('@')
        ){
            auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate('tab')
            })
            .catch(err => console.log('err:', err))
        }
    }

  render() {
    return (
      <View>
        <Text>Login</Text>
            <TextInput
                style={
                    styles.input
                }
                keyboardType='default'
                value={this.state.email}
                onChangeText={(texto) => this.setState({email: texto, error: false }) }
                placeholder='Ingresa tu email'
            />
            <TextInput
                style={
                    styles.input
                }
                keyboardType='default'
                value={this.state.password}
                onChangeText={(texto) => this.setState({password: texto, error: false }) }
                placeholder='Ingresa tu password'
                secureTextEntry={true}
            />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: 'red'
    }
})

export default Login