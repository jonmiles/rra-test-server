import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('tmp.db');

db.run(
  'CREATE TABLE IF NOT EXISTS todos(account TEXT, id INTEGER PRIMARY KEY, label TEXT, complete INTEGER DEFAULT 0)',
);
