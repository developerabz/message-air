
import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import db from "./db.js"
import { createChat, getChat } from "./backend/chat.js"
// Backend
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static('src'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
console.log(__dirname)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/index.html'))
  return
})
// TODO: add call functions that provide a response
app.post('/chat/create', (req, res) => {
  createChat(req.body.users)
  res.json({ message: "success" })
  return
})

app.get('/chat/chatname', (req, res) => {
  getChat(req.body.users)
  res.json({ message: "success" })
  return
})

app.post('/chat/addmessage', (req, res) => {
  console.log("post request")

  // data.message.push(req.body.message)
  // console.log(data)
  //addMessageToChatroom("chatroom", req.body.message)

  res.json({ message: "success" })
  return
})


app.get('/posts', (req, res) => {
  // res.json(data.message)
  return
})

app.listen(3000)
