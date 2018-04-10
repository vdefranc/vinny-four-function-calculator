import React from 'react';
import styled from 'styled-components';
import sizeMe from 'react-sizeme';

const getKeyWrapper = (height, isDoubleWidth, backgroundColor, activeColor) => styled.div`
  border-top: 1px solid #888;
  ${!activeColor && 'border-right: 1px solid #888;'}
  ${activeColor && 'color: white;'}
  flex: ${isDoubleWidth? 2 : 1};
  flex-basis: ${isDoubleWidth ? '66.666%' : '33.333%'};
  height: ${height}px;
  text-align: center;
  background-color: ${backgroundColor || '#fff'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  :active {
    background-color: ${activeColor || '#ddd'};
  }
`;

function Key(props) {
  const {
    size: { width },
    number,
    onKeyPress,
    children,
    isDoubleWidth,
    backgroundColor,
    activeColor
  } = props

  const height = isDoubleWidth ? width / 2 : width;
  const KeyWrapper = getKeyWrapper(height, isDoubleWidth, backgroundColor, activeColor);

  return <KeyWrapper onClick={event => onKeyPress(event, number)}>
      {children}
  </KeyWrapper>;
}

export default sizeMe()(Key)
