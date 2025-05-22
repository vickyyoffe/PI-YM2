import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feed from '../screens/Feed';
import Buscador from '../screens/Buscador';
import Perfil from '../screens/Perfil';
import { FontAwesome } from '@expo/vector-icons'

const Tab= createBottomTabNavigator(); // es una función que te da acceso a un navegador por pestañas (bottom tab navigator), es decir, un conjunto de pantallas organizadas mediante una barra de navegación en la parte inferior de la app.
export default function BottomTabs() {
    return (
        <Tab.Navigator>
             <Tab.Screen 
          name='Feed' 
          component={Feed}
          options={{
            tabBarIcon: () => <FontAwesome name='home' size={24} color={'red'} /> //options.tabBarIcon: opcional, para agregar un ícono personalizado a la pestaña (como hiciste con FontAwesome en Feed).
          }}
          />
           <Tab.Screen name='Buscador' component={Buscador} />
           <Tab.Screen name='Perfil' component={Perfil} />

        </Tab.Navigator>
    )}