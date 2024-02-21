
import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import { addMessage, addMessageToChatroom, createChat, getChat, getLastTenMessages } from "./backend/chat.js"
import { createUser } from "./backend/user.js"

// Backend
const app = express()
let guest_exists = false;
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

app.get('/403', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/status-pages/403.html'))
  return
})


app.post('/user/create', (req, res) => {
  //console.log(req.body)
  const { email, name, username, password } = req.body;
  const user = createUser(username, name, email, password);
  console.log(user)
  res.json(user)
  // createUser()
  return
})
app.post('/chat/create', (req, res) => {
  console.log("work")
  const { authUser, otherUser } = req.body;
  console.log(authUser);
  console.log(otherUser)
  createChat([authUser, otherUser])
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
  const { message } = req.body;
  console.log(message);
  console.log("Okay here is the db right now")


  // data.message.push(req.body.message)
  // console.log(data)
  // test start REMOVE THIS WHEN PROPERLY CREATING USER OR BETTER GUEST
  if (!guest_exists) {
    createUser("authguy", "authguy", "auth@guy.com", "authguy");
    createUser("otherguy", "otherguy", "other@guy.com", "otherguy");
    guest_exists = true
  }
  addMessage("authguy", message, ["authguy", "otherguy"])
  console.log("success of adding message")

  // test end
  //addMessageToChatroom(chatname, message)

  res.json({ message: "success" })
  return
})


app.get('/posts/:id', (req, res) => {
  // res.json(data.message)
  const chatid = req.params.id;


  console.log("getting the posts now for" + chatid);
  res.json(getLastTenMessages(chatid));
  return
})

app.listen(3000)
