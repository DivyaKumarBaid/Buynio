import styled from "styled-components";

// Styled component for headers
export const Header = styled.h1<{
  $fontFamily: string;
  $fontColor: string;
  $fontSize: string;
}>`
  font-family: ${(props) => props.$fontFamily};
  color: ${(props) => props.$fontColor};
  font-size: ${(props) => props.$fontSize};
`;

// Styled component for normal text
export const Text = styled.p<{
  $fontFamily: string;
  $fontColor: string;
  $fontSize: string;
}>`
  font-family: ${(props) => props.$fontFamily};
  color: ${(props) => props.$fontColor};
  font-size: ${(props) => props.$fontSize};
`;

export const InlineText = styled.span<{
  $fontFamily: string;
  $fontColor: string;
  $fontSize: string;
}>`
  font-family: ${(props) => props.$fontFamily};
  color: ${(props) => props.$fontColor};
  font-size: ${(props) => props.$fontSize};
`;
