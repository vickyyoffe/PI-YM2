import React, { Component, lazy } from "react";
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase/config'
import firebase from 'firebase';

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            label: "Dislike",
            cantLikes: this.props.datos.like.length,  //va por el estado pq es dinamico
            estadoLikeo: true
        }
    }
    componentDidMount() {
        if (this.props.datos.like.includes(auth.currentUser.email)) {
            this.setState({ label: "Dislike", estadoLikeo: true }) //en este caso esta likeado, y si toco el boton dislikeo 
        }
        else {
            this.setState({ label: "Like", estadoLikeo: false }) //en este caso esta dislikeado, y si toco el boton likeo 
        }
    }

    likear() {
        if (this.state.estadoLikeo == true) {
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
                <Text style={styles.descripcion}>{this.props.datos.descripcion}</Text>
                <View style={styles.ownerContainer}>
                    <Text style={styles.owner}>{this.props.datos.owner}</Text>
                </View>
                <View style={styles.likesRow}>
                    <Text style={styles.likes}>❤️ {this.state.cantLikes}</Text>

                    <TouchableOpacity style={styles.buttonLike} onPress={() => this.likear()}>
                        <Text style={styles.buttonText}>{this.state.label}</Text>
                    </TouchableOpacity>

                    {this.props.miPerfil && (
                        <TouchableOpacity style={styles.buttonDelete} onPress={() => this.delete()}>
                            <Text style={styles.buttonDeleteText}>Eliminar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

        )
    }

}


const styles = StyleSheet.create({
    cardPost: {
        backgroundColor: '#fff0f0',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
    },
    descripcion: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
        marginBottom: 6,
    },
    ownerContainer: {
        alignItems: 'flex-end', 
        marginBottom: 12,
    },

    owner: {
        fontSize: 14,
        color: '#d62828',        
        fontWeight: 'bold',      
        backgroundColor: '#ffe5e5', 
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },

    likesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    likes: {
        fontSize: 15,
        color: '#e91e63',
    },
    buttonLike: {
        backgroundColor: '#e0e0e0', 
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    buttonText: {
        color: '#222', 
        fontSize: 14,
        fontWeight: '600',
    },
    buttonDelete: {
        backgroundColor: '#f44336',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    buttonDeleteText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default Post;