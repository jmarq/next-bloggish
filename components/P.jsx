import styled from "styled-components";
import { color, space } from "styled-system";

const P = styled.p`
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