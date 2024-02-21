import * as crypto from 'crypto'
import db from '../db.js';
import { createSession } from './session.js';
interface User {
  "username": string;
  "name": string;
  "email": string;
  "salt": string;
  "hash": string;
}

const createUser = (username: string, name: string, email: string, password: string) => {
  const [salt, hash] = generatePasswordSaltHash(password);
  const stmt = db.prepare(`INSERT INTO User VALUES (@username, @name, @email, @salt, @hash);`);
  stmt.run({
    username,
    name,
    email,
    salt,
    hash
  })

  return createSession(username);
}
const generatePasswordSaltHash = (password: string) => {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return [salt, hash]
}

const verifyUser = (username: string, password: string) => {
  const user = getUser(username);
  const isVerified = verifyPassword(password, user["salt"], user["hash"]);
  return isVerified ? "User is verified" : "User is not verified";
}

const verifyPassword = (password: string, salt: string, hash: string) => {
  const newHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return newHash === hash;
}

const getUser = (username: string): User => {
  const stmt = db.prepare(`SELECT * FROM User WHERE username = ?;`);
  return stmt.get(username) as User

}

export { createUser, verifyUser, getUser }
