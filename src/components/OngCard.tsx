import React from 'react';

// Importa os componentes visuais do React Native
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

// Componente responsável por mostrar um cartão com os dados de uma ONG

export default function OngCard({
  ong,
  navigation
}: any) {

  return (

    <TouchableOpacity
      onPress={() =>
        navigation.navigate(
          'PerfilOng',
          { ong }
        )
      }
    >

      <View style={styles.card}>

        <Image
          source={{ uri: ong.foto }}
          style={styles.imagem}
        />

        <Text style={styles.nome}>
          {ong.nome}
        </Text>

        <Text>
          {ong.categoria}
        </Text>

      </View>

    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3
  },

  imagem: {
    width: '100%',
    height: 180,
    borderRadius: 10
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8
  }

});