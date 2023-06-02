import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("database.db");
    console.log("banco de dados criado com sucesso!");

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS cadastro (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, senha TEXT, idade INTEGER, sexo TEXT);"
    );
  });
};

export { db, createTable };
