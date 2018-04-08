import React, { Component } from 'react';
import styled from 'styled-components';
import Key from './Key';

const CalculatorContainer = styled.article`
  padding: 1em;
  width: 400px;
  background-color: #eee;
`;

const Display = styled.section`
  background-color: #ccc;
  padding: 0.5em 0.25em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 2rem;
`;

const KeysContainer = styled.section`
  display: flex;
`;

const NumberKeysContainer = styled.section`
  display: flex;
  flex-flow: row wrap;
  flex: 3;
`;

const OperatorsContainer = styled.section`
  flex: 1;
`;

export default class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: '0'
    }

    this.onNumberPress = (event, key) => {
      event.preventDefault();

      const { display } = this.state;
      const currentDisplay = String(display);
      const newDisplay = currentDisplay === '0' ? String(key) : currentDisplay + key;

      this.setState({ display: newDisplay })
    };

    this.numberKeys = Array(10).fill('').map((item, index) =>
      <Key key={index}
        number={index}
        onKeyPress={this.onNumberPress}
      > {index} </Key>
    );
  }

  handleOperatorPress = operator => {
    this.setState({
      valueOne: parseFloat(this.state.display),
      display: '0',
      operator
    })
  }

  handleEqualsPress = () => {
    const { valueOne, operator, display } = this.state;

    if (!valueOne || !operator) {
      return;
    }

    const result = this.operations[operator](valueOne, parseFloat(display));

    this.setState({
      display: String(result),
      valueTwo: '',
      operator: '',
      valueOne: result
    })
  }


  operatorSymbols = {
    'add': '+',
    'subtract': '—',
    'divide': '/',
    'multiply': 'X'
  }

  operators = Object.keys(this.operatorSymbols);

  operations = {
    add: (valueOne, valueTwo) => valueOne + valueTwo,
    subtract: (valueOne, valueTwo) => valueOne - valueTwo,
    multiply: (valueOne, valueTwo) => valueOne * valueTwo,
    divide: (valueOne, valueTwo) => valueOne / valueTwo
  }

  render() {
    return <CalculatorContainer>
      <Display>
        {this.state.display}
      </Display>

      <KeysContainer>
        <NumberKeysContainer>
          {this.numberKeys.slice(1).reverse()}

          {this.numberKeys[0]}

          <Key type="decimal"
            onKeyPress={(e) => this.onNumberPress(e, '.')}
          > . </Key>

          <Key type="equals"
            onKeyPress={() => this.handleEqualsPress()}
          > = </Key>
        </NumberKeysContainer>

        <OperatorsContainer>
          {this.operators.map(operator =>
            <Key key={operator}
              type="operator"
              onKeyPress={() => this.handleOperatorPress(operator)}>

              {this.operatorSymbols[operator]}
            </Key>
          )}
        </OperatorsContainer>
      </KeysContainer>
    </CalculatorContainer>;
  }
}
