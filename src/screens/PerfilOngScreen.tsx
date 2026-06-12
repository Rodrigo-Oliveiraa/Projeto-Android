import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

      //puxa os dados do banco das ongs

export default function PerfilScreen({
  route,
  navigation,
}: any) {
  const ong = route?.params?.ong;

  if (!ong) {
    return (
      <View style={styles.container}>
        <Text>ONG não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>

        {/* FOTO E DADOS PRINCIPAIS */}
        <View style={styles.topo}>

          {ong.foto ? (
            <Image
              source={{ uri: ong.foto }}
              style={styles.foto}
            />
          ) : (
            <View style={styles.fotoPlaceholder}>
              <Text style={styles.iconeFoto}>
                📷
              </Text>
            </View>
          )}

          <View style={styles.informacoes}>
            <Text style={styles.nome}>
              {ong.nome}
            </Text>

            <Text style={styles.categoria}>
              {ong.categoria}
            </Text>
          </View>

        </View>

        {/* DADOS DA ONG */}
        <View style={styles.secao}>
          <Text style={styles.label}>
            E-mail
          </Text>

          <Text style={styles.valor}>
            {ong.email}
          </Text>
        </View>

        <View style={styles.secao}>
          <Text style={styles.label}>
            Descrição
          </Text>

          <Text style={styles.valor}>
            {ong.descricao}
          </Text>
        </View>

        <View style={styles.secao}>
          <Text style={styles.label}>
            Telefone
          </Text>

          <Text style={styles.valor}>
            {ong.telefone}
          </Text>
        </View>

        <View style={styles.secao}>
          <Text style={styles.label}>
            Endereço
          </Text>

          <Text style={styles.valor}>
            {ong.endereco}
          </Text>
        </View>

        {/* BOTÃO EDITAR */}
        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={() =>
            navigation.navigate(
              'EditarPerfil',
              { ong }
            )
          }
        >
          <Text style={styles.textoBotao}>
            ✏️ Editar Perfil
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 3,
  },

  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  foto: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  fotoPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E0E0E0',

    justifyContent: 'center',
    alignItems: 'center',
  },

  iconeFoto: {
    fontSize: 35,
  },

  informacoes: {
    flex: 1,
    marginLeft: 20,
  },

  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  categoria: {
    fontSize: 16,
    color: '#666',
  },

  secao: {
    marginBottom: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 5,
  },

  valor: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },

  botaoEditar: {
    backgroundColor: '#1565C0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});