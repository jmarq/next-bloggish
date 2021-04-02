import styled from "styled-components";
import { color, space, ColorProps, SpaceProps } from "styled-system";

interface BoxProps extends ColorProps, SpaceProps {};

const Box = styled.div<BoxProps>`
  ${color}
  ${space}
`;

export default Box;