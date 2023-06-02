import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import Constants from "expo-constants";
import { db, createTable } from "../screens/database";
import { useNavigation } from "@react-navigation/native";

const NovoCadastro = () => {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");
  const navigation = useNavigation();

  console.log ("novo Cadastro");

  useEffect(() => {
    createTable();
  }, []);

  const salvarCadastro = () => {
    if (nome == "" || senha === "" || idade === "" || sexo === "") {
      console.log("Preencha todos os campos !! ");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO cadastro (nome, senha, idade, sexo) VALUES (?, ?, ?, ?);",
        [nome, senha, idade, sexo],
        (txObj, resultSet) => {
          console.log("Cadastro salvo com sucesso !");
          navigation.navigate("Login");
        },
        (txObj, error) => {
          console.log("Erro ao salvar o cadastro ", error);
        }
      );
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />
        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} value={senha} onChangeText={setSenha} />

        <Text style={styles.label}>Idade</Text>
        <TextInput style={styles.input} value={idade} onChangeText={setIdade} />

        <Picker
            selectedValue={sexo}
            style={styles.picker}
            onValueChange={(itemValue) => setSexo(itemValue)}
          >
            <Picker.Item label="Selecione o sexo" value="" enabled={false} />
            <Picker.Item label="Masculino" value="masculino" />
            <Picker.Item label="Feminino" value="feminino" />
          </Picker>
        <TouchableOpacity
          style={styles.salvarCadastrado}
          onPress={() => salvarCadastro()}
        >
          <Text style={styles.salvar}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 100,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1", 
    padding: 8,
  },

  label: {
    fontSize: 16,
    backgroundColor: "#FFF", 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd", 
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  salvarCadastrado: {
  marginTop: 15,
  backgroundColor: "#4ee44e", // Outra tonalidade de verde
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  alignSelf: "center",
},
  salvar: {
    fontSize: 16,
  },
});

export default NovoCadastro;
