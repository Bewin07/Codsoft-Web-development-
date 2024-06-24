let display = document.getElementById('display');
let currentInput = '';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function clearDisplay() {
    display.textContent = '0';
    currentInput = '';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

function appendToDisplay(value) {
    if (waitingForSecondOperand) {
        currentInput = value;
        waitingForSecondOperand = false;
    } else {
        currentInput += value;
    }
    display.textContent = currentInput;
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation(firstOperand, inputValue, operator);
        display.textContent = result.toString();
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

function performCalculation(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

function calculate() {
    const inputValue = parseFloat(currentInput);

    if (operator && !waitingForSecondOperand) {
        const result = performCalculation(firstOperand, inputValue, operator);
        display.textContent = result.toString();
        currentInput = result.toString();
        firstOperand = result;
        operator = null;
        waitingForSecondOperand = true;
    }
}
