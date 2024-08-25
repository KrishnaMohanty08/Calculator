class Calculator{
    constructor(previousOperand, currentOperand){
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
        this.clear();

    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(numbers){
        if(numbers === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand +=numbers;
    }
    choiceOperation(operation){
        if(this.currentOperand=='')return;
        if(this.previousOperand!='')this.compute();
        this.operation=operation;
        this.previousOperand =`${this.currentOperand} ${operation}`;
        this.currentOperand = '';
    }
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'X':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '%':
                computation = prev*100;
                break;
            default:
                return;
            
        }
        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined;
    }
    getDisplayNumber(numbers){
        const stringNumber=number.toString()
        const integerDigits =parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits:0})
        }if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }
    updateDisplay() {
        currentOperand.innerText = this.currentOperand;
        previousOperand.innerText = this.previousOperand;
    }
}
const numberButtons =document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operation');
const equals = document.querySelector('.equals');
const clear = document.querySelector('#clear');
const AC = document.querySelector('#allClear');
const previousOperand =document.querySelector('.previousOperand');
const currentOperand =document.querySelector('.currentOperand');

const calculator = new Calculator (previousOperand,currentOperand)

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
});
operators.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.choiceOperation(button.innerText)
        calculator.updateDisplay()
    })
});

equals.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
})


AC.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
})


clear.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
})
