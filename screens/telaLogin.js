import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import * as SQLite from 'expo-sqlite';
import {db} from "../screens/database";



const TelaLogin = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");

  const validarLogin = (username, senha) => {
    db.transaction((tx) => {
      tx.executeSql(
      "SELECT * FROM CADASTRO WHERE  NOME = ? AND SENHA = ? LIMIT 1",
        [username, senha],
        (txObj, resultSet) => {
          if (resultSet.rows.length > 0) {
            console.log("login Válido !");
            navigation.navigate("Menu");
          } else {
            console.log("Login inválido! Verifique suas credenciais.");
          }
        },
        (txObj, error) => {
          console.log("Erro ao realizar a consulta no banco de dados", error);
        }
      );
    });
  };

  const login = () => {
    console.log("Username", username);
    console.log("Senha", senha);
    validarLogin(username, senha);
  };

  const criarConta = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../images/cadeado.jpeg")} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />
      <Button title="Login" onPress={login} />
      <TouchableOpacity style={styles.txtCriarConta} onPress={criarConta}>
        <Text style={styles.txtCriarConta}> Criar conta </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    padding: 10,
    width: "80%",
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  txtCriarConta: {
    color: "black",
    marginBottom: 50,
    marginTop: 20,
  },
});

export default TelaLogin;
