import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import { getData, setData } from "./db.js"
// Backend
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static('src'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const data = getData();
console.log(__dirname)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/index.html'))
  return
})

app.post('/', (req, res) => {
  console.log("post request")
  data.message.push(req.body.message)
  console.log(data)
  res.json({ message: "success" })
  return
})

app.get('/posts', (req, res) => {
  res.json(data.message)
  return
})

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '/favicon.ico'))
  return
})

app.listen(3000)
