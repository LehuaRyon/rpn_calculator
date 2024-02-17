# Reverse Polish Notation (RPN) Calculator

The RPN Calculator CLI tool is meant to be used for executing reverse polish notation equations. RPN uses `Postfix`` notation, where operators follow the operands (ex. 1 2 3 + -) compared to what we are generally used to, which is "Infix" notation (ex. 1 + 2 + 3). It has been built to be easy to use for users who are used to CLI tools and utilities. So far the RPN calculator is able to execute addition, subtraction, multiplication, division, and exponentiation.

In order to read what is inputted on the command line, I have chosen to use the `inquirer` package, which is a simple way to make the tool interactive as well as being able to have the ability to expand the application if I want to at a later time.

# Description of Solution

For this solution, I did my best to mock how a normal computer would compute a equation using reverse polish notation. After doing some research, I found that computers use a "stack", in which the computer will go through the set of numbers and add each to a list, or "stack". Once the computer recognizes an operator, it then uses the last two numbers to execute the operation and continues doing this same method once all the characters have been gone through.

An overview of of how the solution evaluates the equation:

1. An input if grabbed from the command line and is checked against to see if the user wants to quit OR if the user has not entered any operators
2. If the input is a valid RPN equation, the input into turned into an array of strings of each character and the result, "stack", array is as empty
3. Using a for/of loop, we are iterating through the amount of characters that came from the input
4. First, we are checking if the character is a number, not a string, and pushing it to the results
5. Second, since order matters for subtraction and division we are assigning the "firstNum" before "secondNum"
6. Third, if the character is an operator, we are not pushing it to the results and instead use the operator to evaluate the first two numbers in the results
7. The result is pushed back into the result so it can be used for next operations

# Technical Choices & Architecture

I chose to build the CLI tool with Javascript and Node.js due to it's simplicity, performance, documentation, and familiarity. I though about attempting to build it in React instead, but though that would be overdoing it for what the requirements entailed.

- **`index.js:`** Where the application begins and handles the logic of the calculator. This includes the RPN evaluation

# Getting the CLI Tool Up and Running

1. Make sure you have Node.js and npm installed
2. Clone the repository: git clone `https://github.com/LehuaRyon/rpn_calculator.git`
3. Navigate to the project directory: `cd rpn_calculator`
4. Install dependencies: `npm install`
5. Run: `npm start`
6. Enter RPN expressions when prompted and press enter to see the result.
7. Enter `q` or use `Ctrl+D` (EOF) to exit the calculator

## Challenge is below:

# Code Sample

We would like to get to know your coding style and see what you would consider your best work.
In subsequent interviews, we'll talk through your code and make some changes.

# CLI RPN Calculator

Implement a command-line reverse polish notation (RPN) calculator using a language that you know well.

## Imaginary Context

We're building this command-line calculator for people who are comfortable with UNIX-like CLI utilities.
We are starting with the basic 4 operators now but will want to eventually implement other operators and
an alternate interface (such as WebSocket, file, or TCP socket).
There's no need to implement these, but design with these future changes in mind.

## Specifications

1. The calculator should use standard input and standard output
2. It should implement the four standard arithmetic operators
3. The calculator should handle errors and recover gracefully
4. The calculator should exit when it receives a `q` command or an end of input indicator (EOF / Ctrl+D)

You may take creative liberty with anything else; have fun with it!

## Example Input/Output

Use your best judgment as far as the format is concerned, as long as it makes sense to the end user. Your calculator should at the minimum handle the following examples.

    > 5
    5
    > 8
    8
    > +
    13

---

    > 5 5 5 8 + + -
    -13.0
    > 13 +
    0.0

---

    > -3
    -3.0
    > -2
    -2.0
    > *
    6.0
    > 5
    5.0
    > +
    11.0

---

    > 5
    5
    > 9
    9
    > 1
    1
    > -
    8
    > /
    0.625

# Guidelines

## Things We Care About

These hold true both for this submission and for your work here in general. We expect that:

- It works right
- The code is well-abstracted and uses good names
- It provides for a good user experience (end-user and programmer)
- The code adheres to style and practices accepted by the community
- Tests demonstrate intended use, help prevent regression, and can withstand change
- You write intention-revealing commit messages

There are a range of expectations from various companies in their interviewing code exercises, from minimal code to get the job done and prove you can program, to expecting exemplary code that demonstrates how well you can design things when the occasion requires it. We tend to judge toward the latter end of the spectrum, assuming that anyone who can write well-crafted code can also scale down quality to do things quickly, but not necessarily the other way around.

## Readme

Write your README as if it was for a production service. Include the following items:

- A high-level description of your solution
- Reasoning behind your technical choices, including architectural
- Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project
- How to run your code, if applicable
- Link to the hosted application, if applicable

## Submitting

Submit your code as a **separate** git repository, preferably on GitHub
