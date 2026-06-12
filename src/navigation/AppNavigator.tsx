import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

    //Importa as outras paginas

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import PerfilScreen from '../screens/PerfilScreen';
import EditarPerfilScreen from '../screens/EditarPerfilScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, // remove a barra superior de todas as telas
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Cadastro"
        component={CadastroScreen}
      />

      <Stack.Screen
        name="Perfil"
        component={PerfilScreen}
      />

      <Stack.Screen
        name="EditarPerfil"
        component={EditarPerfilScreen}
      />
    </Stack.Navigator>
  );
}