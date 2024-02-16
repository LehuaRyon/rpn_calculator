import inquirer from "inquirer"
import express from "express"
import colors from "colors/safe.js"
import path from "path"
import { fileURLToPath } from "url"
import { error } from "console"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const APP = express() //instantiate express
const PORT = 3000 //save port number where server is listening
const OPERATORS = ["+", "-", "*", "/", "^"]

APP.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname }) // send index.html file to the client
})

APP.listen(PORT, () => {
  // server starts listening on port 3000
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

let inputEquation = []
let errors = []

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
        message: colors.prompt("Enter an equation OR enter 'q' to exit:"),
      },
    ])
    .then((input) => {
      inputEquation = input.equation

      // catch if a user wants to quit as early as possible
      if (inputEquation.trim() === "q") {
        console.log(colors.farewell("Exiting RPN Calculator..."))
        console.log(colors.farewell("See you next time!"))
        process.exit(1)
      }

      // if the input does not contain any operators, return an error and await input again
      if (!findCommonCharacters(inputEquation.trim().split(" "), OPERATORS)) {
        console.log(
          colors.error("Error: ") +
            colors.red(
              "Invalid input. Please enter a valid RPN equation with operator(s).",
            ),
        )
        getUserInput()
        return
      }

      // if user input is valid, compute the equation
      compute(inputEquation)
    })
    .catch((error) => {
      console.log(colors.error("Error: ", error))
    })
}

const compute = (inputEquation) => {
  let equation = inputEquation.trim().split(" ")
  let result = []

  const evaluateBasedOnOperator = (character) => {
    console.log(result)

    // if character is a number, not string, push it to the result array
    if (!isNaN(parseFloat(character))) {
      result.push(character)
      return
    }

    const firstNum = parseFloat(result.pop())
    const secondNum = parseFloat(result.pop())

    switch (character) {
      case "+": // Addition
        result.push(secondNum + firstNum)
        return
      case "-": // Subtraction
        result.push(secondNum - firstNum)
        return
      case "*": // Multiplication
        result.push(secondNum * firstNum)
        return
      case "/": // Division
        if (firstNum === 0) {
          result = []
          errors.push("Division by zero is not allowed.")
        } else {
          result.push(secondNum / firstNum)
        }
        return
      case "^": // Exponentiation
        result.push(Math.pow(secondNum, firstNum))
        return
      default:
        result = []
        errors.push("Invalid input. Please enter a valid RPN equation.")
    }
  }

  // loop over each number/operator in the equation, perform the operation, and update result
  for (let i of equation) {
    evaluateBasedOnOperator(i)
  }

  // if there are any errors, return error
  // if there are no errors, return result and ask for more input
  if (errors.length > 0) {
    console.log(colors.error("Error: ") + colors.red(errors.pop()))
    errors = []
  } else {
    // show last element in result
    console.log(colors.success("Result: ") + colors.white(result.pop()))
  }

  getUserInput()
}

const findCommonCharacters = (arr1, arr2) => {
  // iterate through each element in arr1
  // check if some of them include elements in the second
  // return boolean
  return arr1.some((item) => arr2.includes(item))
}
