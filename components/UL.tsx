import styled from "styled-components";

const UL = styled.ul`
list-style: none;
li {
  padding: 0.5rem;
}
li::before {
  content: "•  ";
  color: ${({theme})=> theme.colors.accent};
}
`;

export default UL;