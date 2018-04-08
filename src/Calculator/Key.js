import React from 'react';
import styled from 'styled-components';
import sizeMe from 'react-sizeme';

const getInnerContainer = (width) => styled.div`
  text-align: center;
  height: ${width}px
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;

const KeyWrapper = styled.div`
  padding: 1em;
  flex: 1;
  flex-basis: 33.333%;
`;

function Key({size, number, onKeyPress}) {
  const KeyContainer = getInnerContainer(size.width);

  return <KeyWrapper>
    <KeyContainer onClick={event => onKeyPress(event, number)}>
      {number}
    </KeyContainer>
  </KeyWrapper>;
}

export default sizeMe()(Key)
