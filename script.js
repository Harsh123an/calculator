let display = document.getElementById('display');
let currentInput = '';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function appendNumber(number) {
    if (waitingForSecondOperand) {
        let parts = display.value.split(' ');
        parts[parts.length - 1] = number;
        display.value = parts.join(' ');
        waitingForSecondOperand = false;
    } else {
        display.value = display.value === '0' ? number : display.value + number;
    }
    currentInput = display.value;
}

function appendOperator(op) {
    if (operator && !waitingForSecondOperand) {
        calculate();
    }
    firstOperand = parseFloat(display.value);
    operator = op;
    let displaySymbol = op;
    if (op === '*') displaySymbol = '×';
    if (op === '/') displaySymbol = '÷';
    display.value = display.value + ' ' + displaySymbol + ' ';
    waitingForSecondOperand = true;
}

function calculate() {
    if (operator === null || waitingForSecondOperand) {
        return;
    }

    let parts = display.value.split(' ');
    let secondOperand = parseFloat(parts[parts.length - 1]);
    let result = 0;

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            if (secondOperand === 0) {
                display.value = 'Error';
                return;
            }
            result = firstOperand / secondOperand;
            break;
    }

    display.value = result;
    firstOperand = result;
    waitingForSecondOperand = true;
    currentInput = result.toString();
}

function clearDisplay() {
    display.value = '';
    currentInput = '';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
} 