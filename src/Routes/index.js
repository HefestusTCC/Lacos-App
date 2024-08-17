import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login/index.js';
import Cadastro from '../screens/Cadastro/index.js';
import Perfil from '../screens/Perfil/index.js';
export default function App() {
    const stack = createStackNavigator();
    return (
        <NavigationContainer>
            <stack.Navigator>
                <stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: '',
                        headerShown: false
                    }}
                ></stack.Screen>
                <stack.Screen
                    name="Cadastro"
                    component={Cadastro}
                    options={{
                        title: '',
                        headerShown: false
                    }}
                ></stack.Screen>
                <stack.Screen
                    name="Perfil"
                    component={Perfil}
                    options={{
                        title: '',
                        headerShown: false
                    }}
                ></stack.Screen>
            </stack.Navigator>
        </NavigationContainer>
    );
}