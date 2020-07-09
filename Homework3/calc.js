/*
 * Implement all your JavaScript in this file!
 */

let cameFromEquals = false;
let afterOperator = false;
let changedOperator = false;
let reset = true;
let value1 = 0;
let value2 = 0;
let operator = "";

$("#button0, #button1, #button2, #button3, #button4, " +
    "#button5, #button6, #button7, #button8, #button9")
    .click(
        function() {
            reset = false;
            if(!cameFromEquals && !afterOperator) {
                value1 = value1 * 10 + Number($(this).attr("value"));
                $("#display").attr("value", value1);
            } else if(afterOperator) {
                value2 = value2 * 10 + Number($(this).attr("value"));
                changedOperator = true;
                $("#display").attr("value", value2);
            } else {
                value1 = Number($(this).attr("value"));
                cameFromEquals = false;
                operator = "";
                value2 = 0;
                $("#display").attr("value", value1);
            }
        })

$("#addButton, #subtractButton, #multiplyButton, #divideButton, #equalsButton")
    .click(
        function() {
            if($(this).text() !== "=") {
                if(!afterOperator) {
                    operator = $(this).text();
                    afterOperator = true;
                    value2 = 0;
                } else if(!reset){
                    operateWithValues();
                    value2 = 0;
                    operator = $(this).text();
                    $("#display").attr("value", value1);
                }
            }else{
                if(afterOperator && changedOperator) {
                    operateWithValues();
                    cameFromEquals = true;
                    afterOperator = false;
                    changedOperator = false;
                    $("#display").attr("value", value1);
                }else if(!reset){
                    operateWithValues();
                    $("#display").attr("value", value1);
                }
            }
        })

$("#clearButton")
    .click(
        function () {
            cameFromEquals = false;
            afterOperator = false;
            changedOperator = false;
            reset = true;
            value1 = 0;
            value2 = 0;
            operator = "";
            $("#display").attr("value", "");
        })

function operateWithValues(){
    switch (operator) {
        case "+":
            value1 += value2;
            break;
        case "-":
            value1 -= value2;
            break;
        case "*":
            value1 *= value2;
            break;
        case "\xF7":
            if(value1 === 0 && value2 === 0) {
                value1 = Infinity
                break;
            }
            value1 /= value2;
            break;
    }
}