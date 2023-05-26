let currentResult = '';

// Append a number to the current result
function appendNumber(number) {
  currentResult += number;
  updateDisplay();
}

// Append an operator to the current result
function appendOperator(operator) {
  currentResult += operator;
  updateDisplay();
}

// Calculate the result of the current expression
function calculate() {
  try {
    const result = evaluateExpression(currentResult);
    currentResult = result.toString();
    updateDisplay();
  } catch (error) {
    currentResult = 'Error';
    updateDisplay();
  }
}

// Clear the current result
function clearResult() {
  currentResult = '';
  updateDisplay();
}

// Update the display with the current result
function updateDisplay() {
  const resultElement = document.getElementById('result');
  resultElement.value = currentResult;
}

// Evaluate the expression using postfix notation
function evaluateExpression(expression) {
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };

  const tokens = tokenizeExpression(expression);
  const postfixTokens = convertToPostfix(tokens);
  const result = evaluatePostfix(postfixTokens, operators);
  return result;
}

// Tokenize the expression into numbers and operators
function tokenizeExpression(expression) {
  const tokens = [];
  let currentToken = '';

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (isDigit(char) || char === '.') {
      currentToken += char;
    } else {
      if (currentToken !== '') {
        tokens.push(parseFloat(currentToken));
        currentToken = '';
      }
      tokens.push(char);
    }
  }

  if (currentToken !== '') {
    tokens.push(parseFloat(currentToken));
  }

  return tokens;
}

// Check if a character is a digit
function isDigit(char) {
  return /^\d$/.test(char);
}

// Convert the expression to postfix notation (this one took a bit to figure out)
function convertToPostfix(tokens) {
  const postfixTokens = [];
  const stack = [];

  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (typeof token === 'number') {
      postfixTokens.push(token);
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        postfixTokens.push(stack.pop());
      }
      stack.pop(); // Discard the opening parenthesis
    } else {
      while (
        stack.length > 0 &&
        precedence[token] <= precedence[stack[stack.length - 1]]
      ) {
        postfixTokens.push(stack.pop());
      }
      stack.push(token);
    }
  }

  while (stack.length > 0) {
    postfixTokens.push(stack.pop());
  }

  return postfixTokens;
}

// Evaluate the postfix notation expression
function evaluatePostfix(postfixTokens, operators) {
  const stack = [];

  for (let i = 0; i < postfixTokens.length; i++) {
    const token = postfixTokens[i];

    if (typeof token === 'number') {
      stack.push(token);
    } else {
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      const operator = operators[token];
      const result = operator(operand1, operand2);
      stack.push(result);
    }
  }

  return stack.pop();
}

// Handle key press events
function handleKeyPress(event) {
  const key = event.key;

  if (isDigit(key)) {
    appendNumber(key);
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    appendOperator(key);
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else if (key === 'Escape' || key === 'C') {
    clearResult();
  }
}

// Add event listener for keydown events
document.addEventListener('keydown', handleKeyPress);
