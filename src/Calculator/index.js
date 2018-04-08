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

const KeyContainer = styled.section`
  display: flex;
  flex-flow: row wrap;
`;

export default class Calculator extends Component {
  state = {
    display: '0'
  }

  onKeyPress = (event, key) => {
    event.preventDefault();

    const currentDisplay = this.state.display;

    this.setState({
      display: currentDisplay === '0' ? String(key) : currentDisplay + key
    })
  }

  render() {
    return <CalculatorContainer>
      <Display>
        {this.state.display}
      </Display>

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
