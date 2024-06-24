import React from 'react'
import styled from 'styled-components';

type VerticalDividerProps = {
    height: string;
    width: string;
    backgroundColor: string
}

const Divider = styled.div<{ $bgColor: string, $width:string, $height:string }>`
  background: ${(props) => props.$bgColor};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  `;


const VerticalDivider = (props:VerticalDividerProps) => {
  return (
    <Divider $bgColor={props.backgroundColor} $width={props.width} $height={props.height}/>
  )
}

export default VerticalDivider