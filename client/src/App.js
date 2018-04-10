import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Calculator from './Calculator';
import Operations from './Operations';
import styled from 'styled-components';


const AppContainer = styled.main`
  display: flex;
  width: 75%;
  margin: 0 auto;
`;

class App extends React.Component {
  state = {
    loading: true,
    newOperations: []
  }

  componentWillMount() {
    const existingId = localStorage.getItem('calculatorId');

    if (existingId) {
      return this.setState({ loading: false, id: existingId });
    }

    this.props.addCalc({
      variables: {
        display: '0'
      }
    }).then(({data}) => {
      localStorage.setItem('calculatorId', data.addCalculator.id);
      this.setState({ loading: false, id: data.addCalculator.id })
    })
  }

  render() {
    if (this.state.loading) {
      return 'loading';
    }

    console.log('hey')

    return <AppContainer>
      <div style={{flex: 1}}>
        <Calculator id={this.state.id} onNewOperation={(operation) => {
          this.setState({
            newOperations: this.state.newOperations.concat(operation)
          })
        }} />
      </div>

      <div style={{flex: 1}}>
        <Operations calculatorId={this.state.id} newOperations={this.state.newOperations} />
      </div>
    </AppContainer>
  }
}

const CALC_MUTATION = gql`
  mutation {
    addCalculator {
      id
      display
    }
  }
`

export default graphql(CALC_MUTATION, {name: 'addCalc'})(App);
