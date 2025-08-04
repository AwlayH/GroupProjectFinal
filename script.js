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
        return "cannot divide by zero";
    }
    return x / y;
}

function display() {

}
function clearDisplay() {
    display.value ="";
}

function input() {

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

