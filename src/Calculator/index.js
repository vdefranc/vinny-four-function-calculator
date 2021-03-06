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
  display: inline-block;
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
      currentOperand: 'operandOne',
      editingFirstOperand: true,
      operandOne: '0',
      operandTwo: '',
      operator: ''
    };
  }

  componentWillMount() {
    this.numberKeys = Array(10).fill('').map((item, index) => {
      return <Key key={index}
        number={index}
        onKeyPress={this.onNumberPress}
        isDoubleWidth={index === 0}
      > {index} </Key>;
    });
  }

  getCurrentOperandValue = () => this.state[this.state.currentOperand] || '0';

  editingFirstOperand = () => this.state.currentOperand === 'operandOne';

  getCurrentDisplayValue = () => {
    const currentOperandValue = this.state[this.state.currentOperand];

    if (this.state.currentOperand === 'operandTwo' && !currentOperandValue) {
      return this.state.operandOne;
    }

    return currentOperandValue;
  }

  getNextOperandKey = () => {
    if (this.state.currentOperand === 'operandOne') {
      return 'operandTwo';
    }

    return 'operandOne';
  }

  restartWithFirstOperandValue = (val) => {
    this.setState({
      currentOperand: 'operandOne',
      operandOne: val
    });
  }

  onNumberPress = (event, key) => {
    event.preventDefault();

    if (!this.editingFirstOperand() && !this.state.operator) {
      this.restartWithFirstOperandValue(String(key));
    }

    const currentOperandValue = this.getCurrentOperandValue();
    const notInitialValue = currentOperandValue && currentOperandValue !== '0';
    const newOperandValue = notInitialValue ? currentOperandValue + key : String(key);

    this.setState({ [this.state.currentOperand]: newOperandValue });
  };

  onDecimalPress = (event, key) => {
    if (!this.editingFirstOperand() && !this.state.operator) {
      this.restartWithFirstOperandValue('0.');
    }

    const addingSecondDecimal = key === '.' && this.getCurrentOperandValue().indexOf('.') >= 0;

    if (!addingSecondDecimal) {
      const currentOperandValue = this.getCurrentOperandValue();

      this.setState({
        [this.state.currentOperand]: currentOperandValue + '.'
      });
    }
  }

  handleOperatorPress = operator => {
    const currentOperand = this.state.currentOperand;

    if (!this.editingFirstOperand() && !this.state.operandTwo) {
      return this.setState({
        operator
      });
    }

    if (!this.editingFirstOperand() && this.state.operandTwo) {
      return this.handleEqualsPress(operator);
    }

    this.setState({
      currentOperand: this.getNextOperandKey(),
      operator
    });
  }

  // this function also sucks and I wish I had time to refactor this too
  handleEqualsPress = (newOperator = '') => {
    const { operandOne, operandTwo, operator } = this.state;

    if (!operandOne || !operator) {
      return;
    }

    const result = this.operations[operator](parseFloat(operandOne), parseFloat(operandTwo));

    const operation = {
      operator,
      valueOne: parseFloat(operandOne),
      result,
      valueTwo: parseFloat(operandTwo)
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
      operandOne: String(result),
      operandTwo: '',
      operator: newOperator
    });
  }

  onClear = () => {
    this.setState({
      operandOne: '0',
      operandTwo: '',
      currentOperand: 'operandOne',
      operator: ''
    })
  }

  onPercent = () => {
    const currentValue = parseFloat(this.getCurrentOperandValue());

    this.setState({
      [this.state.currentOperand]: String(currentValue / 100)
    });
  }

  onNegativePositive = () => {
    const currentValue = this.getCurrentOperandValue();

    let newValue = '';

    if (currentValue[0] === '-') {
      newValue = currentValue.slice(1);
    } else {
      newValue = `-${currentValue}`;
    }

    this.setState({ [this.state.currentOperand]: newValue });
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
        {this.getCurrentDisplayValue()}
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
            onKeyPress={(e) => this.onDecimalPress(e, '.')}
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
