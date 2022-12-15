var input = document.getElementById("input");
var number = document.querySelectorAll(".numbers div");
var operator = document.querySelectorAll(".operators div");
var result = document.getElementById("result");
var clear = document.getElementById("clear");
var resultDisplayed = false;

//adding event handlers to numbers button
for(var i=0;i<number.length;i++) {
  number[i].addEventListener("click", function(event){
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length-1];
  
    //if result is not displayed, just keep adding
    if(resultDisplayed==false) {
      input.innerHTML = input.innerHTML+event.target.innerHTML;
    }
    else if(resultDisplayed===true && isOperator(lastChar)) {
      resultDisplayed=false;
      input.innerHTML+=event.target.innerHTML;
    }
    else {
      //if the resultDisplayed is true and user pressed a number, then we need to clear the input string
      //and add the new input to start a new operation
      resultDisplayed=false;
      input.innerHTML="";
      input.innerHTML+=event.target.innerHTML;
    }
  });
}

function isOperator(char) {
  return char==="+" || char==="-" || char==="*" || char==="÷";
}

//adding event handlers to operators button
for(var i=0;i<operator.length;i++) {
  operator[i].addEventListener("click", function(event) {
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length-1];
    //if the last character pressed is an operator, replace it with the currently pressed one
    if(isOperator(lastChar)) {
      var newString = currentString.substring(0, currentString.length-1) + event.target.innerHTML;
      input.innerHTML=newString;
    }else if(currentString.length==0) {
      //if first key entered is an operator, don't do anything
      console.log("Enter a number first");
    }
    else {
      //just add the operator pressed to the input
      input.innerHTML+=event.target.innerHTML;
    }  
  });
}

//handling equal button
result.addEventListener("click", function() {
    //this is the string we will be processing e.g: -10+26+33-56*34/23
    var inputString = input.innerHTML;
    //form an array of numbers e.g: numbers = ["10", "26", "33", "56", "34", "23"]
    var numbers = inputString.split(/\+|\-|\*|\÷/g);
    //form an array of operators e.g: operators = ["+","+","-","*","/"]
    //first we replace all the numbers and dot with empty string and then split
    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    console.log(inputString);
    console.log(numbers);
    console.log(operators);
    console.log("-----------------");

    var divide = operators.indexOf("÷");
    while (divide != -1) {
      numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
      operators.splice(divide, 1);
      divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf("*");
    while (multiply != -1) {
      numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
      operators.splice(multiply, 1);
      multiply = operators.indexOf("*");
    }

    var subtract = operators.indexOf("-");
    while (subtract != -1) {
      numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
      operators.splice(subtract, 1);
      subtract = operators.indexOf("-");
    }

    var add = operators.indexOf("+");
    while (add != -1) {
      // using parseFloat is necessary, otherwise it will result in string concatenation :)
      numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
      operators.splice(add, 1);
      add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0]; // displaying the output

    resultDisplayed = true;
}
);

//handling clear button
clear.addEventListener("click", clearEventListener);

function clearEventListener() {
  input.innerHTML="";
}