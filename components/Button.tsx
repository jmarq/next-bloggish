import styled from "styled-components";
import { color, space, ColorProps, SpaceProps } from "styled-system";
interface ButtonProps extends ColorProps, SpaceProps {};

const Button = styled.button<ButtonProps>`
  ${color}
  ${space}
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.25rem;
  cursor: pointer;
`;

export default Button;