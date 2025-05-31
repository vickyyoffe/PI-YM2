import { View, Text, Touchable, TouchableOpacity, FlatList, StyleSheet } from 'react-native' //para listar elementos uso flatlist
import React, { Component } from 'react'
import { auth ,db} from '../firebase/config'

export default class Perfil extends Component {
    constructor(props){
        super(props);
        this.state = {
          dataDelUsuario: null,
          postDelUsuario: [],
        }
      }
      componentDidMount(){
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot((docs) => { 
          let datos =[];
          docs.forEach((doc) => datos.push({
            id: doc.id,
            data:doc.data()
          }))
          this.setState({dataDelUsuario:datos[0]})
        })
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot((docs) => { 
          let posteos =[];
          docs.forEach((doc) => posteos.push({
            id: doc.id,
            data:doc.data()
          }))
          console.log(posteos);
          this.setState({postDelUsuario:posteos})
        })

      }
  logout(){
    auth.signOut()
    .then(()=> this.props.navigation.navigate('Login'))
    .catch(err => console.log('err en signouth', err));
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
          
  
            <Text style={styles.subtitulo}>Tus publicaciones:</Text>
  
            {postDelUsuario.length === 0 ? (
              <Text style={styles.sinPost}>Todavía no subiste ningún posteo.</Text>
            ) : (
              <FlatList
                data={postDelUsuario}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.cardPost}>
                    <Text style={styles.textoPost}>{item.data.descripcion}</Text>
                  </View>
                )}
              />
            )}
  
            <TouchableOpacity style={styles.botonSalir} onPress={() => this.logout()}>
              <Text style={styles.textoBoton}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.cargando}>Cargando datos del perfil...</Text>
        )}
      </View>
    );
  }}
  
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
  