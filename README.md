# Reverse Polish Notation (RPN) Calculator

The RPN Calculator CLI tool is meant to be used for executing reverse polish notation equations. RPN uses `Postfix` notation, where operators follow the operands `ex. 1 2 3 + -` compared to what we are generally used to, which is `Infix` notation `ex. 1 + 2 + 3`. It has been built to be easy to use for users who are used to CLI tools and utilities. So far the RPN calculator is able to execute addition, subtraction, multiplication, division, and exponentiation.

In order to read what is inputted on the command line, I have chosen to use the `inquirer` package, which is a simple way to make the tool interactive as well as being able to have the ability to expand the application if needed at a later time.

# Description of Solution

For this solution, I did my best to mock how a normal computer would compute a equation using reverse polish notation. After doing some research, I found that computers use a "stack", in which the computer will go through the set of numbers and add each to a list, or "stack". Once the computer recognizes an operator, it then uses the top two numbers to execute the operation and continues doing this same method once all the characters have been gone through.

An overview of of how the solution evaluates the equation:

1. An input if grabbed from the command line and is checked against to see if the user wants to quit OR if the user has not entered any operators
2. If the input is a valid RPN equation, the input into turned into an array of strings of each character and the result, `stack`, array is as empty
3. Using a for/of loop, we are iterating through the amount of characters that came from the input
4. First, we are checking if the character is a number, not a string, and pushing it to the results
5. Second, since order matters for subtraction and division we are assigning the ` firstNum`` before  `secondNum``
6. Third, if the character is an operator, we are not pushing it to the results and instead use the operator to evaluate the first two numbers in the results
7. The result is pushed back into the result so it can be used for next operations

# Technical Choices & Architecture

I chose to build the CLI tool with Javascript and Node.js due to it's simplicity, performance, documentation, and familiarity. I though about attempting to build it in React instead, but thought that would be overdoing it for what the requirements entailed.

**`index.js`** Where the application begins and handles the logic of the calculator. This includes the RPN evaluation

# Getting the CLI Tool Up and Running

1. Make sure you have Node.js and npm installed
2. Clone the repository: git clone `https://github.com/LehuaRyon/rpn_calculator.git`
3. Navigate to the project directory: `cd rpn_calculator`
4. Install dependencies: `npm install`
5. Run: `npm start`
6. Enter RPN expressions when prompted and press enter to see the result.
7. Enter `q` to exit the calculator

# Trade-offs, anything you left out, or done differently more time

- Trying to figure out how to exit the app with `CTL^D`
- Adding in more operators such as `()`
- Adding tests
- Breaking down the app into folders
- Creating a UI, instead of using the command line
