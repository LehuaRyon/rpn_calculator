import inquirer from "inquirer"
import express from "express"
import colors from "colors/safe.js"

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
  prompt: ["bold", "gray"],
  farewell: ["bold", "magenta"],
})

let inputEquation

const greetUser = () => {
  console.log(
    colors.welcome("Hello Mathematician! Are you ready to do some math?"),
  )

  getUserInput()
}

const getUserInput = () => {
  // use inquirer to get terminals input
  inquirer
    .prompt([
      {
        type: "input",
        name: "equation",
        message: colors.prompt(
          "Enter an equation in Reverse Polish Notation (RPN) OR enter 'q' to exit:",
        ),
      },
    ])
    .then((input) => {
      inputEquation = input.equation

      // exit the calculator if user enters "q"
      if (inputEquation.includes("q")) {
        console.log(colors.farewell("Exiting RPN Calculator..."))
        console.log(colors.farewell("See you next time!"))
        process.exit(1)
      } else {
        console.log("inputEquation", inputEquation)
        // compute(inputEquation)
      }
    })
    .catch((error) => {
      console.log(colors.error("Error: ", error))
    })
}
