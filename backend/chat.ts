// TODO: Write functionality for functions
import createHttpError from "http-errors"
import db from "../db.js"

interface ChatName {
  chatid: string;
  name: string;
}

const createChat = (usernames: string[]) => {
  // return createHttpError.NotFound()
  let stmt = db.prepare(`INSERT INTO Chatroom VALUES (@chatid, @name)`);
  const chatid = usernames.sort().join('-')
  stmt.run({
    chatid,
    name: chatid
  })

  return getChat(usernames);

}

const addMessage = (authUser: string, message: string, usernames: string[]) => {
  const lastModifiedDate = new Date();
  const lastModified = lastModifiedDate.getTime();
  const messageid = String(Math.floor(Math.random() * 100000000000))
  const chatid = usernames.sort().join('-')

  console.log(lastModified, messageid, authUser, message);
  const stmt = db.prepare(`INSERT INTO Message VALUES (@messageid, @username, @messageInfo, @lastModified)`);
  stmt.run({
    messageid,
    username: authUser,
    messageInfo: message,
    lastModified
  })
  addMessageToChatroom(chatid, messageid);
  return 'message added'
}

const addMessageToChatroom = (chatid: string, messageid: string) => {
  console.log(chatid, messageid)
  const stmt = db.prepare(`INSERT INTO ChatroomMessages VALUES (@chatid, @messageid)`);
  stmt.run({
    chatid,
    messageid
  })
  return 'message added to chatroom'
}

const getChat = (usernames: string[]): ChatName => {
  const chatid = usernames.sort().join('-');
  const stmt = db.prepare(`SELECT * FROM Chatroom WHERE chatid = ?`);
  return stmt.get(chatid) as ChatName;
}

const getLastTenMessages = (chatid: string) => {

  const stmt = db.prepare(`
    SELECT m.messageid, m.username, m.messageInfo, m.lastModified FROM Chatroom c
    LEFT JOIN ChatroomMessages cm
    ON c.chatid = cm.chatid
    RIGHT JOIN Message m
    ON cm.messageid = m.messageid
    WHERE c.chatid = ?`)
  return stmt.all(chatid)
}


export {
  createChat,
  addMessage,
  getChat,
  addMessageToChatroom,
  getLastTenMessages

}
