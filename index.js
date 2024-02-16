const express = require("express") //import express
const colors = require("colors/safe")

const app = express() //instantiate express
const port = 3000 //save port number where server is listening

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname }) //send index.html file to the client
})

app.listen(port, () => {
  //server starts listening on port 3000
  greetUser()
})

colors.setTheme({
  welcome: ["bold", "cyan"],
  error: ["bold", "red"],
  warning: ["bold", "yellow"],
  success: ["bold", "green"],
})

const greetUser = () => {
  console.log(
    colors.welcome("Hello Mathematician! Are you ready to do some math?"),
  )
}
