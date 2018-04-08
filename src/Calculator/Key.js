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
`

// const getKeyWrapper = (width) => styled.div``

const KeyWrapper = styled.div`
  padding: 1em;
  flex: 1;
  flex-basis: 33.333%;
`

function Key({size, number}) {
  const KeyContainer = getInnerContainer(size.width);

  return <KeyWrapper>
    <KeyContainer>
      {number}
    </KeyContainer>
  </KeyWrapper>
}

export default sizeMe()(Key)
