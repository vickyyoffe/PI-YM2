import { View, Text, Touchable, TouchableOpacity, FlatList } from 'react-native' //para listar elementos uso flatlist
import React, { Component } from 'react'
import { auth ,db} from '../firebase/config'

export default class Perfil extends Component {
    constructor(props){
        super(props)
      }

  logout(){
    auth.signOut()
    .then(()=> this.props.navigation.navigate('Register'))
    .catch(err => console.log('err en signouth', err));
    //this.props.navigation.navigate('login')}
  }

  render(){
    return (
      <View>
        <Text>Perfil</Text>
       
        <TouchableOpacity onPress={()=> this.logout()}> 
            <Text>Sign out</Text>
        </TouchableOpacity> 
      </View>
    )
  }}


