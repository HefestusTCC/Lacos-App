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
import ListaComunidades from '../screens/ListaComunidades/index.js';
import Adicionar_Comunidade from '../screens/Adicionar_Comunidade/index.js';
import Editar_Comunidade from '../screens/Editar_Comunidade/index.js';
import Postar from '../screens/Postar/index.js';
import PerfilOutraPessoa from '../screens/PerfilOutraPessoa/index.js';
import Notificacoes from '../screens/Notificacoes/index.js';
import RespostaDenuncia from '../screens/RespostaDenuncia/index.js';
import PostDetailScreen from '../screens/PostDetailScreen/index.js';
import EditarPost from '../screens/EditarPost/index.js';
import PesquisarUsuario from '../screens/PesquisarUsuario/index.js';
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
                    name="PostDetailScreen"
                    component={PostDetailScreen}
                    options={{
                        title: '',
                        headerShown: false
                    }}
                ></stack.Screen>
                <stack.Screen
                    name="PerfilOutraPessoa"
                    component={PerfilOutraPessoa}
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
                    name="RespostaDenuncia"
                    component={RespostaDenuncia}
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
                    name="Notificacoes"
                    component={Notificacoes}
                    options={{
                        title: '',
                        headerShown: false
                    }}
                ></stack.Screen>
                <stack.Screen
                    name="PesquisarUsuario"
                    component={PesquisarUsuario}
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
                <stack.Screen
                    name="ListaComunidades"
                    component={ListaComunidades}
                    options={{
                        title: '',
                        headerShown: false
                    }}
                ></stack.Screen>
                <stack.Screen
                    name="Adicionar_Comunidade"
                    component={Adicionar_Comunidade}
                    options={{
                        title: '',
                        headerShown: false
                    }}
                ></stack.Screen>
                <stack.Screen
                    name="Editar_Comunidade"
                    component={Editar_Comunidade}
                    options={{
                        title: '',
                        headerShown: false
                    }}
                ></stack.Screen>
                <stack.Screen
                    name="Postar"
                    component={Postar}
                    options={{
                        title: '',
                        headerShown: false
                    }}
                ></stack.Screen>
                <stack.Screen
                    name="EditarPost"
                    component={EditarPost}
                    options={{
                        title: '',
                        headerShown: false
                    }}
                ></stack.Screen>
            </stack.Navigator>
        </NavigationContainer>
    );
}