import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

type Ong = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  descricao: string;
  telefone: string;
  endereco: string;
  categoria: string;
  foto: string;
};

let db: SQLite.SQLiteDatabase | null = null;

if (Platform.OS !== 'web') {
  db = SQLite.openDatabaseSync('conectaong.db');
}

/* =========================
   CRIAR TABELA
========================= */
export function criarTabela() {
  if (Platform.OS === 'web') return;
  if (!db) return;

  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS ongs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL,
        descricao TEXT NOT NULL,
        telefone TEXT NOT NULL,
        endereco TEXT NOT NULL,
        categoria TEXT NOT NULL,
        foto TEXT
      );
    `);
  } catch (error) {
    console.log(error);
  }
}

/* =========================
   WEB STORAGE HELPERS
========================= */
function getWebData(): Ong[] {
  return JSON.parse(localStorage.getItem('ongs') || '[]');
}

function setWebData(data: Ong[]) {
  localStorage.setItem('ongs', JSON.stringify(data));
}

/* =========================
   INSERIR ONG
========================= */
export function inserirOng(
  nome: string,
  email: string,
  senha: string,
  descricao: string,
  telefone: string,
  endereco: string,
  categoria: string,
  foto: string
) {
  if (Platform.OS === 'web') {
    const dados = getWebData();

    const existe = dados.some((o) => o.email === email);
    if (existe) return false;

    dados.push({
      id: Date.now(),
      nome,
      email,
      senha,
      descricao,
      telefone,
      endereco,
      categoria,
      foto,
    });

    setWebData(dados);
    return true;
  }

  if (!db) return false;

  try {
    db.runSync(
      `
      INSERT INTO ongs
      (nome, email, senha, descricao, telefone, endereco, categoria, foto)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [nome, email, senha, descricao, telefone, endereco, categoria, foto]
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/* =========================
   LOGIN
========================= */
export function buscarOngPorLogin(email: string, senha: string) {
  if (Platform.OS === 'web') {
    const dados = getWebData();
    return dados.find((o) => o.email === email && o.senha === senha) || null;
  }

  if (!db) return null;

  try {
    return db.getFirstSync(
      `
      SELECT * FROM ongs
      WHERE email = ? AND senha = ?
      `,
      [email, senha]
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}

/* =========================
   LISTAR ONGS (HOME)
========================= */
export function buscarTodasOngs(): Ong[] {
  if (Platform.OS === 'web') {
    return getWebData().sort((a, b) =>
      a.nome.localeCompare(b.nome)
    );
  }

  if (!db) return [];

  try {
    const result = db.getAllSync(`SELECT * FROM ongs ORDER BY nome`);
    return Array.isArray(result) ? (result as Ong[]) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

/* =========================
   ATUALIZAR ONG
========================= */
export function atualizarOng(
  id: number,
  nome: string,
  senha: string,
  descricao: string,
  telefone: string,
  endereco: string,
  categoria: string,
  foto: string
) {
  if (Platform.OS === 'web') {
    const dados = getWebData();

    const index = dados.findIndex((o) => o.id === id);
    if (index === -1) return false;

    dados[index] = {
      ...dados[index],
      nome,
      senha,
      descricao,
      telefone,
      endereco,
      categoria,
      foto,
    };

    setWebData(dados);
    return true;
  }

  if (!db) return false;

  try {
    db.runSync(
      `
      UPDATE ongs
      SET nome = ?,
          senha = ?,
          descricao = ?,
          telefone = ?,
          endereco = ?,
          categoria = ?,
          foto = ?
      WHERE id = ?
      `,
      [nome, senha, descricao, telefone, endereco, categoria, foto, id]
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/* =========================
   EXCLUIR ONG
========================= */
export function excluirOng(id: number) {
  if (Platform.OS === 'web') {
    const dados = getWebData();
    const filtrado = dados.filter((o) => o.id !== id);
    setWebData(filtrado);
    return true;
  }

  if (!db) return false;

  try {
    db.runSync(`DELETE FROM ongs WHERE id = ?`, [id]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default db;