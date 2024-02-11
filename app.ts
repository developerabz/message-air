
import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import { createChat, getChat } from "./backend/chat.js"
import { createUser } from "./backend/user.js"
// Backend
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
//app.use(express.static('src'))
// TODO: build the portfolio + the server side full stack project
// TODO: - start adding/updating html pages for:
// TODO: - login page
// TODO: - chats
// TODO: - dashboard
// TODO: - messaging
// TODO: - add functionality for navigating between chats
// TODO: - complete backend tests and functionality
// TODO: - complete frontend functionality

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
console.log(__dirname)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/signup.html'))
  return
})

app.get('/tailwind.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/tailwind.css'))
  return
})

app.get('/index.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/index.js'))
  return
})

app.get('/signup.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/signup.js'))
  return
})
app.get('/images/profile-icon.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/images/profile-icon.jpg'))
  return
})

app.get('/images/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/images/favicon.ico'))
  return
})


app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'))
  return
})

app.post('/user/create', (req, res) => {
  console.log(req.body)
  const { email, name, username, password } = req.body;
  const user = createUser(username, name, email, password);
  console.log(user)
  res.json({ message: "success" })
  // createUser()
  return
})
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
