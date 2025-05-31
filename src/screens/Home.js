import React, { Component } from "react";
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { auth ,db} from '../firebase/config'
import Post from "../components/Post";


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        db.collection('posts').orderBy("createdAt", "desc").onSnapshot((docs) => {
            let posteos = [];
            docs.forEach((doc) => posteos.push({
                id: doc.id,
                data: doc.data()
            }))
            this.setState({ posts: posteos })
        })
    }

    redireccionar(nombrePantalla) {
        this.props.navigation.navigate(nombrePantalla)
    }
    render() {
        return (
            <View>
                {this.state.posts.length === 0 ? (
                    <Text style={styles.sinPost}>No hay ningún posteo.</Text>
                ) : (
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Post datos={item.data}/>
                        )}
                    />
                )}
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

export default Home;