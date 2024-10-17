import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login/index.js';
import Cadastro from '../screens/Cadastro/index.js';
import Perfil from '../screens/Perfil/index.js';
import Editar from '../screens/Editar/index.js';
import Preferencias from '../screens/Preferencias/index.js';
import Timeline from '../screens/Timeline/index.js';
import TimeLineComunidades from '../screens/TimelineComunidade/index.js';
import Comunidades from '../screens/Comunidades/index.js';
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
                <stack.Screen
                    name="Editar"
                    component={Editar}
                    options={{
                        title: '',
                        headerShown: false
                    }}
                ></stack.Screen>
                <stack.Screen
                    name="Preferencias"
                    component={Preferencias}
                    options={{
                        title: '',
                        headerShown: false
                    }}
                ></stack.Screen>
                <stack.Screen
                    name="Timeline"
                    component={Timeline}
                    options={{
                        title: '',
                        headerShown: false
                    }}
                ></stack.Screen>
                <stack.Screen
                    name="Comunidades"
                    component={Comunidades}
                    options={{
                        title: '',
                        headerShown: false
                    }}
                ></stack.Screen>
                <stack.Screen
                    name="TimelineComunidade"
                    component={TimeLineComunidades}
                    options={{
                        title: '',
                        headerShown: false
                    }}
                ></stack.Screen>
            </stack.Navigator>
        </NavigationContainer>
    );
}