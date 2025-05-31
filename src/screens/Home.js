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
            <View style={styles.container}>
                {this.state.posts.length === 0 ? (
                    <Text style={styles.sinPost}>No hay ningún posteo.</Text>
                ) : (
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Post datos={item.data} id={item.id} miPerfil = {false}/>
                        )}
                    />
                )}
            </View>
        )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // fondo blanco puro
    padding: 20,
  },
  sinPost: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
    marginTop: 50,
  }})

  export default Home;
