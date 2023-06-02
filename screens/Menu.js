import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";


const Menu = ({ navigation }) => {

  const Lista = () => {
    navigation.navigate("Lista");
    console.log("listar cadastro");
  };

  const deletarUser = () => {
    navigation.navigate("Deletar");
    console.log("Deletar User !");
  };

  const atualizarCadastro = () => {
    navigation.navigate("Atualizar")
    console.log("Atualizar cadastro !");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={Lista}>
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
    paddingVertical: 40,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default Menu;
