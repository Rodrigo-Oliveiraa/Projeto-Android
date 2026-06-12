
import React, { useEffect, useState } from 'react';

// Importa os componentes visuais do React Native
import {
  View,              
  Text,              
  FlatList,          
  TouchableOpacity, 
  StyleSheet,        
  Image,             
} from 'react-native';

// SafeAreaView evita que os componentes fiquem atrás da câmera frontal, barra de notificações ou barra de gestos
import { SafeAreaView } from 'react-native-safe-area-context';

// Importa a função responsável por buscar todas as ONGs cadastradas
import { buscarTodasOngs } from '../database/database';

type Ong = {
  id: number;
  nome: string;
  categoria: string;
  foto: string;
};

// Tela inicial do aplicativo
export default function HomeScreen({ navigation }: any) {

  // Estado que armazenará a lista de ONGs
  const [ongs, setOngs] = useState<Ong[]>([]);

  
  useEffect(() => {

    
    carregarOngs();

    // Atualiza a lista sempre que voltar para esta tela
    const unsubscribe = navigation.addListener('focus', () => {
      carregarOngs();
    });

    
    return unsubscribe;

  }, [navigation]);

  // Função responsável por buscar as ONGs no banco de dados
  function carregarOngs() {

    const lista = buscarTodasOngs() as Ong[];

    setOngs(lista);
  }

  return (

    // Área segura da tela
    <SafeAreaView style={styles.container}>

      {/* Cabeçalho do aplicativo */}
      <View style={styles.header}>

        {/* Nome do aplicativo */}
        <Text style={styles.logo}>
          ConectaONGs
        </Text>

      </View>

      {/* Área dos botões Login e Cadastro */}
      <View style={styles.menu}>

        {/* Botão Login */}
        <TouchableOpacity
          style={styles.botaoMenu}

          // Navega para a tela de Login
          onPress={() => navigation.navigate('Login')}
        >

          <Text style={styles.textoMenu}>
            Login
          </Text>

        </TouchableOpacity>

        {/* Botão Cadastro */}
        <TouchableOpacity
          style={styles.botaoMenu}

          // Navega para a tela de Cadastro
          onPress={() => navigation.navigate('Cadastro')}
        >

          <Text style={styles.textoMenu}>
            Cadastro
          </Text>

        </TouchableOpacity>

      </View>

      {/* Título da lista */}
      <Text style={styles.titulo}>
        ONGs cadastradas
      </Text>

      {/* Lista de ONGs */}
      <FlatList

        
        data={ongs}

        
        keyExtractor={(item) => item.id.toString()}

        
        contentContainerStyle={styles.lista}

        
        showsVerticalScrollIndicator={false}

        
        renderItem={({ item }) => (

          // Card clicável da ONG
          <TouchableOpacity

            style={styles.card}

            // Ao clicar, abre o perfil da ONG
            onPress={() =>
              navigation.navigate('Perfil', {
                ong: item,
              })
            }
          >

            {/* Verifica se a ONG possui foto */}
            {item.foto ? (

              
              <Image
                source={{ uri: item.foto }}
                style={styles.foto}
              />

            ) : (

              // Caso não tenha foto, mostra um ícone padrão
              <View style={styles.fotoPlaceholder}>

                <Text>📷</Text>

              </View>

            )}

            {/* Informações da ONG */}
            <View style={styles.info}>

              {/* Nome da ONG */}
              <Text style={styles.nome}>
                {item.nome}
              </Text>

              {/* Categoria da ONG */}
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

// Estilos da tela
const styles = StyleSheet.create({

  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  // Cabeçalho azul
  header: {
    backgroundColor: '#1565C0',
    paddingVertical: 25,
    alignItems: 'center',
  },

  // Nome do aplicativo
  logo: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },

  // Área dos botões
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  // Estilo dos botões
  botaoMenu: {
    backgroundColor: '#1565C0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  // Texto dos botões
  textoMenu: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  // Título da lista
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  // Espaçamento inferior da lista
  lista: {
    paddingBottom: 30,
  },

  // Card de cada ONG
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,

    // Sombra no iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,

    // Sombra no Android
    elevation: 3,
  },

  // Foto da ONG
  foto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },

  // Foto padrão quando não existe imagem
  fotoPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E0E0E0',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 15,
  },

  // Área das informações da ONG
  info: {
    flex: 1,
  },

  // Nome da ONG
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Categoria da ONG
  categoria: {
    color: '#666',
    marginTop: 5,
  },
});