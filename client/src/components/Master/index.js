import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Logout from '../Logout'
import './index.css'

const numberWords = [
  {id: 0, value: 0, word: 'zero'},
  {id: 1, value: 1, word: 'one'},
  {id: 2, value: 2, word: 'two'},
  {id: 3, value: 3, word: 'three'},
  {id: 4, value: 4, word: 'four'},
  {id: 5, value: 5, word: 'five'},
  {id: 6, value: 6, word: 'six'},
  {id: 7, value: 7, word: 'seven'},
  {id: 8, value: 8, word: 'eight'},
  {id: 9, value: 9, word: 'nine'},
]

const operators = [
  {id: 0, operator: '+', text: 'plus'},
  {id: 1, operator: '-', text: 'minus'},
  {id: 2, operator: '*', text: 'times'},
  {id: 3, operator: '/', text: 'divided_by'},
]

class Master extends Component {
  state = {
    firstNum: numberWords[0].word,
    sym: operators[0].text,
    secondNum: numberWords[0].word,
  }

  onChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value,
    })
  }

  calculateResult = (a, op, b) => {
    switch (op) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '*':
        return a * b
      case '/':
        return parseInt(a / b)
      default:
        return null
    }
  }

  submitQuestion = event => {
    event.preventDefault()
    const {firstNum, sym, secondNum} = this.state
    const question = `${firstNum}(${sym}(${secondNum}()))`
    const num1Obj = numberWords.find(num => num.word === firstNum)
    const operatorObj = operators.find(operator => operator.text === sym)
    const num2Obj = numberWords.find(num => num.word === secondNum)
    const num1 = num1Obj.value
    const op = operatorObj.operator
    const num2 = num2Obj.value
    // console.log(num1Obj.value)
    // console.log(operatorObj.operator)
    // console.log(num2Obj.value)
    console.log(question)
    const result = this.calculateResult(num1, op, num2)
    console.log(result)
  }

  render() {
    const masterJwtToken = Cookies.get('master_jwt_token')
    if (masterJwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="master-container">
        <Logout />
        <h1 className="master-heading">Prepare your questions</h1>
        <form className="form-container" onSubmit={this.submitQuestion}>
          <div className="question-container">
            <select
              className="number-container"
              name="firstNum"
              onChange={this.onChange}
            >
              {numberWords.map(each => (
                <option key={each.id} value={each.word}>
                  {each.value}
                </option>
              ))}
            </select>
            <select
              className="operator-container"
              name="sym"
              onChange={this.onChange}
            >
              {operators.map(each => (
                <option key={each.id} value={each.text}>
                  {each.operator}
                </option>
              ))}
            </select>
            <select
              className="number-container"
              name="secondNum"
              onChange={this.onChange}
            >
              {numberWords.map(each => (
                <option key={each.id} value={each.word}>
                  {each.value}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="create-button">
            Create Question
          </button>
        </form>
        {/* <ul className="question-list"></ul> */}
      </div>
    )
  }
}

export default Master
