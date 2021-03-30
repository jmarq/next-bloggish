import styled from "styled-components";
import { color, space } from "styled-system";

const H1 = styled.h1`
  ${color}
  ${space}
  font-size: 2rem;
  border-bottom: 4px solid red;
`;

H1.defaultProps = {
  color: 'primary',
  bg: 'secondary',
  p: 2,
  mb: 1,
}

export default H1;