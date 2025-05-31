import { View, Text, Touchable, TouchableOpacity, FlatList, StyleSheet } from 'react-native' //para listar elementos uso flatlist
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import Post from '../components/Post';

export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDelUsuario: null,
      postDelUsuario: [],

    }
  }
  componentDidMount() {
    db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot((docs) => {
      let datos = [];
      docs.forEach((doc) => datos.push({
        id: doc.id,
        data: doc.data()
      }))
      this.setState({ dataDelUsuario: datos[0] })
    })
    db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot((docs) => {
      let posteos = [];
      docs.forEach((doc) => posteos.push({
        id: doc.id,
        data: doc.data()
      }))
      console.log(posteos);
      this.setState({ postDelUsuario: posteos })
    })

  }
  logout() {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(err => console.log(err));
    //this.props.navigation.navigate('login')}
  }

  render() {
    const { dataDelUsuario, postDelUsuario } = this.state;

    return (
      <View style={styles.fondo}>
        {dataDelUsuario ? (
          <View>
            <Text style={styles.itemInfo}>📧 Email: {dataDelUsuario.data.owner}</Text>
            <Text style={styles.itemInfo}>👤 Usuario: {dataDelUsuario.data.username}</Text>

            <View style={styles.publicacionesBox}>
              <Text style={styles.subtitulo}>Tus publicaciones:</Text>

              {postDelUsuario.length === 0 ? (
                <Text style={styles.sinPost}>Todavía no subiste ningún posteo.</Text>
              ) : (
                <FlatList
                  data={postDelUsuario}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <Post datos={item.data} id={item.id} miPerfil={true} />
                  )}
                />
              )}
            </View>

            <TouchableOpacity style={styles.botonSalir} onPress={() => this.logout()}>
              <Text style={styles.textoBoton}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.cargando}>Cargando datos del perfil...</Text>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  itemInfo: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
    backgroundColor: '#fff0f0',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  subtitulo: {
    fontSize: 22,
    marginTop: 30,
    marginBottom: 16,
    fontWeight: '700',
    color: '#d62828',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
  },
  publicacionesBox: {
    marginTop: 25,
    backgroundColor: '#fff0f0', 
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  sinPost: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 20,
  },
  botonSalir: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  textoBoton: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  cargando: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});

