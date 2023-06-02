import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { db } from "../screens/database";

const Lista = () => {
  const [cadastros, setCadastro] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cadastro ",
        [],
        (txObj, { rows }) => {
          const data = rows._array;
          setCadastro(data);
        },
        (txObj, error) => {
          console.log("Erro ao Listar os Usuarios cadastrados", error);
        }
      );
    });
  }, []);

  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.center}>Listagem dos Usuários </Text>
      <FlatList
        data={cadastros}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              Nome: {item.nome} - Idade: {item.idade} anos - Sexo: {item.sexo}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatListContainer}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  center: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  listContainer: {
    flexGrow: 1,
    width: "100%",
  },
  itemContainer: {
    backgroundColor: "#FFA500",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 5,
  },
});

export default Lista;
