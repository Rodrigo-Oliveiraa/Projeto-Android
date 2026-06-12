import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';
import { criarTabela } from './src/database/database';
import { View, Text } from 'react-native';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    criarTabela();

    // pequeno delay garante inicialização do SQLite
    setTimeout(() => {
      setReady(true);
    }, 300);
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}