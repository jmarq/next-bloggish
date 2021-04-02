import styled from "styled-components";
import { color, space, ColorProps, SpaceProps } from "styled-system";

interface PProps extends ColorProps, SpaceProps {};

const P = styled.p<PProps>`
  ${color}
  ${space}
`;

P.defaultProps = {
  color: 'secondary',
  bg: 'white',
  p: 2,
  mb: 1,
}

export default P;