import React, { Component } from "react";
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'

class Post extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.cardPost}>
                <Text style={styles.textoPost}>{this.props.datos.descripcion}</Text>
                <Text style={styles.textoPost}>{this.props.datos.owner} </Text>
                <Text style={styles.textoPost}>Likes:{this.props.datos.like.length} </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        backgroundColor: '#fefefe',
        padding: 20,
    },
    tituloPrincipal: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#1e1e1e',
    },
    itemInfo: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    subtitulo: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
        fontWeight: '600',
        color: '#333',
    },
    sinPost: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#888',
    },
    cardPost: {
        padding: 10,
        backgroundColor: '#e8f0fe',
        borderRadius: 6,
        marginBottom: 10,
    },
    textoPost: {
        fontSize: 15,
        color: '#111',
    },
    botonSalir: {
        marginTop: 30,
        padding: 12,
        backgroundColor: 'red',
        borderRadius: 6,
        alignItems: 'center',
    },
    textoBoton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cargando: {
        marginTop: 50,
        textAlign: 'center',
        fontSize: 16,
    },
});

export default Post;