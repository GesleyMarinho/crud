
import React, { useEffect, useState } from "react";
import { db } from "../screens/database";
import { Picker } from "@react-native-picker/picker";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Modal,
} from "react-native";

const Atualizar = ({ navigation }) => {
  const [usuario, setUsuario] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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

  const atualizarCadastro = () => {
    if (usuarioSelecionado) {
      setShowConfirmationModal(true);
    }
  };

  const confirmarAtualizacao = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE cadastro SET nome = ?, idade = ? ,sexo = ?, senha = ? where id = ?",
        [
          nome,
          idade.toString(),
          sexo,
          senha.toString(),
          usuarioSelecionado.id,
        ],
        () => {
          console.log("Usuário atualizado com sucesso!");
          setShowConfirmationModal(false);
          navigation.navigate("Menu"); // Navigate back to Menu.js
        },
        (_, error) => {
          console.log("Erro ao atualizar o usuário", error);
        }
      );
    });
  };

  const cancelarAtualizacao = () => {
    setShowConfirmationModal(false);
  };

  const selecionarUsuario = (item) => {
    setUsuarioSelecionado(item);
    setNome(item.nome);
    setIdade(item.idade.toString());
    setSexo(item.sexo);
    setSenha(item.senha.toString());
  };

  return (
    <View style={styles.container}>
      <Text>Listagem de Usuários</Text>
      <Picker
        selectedValue={usuarioSelecionado}
        style={styles.picker}
        onValueChange={(itemValue) => selecionarUsuario(itemValue)}
      >
        {usuario.map((item) => (
          <Picker.Item key={item.id} label={item.nome} value={item} />
        ))}
      </Picker>

      {usuarioSelecionado && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Idade"
            value={idade}
            onChangeText={(text) => setIdade(text)}
          />

          <Picker
            selectedValue={sexo}
            style={styles.picker}
            onValueChange={(itemValue) => setSexo(itemValue)}
          >
            <Picker.Item label="Selecione o sexo" value="" enabled={false} />
            <Picker.Item label="Masculino" value="masculino" />
            <Picker.Item label="Feminino" value="feminino" />
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />

          <TouchableOpacity
            style={styles.updateButton}
            onPress={atualizarCadastro}
          >
            <Text style={styles.updateButtonText}>Atualizar</Text>
          </TouchableOpacity>
        </View>
      )}

      {usuarioSelecionado === null && (
        <Text>Selecione um usuário para atualizar.</Text>
      )}

      {/* Confirmation Modal */}
      <Modal visible={showConfirmationModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Deseja confirmar a atualização?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmarAtualizacao}
              >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={cancelarAtualizacao}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  formContainer: {
    marginTop: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
  },
  confirmButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#CCCCCC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default Atualizar;


