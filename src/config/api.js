import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import SERVER_IP from './serverConfig';

// Cria uma instância do axios
const api = axios.create({
  baseURL: SERVER_IP, // Substitua pelo URL do seu servidor
});

// Adiciona um interceptor para adicionar o token em cada requisição
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('jwt_token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
