import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { db } from "../screens/database";

const Deletar = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    listarUsuarios();
  }, []);

  const listarUsuarios = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cadastro",
        [],
        (_, { rows }) => {
          setUsuarios(rows._array);
        },
        (_, error) => {
          console.log("Erro ao listar usuários", error);
        }
      );
    });
  };

  const confirmaEclusao = (usuario) => {
    Alert.alert("Ecluir usuário", 
    `Deseja excluir o usário ${usuario.nome} ?`, [
      {
        text: "Cancelar",
        style: "Cancel",
      },
      {
        text: "Confirmar",
        onPress: () => excluirUsuario(usuario),
        style: "destructive",
      },
    ]);
  };

 

  const excluirUsuario = (usuario) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM cadastro where id= ?",
        [usuario.id],
        () => {
          console.log("Usuario excluido com sucesso !!!"), listarUsuarios();
        },
        (_, error) => {
          console.log("Erro ao excluir o usuário", error);
        }
      );
    });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => confirmaEclusao(item)}
      >
        <Text>{item.nome}</Text>
        {/* Botão de exclusão */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => confirmaEclusao(item)}
        >
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Listagem de Usuários</Text>
      <FlatList
        data={usuarios}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#ffffff",
  },
});

export default Deletar;
