import Database from "better-sqlite3";

const db = new Database('messager.sql');
db.pragma('journal_mode = WAL');

export default db;
