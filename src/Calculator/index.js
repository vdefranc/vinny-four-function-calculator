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
  height: 4em;
`;

const KeyContainer = styled.section`
  display: flex;
  flex-flow: row wrap;
`;

export default class Calculator extends Component {
  state = {
    lastPressed: ''
  }

  onKeyPress = (event, key) => {
    event.preventDefault();

    this.setState({
      lastPressed: key
    })
  }

  render() {
    return <CalculatorContainer>
      <Display />

      <KeyContainer>
          {Array(12).fill('').map((key, index) => {
            return <Key number={index}
              key={index}
              onKeyPress={this.onKeyPress}
            />;
          })}
      </KeyContainer>
    </CalculatorContainer>;
  }
}
