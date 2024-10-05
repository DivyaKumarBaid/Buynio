import { Gravity } from "@/types/global.types";
import styled from "styled-components";

export const ProductLayout = styled.div<{ $textColor: string }>`
  color: ${(props) => props.$textColor};
`;

export const HeadingLayout = styled.div<{
  $textColor: string;
  $gravity: string;
  $fontSize: string;
}>`
  color: ${(props) => props.$textColor};
  display: flex;
  width: 100%;
  font-size: ${(props) => `${props.$fontSize}px`};
  justify-content: ${(props) => {
    switch (props.$gravity) {
      case "Left":
        return Gravity.START;
      case "Center":
        return Gravity.CENTER;
      case "Right":
        return Gravity.END;
      default:
        return Gravity.START;
    }
  }};
`;

export const CardLayout = styled.div<{
  $background: string;
  $backgroundImage: string;
  $cornerRadiusBottomLeft: string;
  $cornerRadiusBottomRight: string;
  $cornerRadiusTopRight: string;
  $cornerRadiusTopLeft: string;
}>`
  background-color: ${(props) => props.$background};
  background: ${(props) => `url('${props.$backgroundImage}')`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: ${(props) =>
    ` ${props.$cornerRadiusTopLeft}px ${props.$cornerRadiusTopRight}px ${props.$cornerRadiusBottomRight}px ${props.$cornerRadiusBottomLeft}px`};
`;

export const TranslucentLayout = styled.div<{
  $cornerRadiusBottomLeft: string;
  $cornerRadiusBottomRight: string;
  $cornerRadiusTopRight: string;
  $cornerRadiusTopLeft: string;
}>`
  border-radius: ${(props) =>
    ` ${props.$cornerRadiusTopLeft}px ${props.$cornerRadiusTopRight}px ${props.$cornerRadiusBottomRight}px ${props.$cornerRadiusBottomLeft}px`};
`;
