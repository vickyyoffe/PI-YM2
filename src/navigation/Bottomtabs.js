import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import CreatePost from '../screens/CreatePost';
import Perfil from '../screens/Perfil';
import Home from '../screens/Home';

const Tab= createBottomTabNavigator(); // es una función que te da acceso a un navegador por pestañas (bottom tab navigator), es decir, un conjunto de pantallas organizadas mediante una barra de navegación en la parte inferior de la app.
export default function BottomTabs() {
    return (
        <Tab.Navigator>
          <Tab.Screen 
            name='Home' 
            component={Home}
            options={{
              tabBarIcon: () => <Entypo name="home" size={24} color="red" /> //options.tabBarIcon: opcional, para agregar un ícono personalizado a la pestaña (como hiciste con FontAwesome en Feed).
            }}
          />

          <Tab.Screen 
            name='Crear posteo' 
            component={CreatePost} 
            options={{
              tabBarIcon: () => <Ionicons name="create-outline" size={24} color="red" /> 
            }}
            />
      
          <Tab.Screen  
            name='Perfil' 
            component={Perfil}
            options={{
              tabBarIcon: () => <FontAwesome6 name="face-grin" size={24} color="red" /> //options.tabBarIcon: opcional, para agregar un ícono personalizado a la pestaña (como hiciste con FontAwesome en Feed).
            }} />
       </Tab.Navigator>
       
    )}