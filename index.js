import inquirer from "inquirer"
import express from "express"
import colors from "colors/safe.js"
import path from "path"
import { fileURLToPath } from "url"
import { error } from "console"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
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
      compute(inputEquation)
    })
    .catch((error) => {
      console.log(colors.error("Error: ", error))
    })
}

// const compute = () => {
//   let equation = inputEquation.trim().split(" ")
//   let result = []
//   let operators = ["+", "-", "*", "/"]

//   // loop over each token/number in the equation, perform the operation, and update result
//   for (let i = 0; i < equation.length; i++) {
//     let numberOrOperator = equation[i]

//     // if not a number and not an operator, return error
//     if (isNaN(numberOrOperator) && !operators.includes(numberOrOperator)) {
//       exitOrShowError(numberOrOperator)
//     } else {
//       if (!isNaN(numberOrOperator)) {
//         result.push(numberOrOperator)
//       } else if (operators.includes(numberOrOperator)) {
//         let a = result.pop()
//         let b = result.pop()

//         if (numberOrOperator === "+") {
//           // console.log(a, b, result)
//           result.push(parseInt(a) + parseInt(b))
//         } else if (token === "-") {
//           result.push(parseInt(b) - parseInt(a))
//         } else if (token === "*") {
//           result.push(parseInt(a) * parseInt(b))
//         } else if (token === "/") {
//           result.push(parseInt(b) / parseInt(a))
//         }
//       }
//     }
//   }

//   // if there are any errors, return error
//   // if there are no errors, return result and ask for more input
//   if (errors.length > 0) {
//     console.log(colors.error("Error: ") + colors.red(errors[0]))
//     errors = []
//   } else {
//     console.log(colors.success("Result: ") + colors.white(result[0]))
//   }

//   getUserInput()
// }

const compute = (inputEquation) => {
  let equation = inputEquation.trim().split(" ")
  const result = []
  // let operators = ["+", "-", "*", "/"]

  const evaluateBasedOnOperator = (character) => {
    if (!isNaN(parseFloat(character))) {
      result.push(character)
      return
    }

    const firstNum = parseFloat(result.pop())
    const secondNum = parseFloat(result.pop())

    switch (character) {
      case "+": // Addition
        result.push(secondNum + firstNum)
        // result.push(round(+num2 + +num1));
        return
      case "-": // Subtraction
        result.push(secondNum - firstNum)
        return
      case "*": // Multiplication
        result.push(secondNum * firstNum)
        return
      case "/": // Division
        // TODO: handle division by zero
        result.push(secondNum / firstNum)
        return
      case "^": // Exponentiation
        result.push(Math.pow(secondNum, firstNum))
        return
      default:
        throw new Error(`Invalid token: ${character}`)
    }
  }

  // loop over each token/number in the equation, perform the operation, and update result
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

const exitOrShowError = (character) => {
  if (character === "q") {
    console.log(colors.farewell("Exiting RPN Calculator..."))
    console.log(colors.farewell("See you next time!"))
    process.exit(1)
  } else {
    errors.push("Invalid input. Please enter a valid RPN equation.")
  }
}
