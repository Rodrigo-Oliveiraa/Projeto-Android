import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from 'react-native';

export default function EditarPerfilScreen({
  route,
  navigation,
}: any) {
  const { ong } = route.params;

  const [nome, setNome] = useState(ong.nome || '');
  const [descricao, setDescricao] = useState(ong.descricao || '');
  const [telefone, setTelefone] = useState(ong.telefone || '');
  const [endereco, setEndereco] = useState(ong.endereco || '');
  const [categoria, setCategoria] = useState(ong.categoria || '');
  const [foto, setFoto] = useState(ong.foto || '');

  function salvar() {
    if (
      !nome ||
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

    const ongAtualizada = {
      ...ong,
      nome,
      descricao,
      telefone,
      endereco,
      categoria,
      foto,
    };

    Alert.alert(
      'Sucesso',
      'Perfil atualizado!'
    );

    navigation.replace('Perfil', {
      ong: ongAtualizada,
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>
        Editar Perfil
      </Text>

      {/* FOTO */}
      <Text style={styles.label}>
        Foto da ONG
      </Text>

      {foto ? (
        <Image
          source={{ uri: foto }}
          style={styles.foto}
        />
      ) : (
        <View style={styles.fotoPlaceholder}>
          <Text style={{ color: '#999' }}>
            Sem foto
          </Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        value={foto}
        onChangeText={setFoto}
        placeholder="URL da foto (opcional)"
      />

      {/* NOME */}
      <Text style={styles.label}>
        Nome da ONG
      </Text>

      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome da ONG"
      />

      {/* CATEGORIA */}
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

      {/* DESCRIÇÃO */}
      <Text style={styles.label}>
        Descrição
      </Text>

      <TextInput
        style={[styles.input, styles.inputMultiline]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descreva a ONG"
        multiline
      />

      {/* TELEFONE */}
      <Text style={styles.label}>
        Telefone
      </Text>

      <TextInput
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        placeholder="Digite o telefone"
      />

      {/* ENDEREÇO */}
      <Text style={styles.label}>
        Endereço
      </Text>

      <TextInput
        style={styles.input}
        value={endereco}
        onChangeText={setEndereco}
        placeholder="Digite o endereço"
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={salvar}
      >
        <Text style={styles.textoBotao}>
          Salvar Alterações
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 15,
  },

  fotoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },

  categoria: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 10,
  },

  categoriaSelecionada: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },

  botao: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});