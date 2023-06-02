import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Menu = ({ navigation }) => {
  const listarCadastro = () => {
    console.log("listar cadastro");
  };

  const deletarUser = () => {
    console.log("Deletar User !");
  };

  const atualizarCadastro = () => {
    console.log("Atualizar cadastro !");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={listarCadastro}>
        <Text style={styles.buttonText}>Listar Cadastros</Text>
        <Icon name="users" size={20} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={deletarUser}>
        <Text style={styles.buttonText}>Deletar User</Text>
        <Icon name="user-secret" size={20} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={atualizarCadastro}>
        <Text style={styles.buttonText}>Atualizar Cadastros</Text>
        <Icon name="user-plus" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF4500",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default Menu;
