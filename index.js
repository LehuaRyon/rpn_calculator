const express = require("express") //import express
const app = express() //instantiate express
const port = 3000 //save port number where server is listening

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname }) //send index.html file to the client
})

app.listen(port, () => {
  //server starts listening on port 3000
  greetUser()
})

const greetUser = () => {
  console.log("Hello Mathematician! Are you ready to do some math?")
}
