/*import React, { useEffect, useState } from "react";
import { db } from "../screens/database";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  StyleSheet,
  styles,
} from "react-native";

const Atualizar = () => {
  const [usuario, setUsuario] = useState([]);
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");

  useEffect(() => {
    listarUsuarios();
  }, []);

  const listarUsuarios = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cadastro",
        [],
        (_, { rows }) => {
          setUsuario(rows._array);
        },
        (_, error) => {
          console.log("Erro ao listar usuários", error);
        }
      );
    });
  };

  const atualizarCadastro = (usuario) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE cadastro SET nome = ?, idade = ? ,sexo = ?, senha = ? where id = ?",
        [nome, idade, sexo, senha, usuario.id],
        () => {
          console.log("Usuario atualizado com Sucesso !");
        },
        (_, error) => {
          console.log("Error ao Atualizar o usuário", error);
        }
      );
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <TextInput
          style={styles.input}
          placeholder="nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Idade"
          value={idade}
          onChangeText={(text) => setIdade(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Sexo"
          value={sexo}
          onChangeText={(text) => setSexo(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => atualizarCadastro(item)}
        >
          <Text style={styles.updateButtonText}>Atualizar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Listagem de Usuários</Text>
      {usuario.length > 0 ? (
        <FlatList
          data={usuario}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text>Nenhum usuário encontrado</Text>
      )}
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
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default Atualizar;
*/

import React, { useEffect, useState } from "react";
import { db } from "../screens/database";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  StyleSheet,
} from "react-native";

const Atualizar = () => {
  const [usuario, setUsuario] = useState([]);
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");

  useEffect(() => {
    listarUsuarios();
  }, []);

  const listarUsuarios = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cadastro",
        [],
        (_, { rows }) => {
          setUsuario(rows._array);
        },
        (_, error) => {
          console.log("Erro ao listar usuários", error);
        }
      );
    });
  };

  const atualizarCadastro = (usuario) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE cadastro SET nome = ?, idade = ? ,sexo = ?, senha = ? where id = ?",
        [nome, idade, sexo, senha, usuario.id],
        () => {
          console.log("Usuário atualizado com sucesso!");
        },
        (_, error) => {
          console.log("Erro ao atualizar o usuário", error);
        }
      );
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Idade"
          value={idade}
          onChangeText={(text) => setIdade(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Sexo"
          value={sexo}
          onChangeText={(text) => setSexo(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => atualizarCadastro(item)}
        >
          <Text style={styles.updateButtonText}>Atualizar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Listagem de Usuários</Text>
      {usuario.length > 0 ? (
        <FlatList
          data={usuario}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text>Nenhum usuário encontrado</Text>
      )}
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
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default Atualizar;
