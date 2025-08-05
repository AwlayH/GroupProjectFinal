 const display = document.getElementById("display");

 let currentInput = "";
 let firstNumber = null;
 let operator = null;
 let shouldResetDisplay = false;


function appendNumber(number){
    if (shouldResetDisplay) {
        console.log("reset input after operator")
        currentInput = "";
        shouldResetDisplay = false;
    }
    currentInput += number;
    display.value = currentInput;

    console.log(`nr. pressed: ${number}, currentInput: ${currentInput}` )
}

function clearDisplay() {
    console.log("Clearing display and reset")
    currentInput = "";
    firstNumber = null;
    operator = null;
    shouldResetDisplay = false;
    display.value ="";
}

function setOperator(op) {
    if (operator !== null) calculate();

    firstNumber = parseFloat(currentInput);
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || shouldResetDisplay) return;

    const secondNumber = parseFloat(currentInput);
    console.log(`Calculating: ${firstNumber} ${operator} ${secondNumber}`);

    const result = operate(operator, firstNumber, secondNumber)

    console.log(`Result: ${result}`)

    display.value = result;
    currentInput = result.toString();
    operator = null;
    firstNumber = null;
    shouldResetDisplay = true;

}


function add(x, y) {
    return x + y;
}

function subtract (x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x,y) {
    if (y === 0) {
        return "Nice try. You can't divide by 0 🙃";
    }
    return x / y;
}

function operate(operator, x, y) {
    switch (operator) {
        case '+':
            return add(x,y);
        case '-':
            return subtract(x,y);
        case 'X':
            return multiply (x,y);
        case '÷':
            return divide(x,y);
        default:
            return 'Please enter valid operator';
    }
}

