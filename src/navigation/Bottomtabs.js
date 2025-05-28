import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import CreatePost from '../screens/CreatePost';

const Tab= createBottomTabNavigator(); // es una función que te da acceso a un navegador por pestañas (bottom tab navigator), es decir, un conjunto de pantallas organizadas mediante una barra de navegación en la parte inferior de la app.
export default function BottomTabs() {
    return (
        <Tab.Navigator>
          <Tab.Screen name='Crear posteo' component={CreatePost} />
        </Tab.Navigator>
    )}