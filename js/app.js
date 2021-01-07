const calculator = document.querySelector('.calculator')
const buttons = calculator.querySelector('.calculator__buttons')
const screen = calculator.querySelector('.calculator__screen')
const operatorKeys = buttons.querySelectorAll('[data-type="operator"]')

buttons.addEventListener('click', event => {
    if(!event.target.closest('button')) return

    const button = event.target
    const buttonValue = button.textContent
    const screenValue = screen.textContent
    const { type } = button.dataset
    const { previousKeyType } = calculator.dataset

    if(type =='number') {
        if (screenValue == '0') {
            screen.textContent = buttonValue
        } else if (previousKeyType == 'operator')
        {
        screen.textContent = buttonValue  
        }
        else {
            screen.textContent = screenValue + buttonValue
        }
    }

    if(type == 'operator') {
        operatorKeys.forEach(el => { el.dataset.state = '' })
        button.dataset.state = 'selected'

        calculator.dataset.firstNumber = screenValue
        calculator.dataset.operator = button.dataset.key
    }

    if(type == 'equal') {
        // Perform a Calculation
        const firstNumber = calculator.dataset.firstNumber
        const operator = calculator.dataset.operator
        const secondNumber = screenValue
        screen.textContent = calculate(firstNumber, operator, secondNumber)
    }

    if (type == 'clear') {
        screen.textContent = '0'
        delete calculator.dataset.firstNumber
        delete calculator.dataset.operator
    }

    calculator.dataset.previousKeyType = type
})

function calculate (firstNumber, operator, secondNumber) {
        firstNumber = parseInt(firstNumber)
        secondNumber = parseInt(secondNumber)
        let result = '0'
        if (operator == 'plus') result = firstNumber + secondNumber
        if (operator == 'minus') result = firstNumber - secondNumber
        if (operator == 'times') result = firstNumber * secondNumber
        if (operator == 'divide') result = firstNumber / secondNumber
        return result
}

