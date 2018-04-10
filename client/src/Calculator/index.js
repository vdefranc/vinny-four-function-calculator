import React, { Component } from 'react';
import styled from 'styled-components';
import Key from './Key';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const CalculatorContainer = styled.article`
  border-radius: 3px;
  overflow: hidden;
  width: 300px;
  margin-right: 2em;
`;

const Display = styled.section`
  background-color: #aaa;
  color: white;
  padding: 0.75em 0.25em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 2rem;
`;

const KeysContainer = styled.section`
  display: flex;
`;

const MainKeysContainer = styled.section`
  display: flex;
  flex-flow: row wrap;
  flex: 3;
`;

const OperatorsContainer = styled.section`
  flex: 1;
`;

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: '0'
    };

    this.onNumberPress = (event, key) => {
      event.preventDefault();

      const { display } = this.state;
      const currentDisplay = String(display);
      const newDisplay = currentDisplay === '0' ? String(key) : currentDisplay + key;

      this.setState({ display: newDisplay });
    };

    this.numberKeys = Array(10).fill('').map((item, index) =>
      <Key key={index}
        number={index}
        onKeyPress={this.onNumberPress}
        isDoubleWidth={index === 0}
      > {index} </Key>
    );
  }

  handleOperatorPress = operator => {
    this.setState({
      valueOne: parseFloat(this.state.display),
      display: '0',
      operator
    });
  }

  handleEqualsPress = () => {
    const { valueOne, operator, display } = this.state;

    if (!valueOne || !operator) {
      return;
    }

    const result = this.operations[operator](valueOne, parseFloat(display));

    const operation = {
      operator,
      valueOne,
      result,
      valueTwo: parseFloat(display)
    };

    this.props.addOperation({
      variables: {
        calculatorId: this.props.id,
        operation
      }
    });

    this.props.onNewOperation({
      id: operation.valueOne + operation.result + operation.operator,
      ...operation
    });

    this.setState({
      display: String(result),
      valueTwo: '',
      operator: '',
      valueOne: result
    });
  }

  onClear = () => {
    this.setState({
      display: '0',
      valueOne: '',
      valueTwo: '',
      operator: ''
    })
  }

  onPercent = () => {
    const display = parseFloat(this.state.display);

    this.setState({
      display: String(display / 100)
    });
  }

  onNegativePositive = () => {
    const currentDisplay = this.state.display;
    let newDisplay = '';

    if (currentDisplay[0] === '-') {
      newDisplay = currentDisplay.slice(1);
    } else {
      newDisplay = `-${currentDisplay}`;
    }

    this.setState({ display: newDisplay })
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
        <MainKeysContainer>
          <Key onKeyPress={this.onClear} backgroundColor={'#eee'}>
           C
          </Key>

          <Key onKeyPress={this.onPercent} backgroundColor={'#eee'}>
           %
          </Key>

          <Key onKeyPress={this.onNegativePositive} backgroundColor={'#eee'}>
           +/-
          </Key>

          {this.numberKeys.slice(1).reverse()}

          {this.numberKeys[0]}

          <Key type="decimal"
            onKeyPress={(e) => this.onNumberPress(e, '.')}
          > . </Key>
        </MainKeysContainer>

        <OperatorsContainer>
          {this.operators.map(operator => {
            return <Key key={operator}
              type="operator"
              backgroundColor="#f59c42"
              activeColor="#ca7f34"
              onKeyPress={() => this.handleOperatorPress(operator)}>

              {this.operatorSymbols[operator]}
            </Key>
          })}

          <Key type="equals"
            backgroundColor={'#f59c42'}
            activeColor="#ca7f34"
            onKeyPress={() => this.handleEqualsPress()}
          > = </Key>
        </OperatorsContainer>
      </KeysContainer>
    </CalculatorContainer>;
  }
}

const ADD_OPERATION_MUTATION = gql`
  mutation AddOperation($calculatorId: String!, $operation: OperationInput!) {
    addOperation(calculatorId: $calculatorId, operation: $operation) {
      valueOne
      valueTwo
      result
      operator
    }
  }
`;

export default graphql(ADD_OPERATION_MUTATION, { name: 'addOperation' })(Calculator);
