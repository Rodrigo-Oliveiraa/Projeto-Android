import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import {
  buscarOngPorLogin,
} from '../database/database';

export default function LoginScreen({
  navigation,
}: any) {

  const [email, setEmail] =
    useState('');

  const [senha, setSenha] =
    useState('');

  function fazerLogin() {

    if (!email || !senha) {

      Alert.alert(
        'Erro',
        'Preencha e-mail e senha.'
      );

      return;
    }

    const ong = buscarOngPorLogin(
      email.trim(),
      senha
    ) as any;

    if (!ong) {

      Alert.alert(
        'Erro',
        'E-mail ou senha inválidos.'
      );

      return;
    }

    Alert.alert(
      'Sucesso',
      `Bem-vindo(a), ${ong.nome}!`
    );

    navigation.replace(
      'Perfil',
      { ong }
    );
  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Login da ONG
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={fazerLogin}
      >

        <Text style={styles.textoBotao}>
          Entrar
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoCadastro}
        onPress={() =>
          navigation.navigate('Cadastro')
        }
      >
        <Text style={styles.textoCadastro}>
          Não possui conta? Cadastre sua ONG
        </Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  botao: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botaoCadastro: {
    marginTop: 20,
    alignItems: 'center',
  },

  textoCadastro: {
    color: '#2196F3',
    fontWeight: 'bold',
  },

});