 const display = document.getElementById("display");

 let currentInput = "";
 let firstNumber = null;
 let operator = null;
 let shouldResetDisplay = false;

 function appendNumber(number) {
     if (number === '.' && currentInput.includes('.')) {
         window.alert("Already contains a decimal point");
         return;
     }
     if (shouldResetDisplay) {
         currentInput = "";
         shouldResetDisplay = false;
     }
     currentInput += number;
     display.value = currentInput;
 }

 function clearDisplay() {
     currentInput = "";
     firstNumber = null;
     operator = null;
     shouldResetDisplay = false;
     display.value = "0";
 }

 const backspace = () => {
     currentInput = currentInput.slice(0, -1);
     display.value = currentInput || "0";
 }

 function setOperator(op) {
     if (operator !== null) calculate();
     firstNumber = parseFloat(currentInput);
     operator = op;
     shouldResetDisplay = true;
 }

 function calculate() {
     if (currentInput === "") {
         display.value = "really? 😮"
         return;
     } else if (operator === null || shouldResetDisplay) return;

     const secondNumber = parseFloat(currentInput);

     let result = operate(operator, firstNumber, secondNumber)

     if (result == "error dividing") {
         display.value = "lmao";
         currentInput = "";
     } else if ((result * 1e5 % 1) !== 0) {
         result = Math.floor(result * 100) / 100;
         display.value = result;
         currentInput = result.toString();
         operator = null;
         firstNumber = null;
         shouldResetDisplay = true;
     } else {
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

 function subtract(x, y) {
     return x - y;
 }

 function multiply(x, y) {
     return x * y;
 }

 function divide(x, y) {
     if (y === 0) {
         return "error dividing";
     }
     return x / y;
 }

 function operate(operator, x, y) {
     switch (operator) {
         case '+':
             return add(x, y);
         case '-':
             return subtract(x, y);
         case 'X':
             return multiply(x, y);
         case '÷':
             return divide(x, y);
         default:
             return 'Please enter valid operator';
     }
 }

 document.addEventListener("keydown", function(e) {
     const key = e.key;

     if (!isNaN(key) || key === '.') {
         appendNumber(key);
         return;
     }

     if (key === '+' || key === '-' || key === '/' || key === 'x' || key === 'X') {
         const opMap = {
             '+': '+',
             '-': '-',
             'x': 'X',
             'X': 'X',
             '/': '÷'
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
     if (key === 'Delete' || key === 'c'||key === 'C') {
        clearDisplay();
        return;
     }
 });