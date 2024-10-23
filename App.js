import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import Routes from './src/Routes';
import { LogBox } from 'react-native';


const App = () => {
  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // Suprime a mensagem de erro específica
  ]);
  return(
    <Routes></Routes>
  );
}

export default App;