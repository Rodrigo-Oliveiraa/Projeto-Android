import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

    //cria a pagina de perfil e insere os dados do banco

import { SafeAreaView } from 'react-native-safe-area-context';

export default function PerfilScreen({
  route,
  navigation,
}: any) {
  const ong = route?.params?.ong;

  if (!ong) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>ONG não encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* Botão editar */}
        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={() =>
            navigation.navigate('EditarPerfil', {
              ong,
            })
          }
        >
          <Text style={styles.textoEditar}>
            ✏️ Editar Perfil
          </Text>
        </TouchableOpacity>

        {/* Foto */}
        {ong.foto ? (
          <Image
            source={{ uri: ong.foto }}
            style={styles.foto}
          />
        ) : (
          <View style={styles.fotoPlaceholder}>
            <Text style={{ color: '#999' }}>
              Sem foto
            </Text>
          </View>
        )}

        {/* Nome */}
        <Text style={styles.nome}>
          {ong.nome}
        </Text>

        {/* Dados */}
        <View style={styles.card}>
          <Text style={styles.campo}>
            <Text style={styles.label}>
              E-mail:
            </Text>{' '}
            {ong.email}
          </Text>

          <Text style={styles.campo}>
            <Text style={styles.label}>
              Categoria:
            </Text>{' '}
            {ong.categoria}
          </Text>

          <Text style={styles.campo}>
            <Text style={styles.label}>
              Descrição:
            </Text>{' '}
            {ong.descricao}
          </Text>

          <Text style={styles.campo}>
            <Text style={styles.label}>
              Telefone:
            </Text>{' '}
            {ong.telefone}
          </Text>

          <Text style={styles.campo}>
            <Text style={styles.label}>
              Endereço:
            </Text>{' '}
            {ong.endereco}
          </Text>
        </View>

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
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  botaoEditar: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },

  textoEditar: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: 16,
  },

  foto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 15,
  },

  fotoPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  card: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 12,
  },

  campo: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 22,
  },

  label: {
    fontWeight: 'bold',
  },
});