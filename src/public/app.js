const OPERATORS = ["+", "-", "*", "/", "^"]
let stack = []

const addOperand = (operand) => {
  stack.push(operand)
  updateShownInput()
}

const addOperator = (operator) => {
  stack.push(operator)
  updateShownInput()
}

const compute = () => {
  try {
    let result = evaluateBasedOnOperator(stack)
    // if the input had no operators, return the same inputted operands
    if (result.length > 1) {
      stack = result
    } else {
      stack = [result]
    }
    updateShownInput()
  } catch (error) {
    stack = []
    updateShownInput()
  }
}

const clearAll = () => {
  stack = []
  updateShownInput()
}

const updateShownInput = () => {
  document.getElementById("shownInput").value = stack.join(" ")
}

const evaluateDivision = (secondNum, firstNum) => {
  if (firstNum === 0) {
    alert("Division by zero is not allowed.")
    // remove the last two elements from the stack, which are the division operator and the 0
    // return last result before invalid operation
    return stack.slice(0, -2).pop()
  } else {
    return secondNum / firstNum
  }
}

const evaluateBasedOnOperator = (characters) => {
  if (!hasOperators(characters, OPERATORS)) {
    alert("No operators found. Please enter a valid RPN equation.")
    // cast each character string to a number
    let numberArray = characters.map(Number)
    return numberArray
  } else {
    const operators = {
      "+": (secondNum, firstNum) => secondNum + firstNum, // Addition
      "-": (secondNum, firstNum) => secondNum - firstNum, // Subtraction
      "*": (secondNum, firstNum) => secondNum * firstNum, // Multiplication
      "/": (secondNum, firstNum) => evaluateDivision(secondNum, firstNum), // Division
      "^": (secondNum, firstNum) => Math.pow(secondNum, firstNum), // Exponentiation
    }

    const stack = []

    for (const character of characters) {
      if (!isNaN(character)) {
        stack.push(parseFloat(character))
      } else if (operators.hasOwnProperty(character)) {
        if (stack.length < 2) {
          alert("Invalid expression. Stack has been cleared.")
          stack = []
        }
        const firstNum = stack.pop()
        const secondNum = stack.pop()
        stack.push(operators[character](secondNum, firstNum))
      } else {
        alert("Invalid token: " + character)
      }
    }

    // if (stack.length !== 1) {
    //   alert("Invalid expression")
    // }

    return stack.slice(-1)[0]
  }
}

const hasOperators = (arr1, arr2) => {
  // iterate through each element in arr1
  // check if some of them include elements in the second
  // return boolean
  return arr1.some((item) => arr2.includes(item))
}
