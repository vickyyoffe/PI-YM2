import React, { Component } from "react";
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'

class Home extends Component {
    constructor(props) {
        super(props)
    }

    redireccionar(nombrePantalla) {
        this.props.navigation.navigate(nombrePantalla)
    }
    render() {
        return (
            <View>
                
            </View>
        )
    }

}


export default Home;