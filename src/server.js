import inquirer from "inquirer"
import express from "express"
import colors from "colors/safe.js"
import path from "path"
import { fileURLToPath } from "url"

// CODE FOR UI: LINES 10-22 + ./public
// CODE FOR CLI TOOL: LINES 20-157

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express() //instantiate express
const PORT = process.env.PORT || 3000 //save port number where server is listening
const OPERATORS = ["+", "-", "*", "/", "^"]

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")))

// Listen for incoming requests
app.listen(PORT, () => {
  console.log(`App available on http://localhost:${PORT}`), greetUser()
})

colors.setTheme({
  welcome: ["bold", "cyan"],
  error: ["bold", "red"],
  warning: ["bold", "yellow"],
  success: ["bold", "green"],
  clear: ["bold", "blue"],
  prompt: ["bold", "gray"],
  farewell: ["bold", "magenta"],
})

let inputEquation = []
let errors = []
let result = []

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
          "Enter an equation, enter 'c' to clear the stack, or enter 'q' to exit:",
        ),
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

      if (inputEquation.trim() === "c") {
        result = []
        console.log(colors.clear("Result has been cleared."))
        getUserInput()
        return
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

  const evaluateBasedOnOperator = (character) => {
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
          errors.push("Division by zero is not allowed.")
        } else {
          result.push(secondNum / firstNum)
        }
        return
      case "^": // Exponentiation
        result.push(Math.pow(secondNum, firstNum))
        return
      default:
        result.push(character)
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
    console.log(colors.success("Result: ") + colors.white(result.slice(-1)[0]))
  }

  getUserInput()
}

const findCommonCharacters = (arr1, arr2) => {
  // iterate through each element in arr1
  // check if some of them include elements in the second
  // return boolean
  return arr1.some((item) => arr2.includes(item))
}
