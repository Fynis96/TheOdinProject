let currentResult = '';

function appendNumber(number) {
  currentResult += number;
  updateDisplay();
}

function appendOperator(operator) {
  currentResult += operator;
  updateDisplay();
}

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

function clearResult() {
  currentResult = '';
  updateDisplay();
}

function backspace() {
  currentResult = currentResult.slice(0, -1);
  updateDisplay();
}

function updateDisplay() {
  const resultElement = document.getElementById('result');
  resultElement.value = currentResult;
}
//Evaluates the arithmetic expression using the Shunting Yard algorithm. 
//It tokenizes the expression, converts it to postfix notation, 
//and then evaluates the postfix expression.
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
//Tokenizes the arithmetic expression into individual tokens (numbers, operators, and parentheses).
function tokenizeExpression(expression) {
  const tokens = [];
  let currentToken = '';
  let hasDecimal = false;

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (isDigit(char)) {
      currentToken += char;
    } else if (char === '.' && !hasDecimal) {
      currentToken += char;
      hasDecimal = true;
    } else if (char === '(' || char === ')') {
      if (currentToken !== '') {
        tokens.push(parseFloat(currentToken));
        currentToken = '';
      }
      tokens.push(char);
      hasDecimal = false;
    } else {
      if (currentToken !== '') {
        tokens.push(parseFloat(currentToken));
        currentToken = '';
      }
      tokens.push(char);
      hasDecimal = false;
    }
  }

  if (currentToken !== '') {
    tokens.push(parseFloat(currentToken));
  }

  return tokens;
}

function isDigit(char) {
  return /^\d$/.test(char);
}
//Converts the tokenized expression from infix notation 
//to postfix notation using the Shunting Yard algorithm.
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
  } else if (key === '(' || key === ')') {
    appendParenthesis(key);
  } else if (key === '.') {
    appendDecimal();
  } else if (key === 'Backspace') {
    backspace();
  }
}

function appendDecimal() {
  const lastOperatorIndex = findLastOperatorIndex(currentResult);
  const lastDecimalIndex = currentResult.lastIndexOf('.');

  if (lastDecimalIndex > lastOperatorIndex) {
    // Ignore additional decimal points within the current number
    return;
  }

  currentResult += '.';
  updateDisplay();
}

function findLastOperatorIndex(expression) {
  const operators = ['+', '-', '*', '/'];
  let lastOperatorIndex = -1;

  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const index = expression.lastIndexOf(operator);
    if (index > lastOperatorIndex) {
      lastOperatorIndex = index;
    }
  }

  return lastOperatorIndex;
}

document.addEventListener('keydown', handleKeyPress);
