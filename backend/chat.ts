// TODO: Write functionality for functions
import createHttpError from "http-errors"
import db from "../db.js"

const createChat = (usernames: string[]) => {
  // return createHttpError.NotFound()
  let stmt = db.prepare(`INSERT INTO Chatroom VALUES (@chatid, @name)`);
  const chatid = usernames.sort().join(',')
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
  const chatid = usernames.sort().join(',')
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
  const stmt = db.prepare(`INSERT INTO ChatroomMessages VALUES (@chatid, @messageid)`);
  stmt.run({
    chatid,
    messageid
  })
  return 'message added to chatroom'
}

const getChat = (usernames: string[]) => {
  const chatid = usernames.sort().join(',');
  const stmt = db.prepare(`SELECT * FROM Chatroom WHERE chatid = ?`);
  return stmt.get(chatid);
}

const getLastTenMessages = (usernames: string[]) => {
  return
}


export { createChat, addMessage, getChat }
