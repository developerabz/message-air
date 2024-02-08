CREATE TABLE IF NOT EXISTS User (
  username TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  salt TEXT NOT NULL UNIQUE,
  hash TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Chatroom (
  chatid TEXT PRIMARY KEY,
  name TEXT
);

CREATE TABLE IF NOT EXISTS ChatroomUsers (
  username TEXT,
  chatid TEXT,
  FOREIGN KEY(username) REFERENCES User(username),
  FOREIGN KEY(chatid) REFERENCES Chatroom(chatid)
);

CREATE TABLE IF NOT EXISTS Message (
  messageid TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  messageInfo TEXT NOT NULL,
  lastModified INTEGER NOT NULL,
  FOREIGN KEY(username) REFERENCES User(username)
);

CREATE TABLE IF NOT EXISTS ChatroomMessages (
  chatid TEXT NOT NULL,
  messageid TEXT NOT NULL,
  FOREIGN KEY(chatid) REFERENCES Chatroom(chatid),
  FOREIGN KEY(messageid) REFERENCES Message(messageid)
);

