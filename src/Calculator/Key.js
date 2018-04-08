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

function Key(props) {
  const {
    size: { width },
    number,
    onKeyPress,
    children
  } = props

  const KeyContainer = getInnerContainer(width);

  return <KeyWrapper>
    <KeyContainer onClick={event => onKeyPress(event, number)}>
      {props.children}
    </KeyContainer>
  </KeyWrapper>;
}

export default sizeMe()(Key)
