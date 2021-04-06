import styled from "styled-components";
import {
  color,
  space,
  shadow,
  ColorProps,
  SpaceProps,
  ShadowProps,
} from "styled-system";

interface BoxProps extends ColorProps, SpaceProps, ShadowProps {}

const Box = styled.div<BoxProps>`
  ${color}
  ${space}
  ${shadow}
  margin-bottom: 1rem;
`;

Box.defaultProps = {
  color: "primary",
  bg: "secondary",
  boxShadow: "medium",
};

export default Box;
