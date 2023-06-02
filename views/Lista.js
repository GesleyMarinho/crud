import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
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
      <ScrollView style={styles.scrollView}>
        {cadastros.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemText}>
              Nome: {item.nome} - Idade: {item.idade} anos - Sexo: {item.sexo} - Senha: {item.senha}
            </Text>
          </View>
        ))}
      </ScrollView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 20,
  },
  center: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
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
