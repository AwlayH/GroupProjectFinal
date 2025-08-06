 const display = document.getElementById("display");

 let currentInput = "";
 let firstNumber = null;
 let operator = null;
 let shouldResetDisplay = false;


function appendNumber(number){
    if (number === '.' && currentInput.includes('.')) {
        window.alert("Already contains a decimal point");
        return;
    }
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
    display.value ="0";
}

const backspace = () => {
  console.log("Deleting the last character");
  console.log(currentInput);
  currentInput = currentInput.slice(0, -1);
  console.log(currentInput);
  
 display.value = currentInput || "0";

  
  
}

function setOperator(op) {
    if (operator !== null) calculate();

    firstNumber = parseFloat(currentInput);
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    console.log(currentInput);
    if (currentInput === ""){
        alert("Please enter number before pressing equals sign.");
        display.value = "really? :O"
        return;
    }
    else if (operator === null  || shouldResetDisplay) return;

    const secondNumber = parseFloat(currentInput);
    console.log(`Calculating: ${firstNumber} ${operator} ${secondNumber}`);

    let result = operate(operator, firstNumber, secondNumber)

    console.log(`Result: ${result}`)

     if (result == "error dividing") {
        console.log("I am executed")
        display.value = "lmao";
        currentInput = "";
    }else if ( (result* 1e5 % 1) !== 0) {
     result = Math.floor(result * 100)/100;
     display.value = result;
     currentInput = result.toString();
     operator = null;
     firstNumber = null;
     shouldResetDisplay = true;
    }else {
    display.value = result;
    currentInput = result.toString();
    operator = null;
    firstNumber = null;
    shouldResetDisplay = true;
    } 
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
        alert("Nice try. You can't divide by 0 🙃");
        display.value = "0";
        return "error dividing";
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

document.addEventListener("keydown", function (e) {
    const key = e.key;

    
    if (!isNaN(key) || key === '.') {
        appendNumber(key);
        return;
    }

    if (key === '+' || key === '-' || key === '/' || key === 'x' || key === 'X') {
        const opMap = {
            '+': '+','-': '-','x': 'X','X': 'X','/': '÷'
        };
        setOperator(opMap[key]);
        return;
    }

    if (key === 'Enter' || key === '=') {
        calculate();
        return;
    }
    if (key === 'Backspace') {
        backspace();
        return;
    }
});
