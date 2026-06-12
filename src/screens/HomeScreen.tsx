import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { buscarTodasOngs } from '../database/database';

type Ong = {
  id: number;
  nome: string;
  categoria: string;
  foto: string;
};

export default function HomeScreen({ navigation }: any) {
  const [ongs, setOngs] = useState<Ong[]>([]);

  useEffect(() => {
    carregarOngs();

    const unsubscribe = navigation.addListener('focus', () => {
      carregarOngs();
    });

    return unsubscribe;
  }, [navigation]);

  function carregarOngs() {
    const lista = buscarTodasOngs() as Ong[];
    setOngs(lista);
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          ConectaONGs
        </Text>
      </View>

      {/* Botões */}
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.textoMenu}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.textoMenu}>
            Cadastro
          </Text>
        </TouchableOpacity>
      </View>

      {/* Título */}
      <Text style={styles.titulo}>
        ONGs cadastradas
      </Text>

      {/* Lista */}
      <FlatList
        data={ongs}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Perfil', { ong: item })
            }
          >

            {item.foto ? (
              <Image
                source={{ uri: item.foto }}
                style={styles.foto}
              />
            ) : (
              <View style={styles.fotoPlaceholder}>
                <Text>📷</Text>
              </View>
            )}

            <View style={styles.info}>
              <Text style={styles.nome}>
                {item.nome}
              </Text>

              <Text style={styles.categoria}>
                {item.categoria}
              </Text>
            </View>

          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  header: {
    backgroundColor: '#1565C0',
    paddingVertical: 25,
    alignItems: 'center',
  },

  logo: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },

  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  botaoMenu: {
    backgroundColor: '#1565C0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  textoMenu: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  lista: {
    paddingBottom: 30,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 3,
  },

  foto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },

  fotoPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E0E0E0',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 15,
  },

  info: {
    flex: 1,
  },

  nome: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  categoria: {
    color: '#666',
    marginTop: 5,
  },
});