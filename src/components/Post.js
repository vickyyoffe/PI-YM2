import React, { Component, lazy } from "react";
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase/config'
import firebase from 'firebase';

class Post extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            label: "dislike",
            cantLikes: this.props.datos.like.length,  //va por el estado pq es dinamico
            estadoLikeo: true
        }
    }
    componentDidMount(){
        if(this.props.datos.like.includes(auth.currentUser.email)) {
            this.setState({label:"dislike", estadoLikeo:true}) //en este caso esta likeado, y si toco el boton dislikeo 
        }
        else {
            this.setState({label:"like", estadoLikeo:false}) //en este caso esta dislikeado, y si toco el boton likeo 
        }
    }

    likear(){
        if(this.state.estadoLikeo == true){
            db.collection('posts')
            .doc(this.props.id)
            .update({
                like: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) 
            })
            .then(() => this.setState({
                cantLikes: this.state.cantLikes - 1,
                label: "Like",
                estadoLikeo: false
            }))
        }
        else {
            db.collection('posts')
            .doc(this.props.id)
            .update({
                like: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) 
            })
            .then(() => this.setState({
                cantLikes: this.state.cantLikes + 1,
                label: "Dislike",
                estadoLikeo: true
            }))    
        }
       
    }

    delete() {
        db.collection('posts')
        .doc(this.props.id)
        .delete()
        .then(() => {
        })
        .catch((error) => {
        });
    }
    
    render() {
        return (
            <View style={styles.cardPost}>
                <Text style={styles.textoPost}>{this.props.datos.descripcion}</Text>
                <Text style={styles.textoPost}>{this.props.datos.owner} </Text>
                <Text style={styles.textoPost}>Likes:{this.state.cantLikes} </Text>
                <TouchableOpacity style={styles.button} onPress={() => this.likear()}> 
                    <Text style={styles.buttonText}> {this.state.label}</Text>
                </TouchableOpacity>
                {this.props.miPerfil ? ( <TouchableOpacity style={styles.button} onPress={() => this.delete()}> 
                    <Text style={styles.buttonText}> eliminar </Text>
                </TouchableOpacity>) : (<View> </View>) }
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