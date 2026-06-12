import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { inserirOng } from '../database/database';

export default function CadastroScreen({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [descricao, setDescricao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [foto, setFoto] = useState('');

  // 📸 Selecionar foto
  async function escolherImagem() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setFoto(
        `data:image/jpeg;base64,${result.assets[0].base64}`
      );
    }
  }

  function cadastrar() {
    if (
      !nome ||
      !email ||
      !senha ||
      !descricao ||
      !telefone ||
      !endereco ||
      !categoria
    ) {
      Alert.alert(
        'Erro',
        'Preencha todos os campos obrigatórios.'
      );
      return;
    }

    const sucesso = inserirOng(
      nome,
      email,
      senha,
      descricao,
      telefone,
      endereco,
      categoria,
      foto
    );

    if (!sucesso) {
      Alert.alert(
        'Erro',
        'E-mail já cadastrado.'
      );
      return;
    }

    const ongLogada = {
      id: Date.now(),
      nome,
      email,
      senha,
      descricao,
      telefone,
      endereco,
      categoria,
      foto,
    };

    Alert.alert(
      'Sucesso',
      'Cadastro realizado! Você já está logado.'
    );

    navigation.replace('Perfil', {
      ong: ongLogada,
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.titulo}>
          Cadastro da ONG
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {/* FOTO */}
        <TouchableOpacity
          style={styles.botaoFoto}
          onPress={escolherImagem}
        >
          <Text style={styles.textoBotao}>
            Selecionar Foto (opcional)
          </Text>
        </TouchableOpacity>

        {foto ? (
          <Image
            source={{ uri: foto }}
            style={styles.preview}
          />
        ) : null}

        {/* CATEGORIAS */}
        <Text style={styles.label}>
          Categoria
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 15 }}
        >
          {[
            'Animais',
            'Saúde',
            'Educação',
            'Meio Ambiente',
            'Assistência Social',
            'Outros',
          ].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setCategoria(item)}
              style={[
                styles.categoria,
                categoria === item &&
                  styles.categoriaSelecionada,
              ]}
            >
              <Text
                style={{
                  color:
                    categoria === item
                      ? '#fff'
                      : '#000',
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
        />

        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={endereco}
          onChangeText={setEndereco}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={cadastrar}
        >
          <Text style={styles.textoBotao}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  scrollContent: {
    paddingTop: 15,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 10,
  },

  categoria: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 10,
  },

  categoriaSelecionada: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },

  botaoFoto: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },

  preview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 15,
  },

  botao: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});