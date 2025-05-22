import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Pantalla from "../screens/Pantalla";

const Stack = createNativeStackNavigator ();
function StackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Pantalla' 
                component={Pantalla}
                options={
                    {
                        headerShown: false
                    }
                }
                />
        </Stack.Navigator>
           
    )
}
export default StackNavigation;