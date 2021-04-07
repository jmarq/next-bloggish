import styled from "styled-components";
import { color, space, ColorProps, SpaceProps } from "styled-system";

interface H1Props extends ColorProps, SpaceProps {}

const H1 = styled.h1<H1Props>`
  ${color}
  ${space}
  font-size: 2rem;
  border-bottom: 4px solid ${({theme}) => theme.colors.accent};
`;

H1.defaultProps = {
  color: 'primary',
  bg: 'secondary',
  p: 2,
  mb: 2,
}

export default H1;