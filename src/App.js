import React, { useState } from 'react'

/* Components */
import Wrapper from "./components/Wrapper"
import Screen from "./components/Screen"
import ButtonBox from './components/ButtonBox'
import Buttons from './components/Buttons'

/* Button text */
const buttonValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
]

const App = () => {
  /* Variable Declaration */
  let [calc, setCalc] = useState({
    sign: "",
    number: 0,
    result: 0
  })

  /* Function Declaration */
  function handleToLocalString(num) {
    return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
  }

  function handleRemoveSpaces(num) {
    return num.toString().replace(/\s/g,"")
  }

  function handleButtonClick(e) {
    const value = e.target.innerHTML
    switch (value) {
      case "C":
        handleResetNumbers()
        break;
      case "+-":
        handleChangeNumberSign()
        break;
      case "%":
        handlePercentNumber()
        break;
      case "/":
      case "X":
      case "-":
      case "+":
        handleSignNumber(e)
        break;
      case ".":
        handleDecimalNumber(e)
        break;
      case "=":
        handleEqualSign()
        break;
      default:
        handleNumberClicked(e)
        break;
    }
  }

  function handleNumberClicked(e) {
    e.preventDefault()
    const value = e.target.innerHTML
    
    if (handleRemoveSpaces(calc.number).length < 16) {
      setCalc({
        ...calc, 
        number: calc.number === 0 && value === "0" 
                ? "0" 
                : handleRemoveSpaces(calc.number % 1 === 0)
                ? handleToLocalString(Number(handleRemoveSpaces(calc.number + value)))
                : handleToLocalString(calc.number + value),
        result: !calc.sign ? 0 : calc.result
      })
    }
  }

  function handleChangeNumberSign() {
    setCalc({
      ...calc,
      number: calc.number ? handleToLocalString(handleRemoveSpaces(calc.number * - 1)) : 0,
      result: calc.result ? handleToLocalString(handleRemoveSpaces(calc.result * - 1)) : 0
    })
  }

  function handlePercentNumber() {
    let intNumber = calc.number ? parseFloat(handleRemoveSpaces(calc.number)) : 0
    let intResult = calc.result ? parseFloat(handleRemoveSpaces(calc.result)) : 0

    setCalc({
      ...calc,
      number: (intNumber /= Math.pow(100, 1)),
      result: (intResult /= Math.pow(100, 1))
    })
  }

  function handleSignNumber(e) {
    e.preventDefault()
    const value = e.target.innerHTML
    
    setCalc({
      ...calc,
      sign: value,
      result: !calc.result && calc.number ? calc.number : calc.result,
      number: 0
    })

    if (calc.number !== 0) handleEqualSign()
  }

  function handleDecimalNumber(e) {
    e.preventDefault()
    const value = e.target.innerHTML

    setCalc({
      ...calc,
      number: !calc.number.toString().includes(".") ? calc.number + value : calc.number
    })
  }

  function handleEqualSign() {
    if (calc.sign && calc.number) {
      const calcMath = (a, b, sign) => {
        switch(sign) {
          case "+": return a + b;
          case "-": return a - b;
          case "X": return a * b;
          default: return a / b
        }
      }
      const checkValues = (num, sign) => { return num === '0' && sign === '/' ? false : true }

      setCalc({
        ...calc,
        result: !checkValues(calc.number, calc.sign) 
                ? 'Syntax Error' 
                : handleToLocalString(
                    calcMath(
                      Number(handleRemoveSpaces(calc.result)), 
                      Number(handleRemoveSpaces(calc.number)), 
                      calc.sign)
                  ),
        sign: calc.sign,
        number: 0
      })
    }
  }

  function handleResetNumbers() {
    setCalc({
      ...calc,
      sign: "",
      number: 0,
      result: 0
    })
  }

  /* Render Components   */
  return (
    <Wrapper>
      <Screen value={calc.number ? calc.number : calc.result} />
        <ButtonBox>
          {
            buttonValues.flat().map((btn, i) => {
              return (
                <Buttons 
                  key={ i }
                  className={ btn === "=" ? "equals" : "" }
                  value={ btn }
                  onClick={handleButtonClick}
                />
              )
            })
          }
        </ButtonBox>
    </Wrapper>
  )
}

export default App