
import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import db from "./db.js"
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
  return
})

app.get('/chat/chatname', (req, res) => {
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
