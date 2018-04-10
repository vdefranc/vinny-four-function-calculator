import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

const Header = styled.h3`
  color: #ccc;
  margin-top: 0;
`;

const OuterContainer = styled.aside`
  margin-left: 1em;
`;

const Container = styled.div`
  overflow-y: scroll;
`;

const Operation = styled.div`
  color: white;
  padding: 0.25em 0;
`;

const operationSymbols = {
  'add': '+',
  'subtract': '—',
  'divide': '/',
  'multiply': 'X'
};

class Operations extends React.Component {
  componentDidMount() {
    // this._subscribeToNewOperations();
  }

  // _subscribeToNewOperations = () => {
  //   this.props.operationsQuery.subscribeToMore({
  //     document: gql`
  //       subscription newOperation($calculatorId: ID!) {
  //         newOperation(calculatorId: $calculatorId) {
  //           node {
  //             id
  //             valueOne
  //             valueTwo
  //             result
  //             operator
  //           }
  //         }
  //       }
  //     `,
  //     variables: {
  //       calculatorId: this.props.calculatorId
  //     },
  //     updateQuery: (previous, { subscriptionData }) => {
  //       return {
  //         ...previous,
  //         operations: [...previous.operations, subscriptionData.data.newOperation.node]
  //       };
  //     }
  //   })
  // }

  render() {
    let { operations } = this.props.operationsQuery;

    if (!operations) {
      operations = [];
    }

    const operationsToRender = [...operations, ...this.props.newOperations]

    return <OuterContainer>
      <Header>Your Past Operations</Header>

      <Container>
        {operationsToRender.map(operation => {
          return <Operation key={operation.id}>
            {operation.valueOne} {operationSymbols[operation.operator]} {operation.valueTwo} = {operation.result}
          </Operation>;
        })}
      </Container>
    </OuterContainer>;
  }
}

const OPERATIONS_QUERY = gql`
  query GetOperations ($calculatorId: ID!) {
    operations(calculatorId: $calculatorId) {
      valueOne
      valueTwo
      result
      operator
      id
    }
  }
`;

export default graphql(OPERATIONS_QUERY, { name: 'operationsQuery' })(Operations);
