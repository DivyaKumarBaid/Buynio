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

export const CardLayout = styled.div<{ $background: string }>`
  background: ${(props) => props.$background};
`;
