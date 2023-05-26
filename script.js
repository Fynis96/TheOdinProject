let currentResult = '';
let hasDecimal = false;

function appendNumber(number) {
  if (number === '.' && hasDecimal) {
    return; // Ignore additional decimal points
  }

  currentResult += number;
  if (number === '.') {
    hasDecimal = true;
  }
  updateDisplay();
}

function appendOperator(operator) {
  currentResult += operator;
  hasDecimal = false; // Reset the flag when an operator is added
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
  hasDecimal = false; // Reset the flag when the result is cleared
  updateDisplay();
}

function updateDisplay() {
  const resultElement = document.getElementById('result');
  resultElement.value = currentResult;
}

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
  }
}

function appendDecimal() {
  if (!hasDecimal) {
    currentResult += '.';
    hasDecimal = true;
    updateDisplay();
  }
}

document.addEventListener('keydown', handleKeyPress);