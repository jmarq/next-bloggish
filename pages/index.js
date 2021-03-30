import styled from "styled-components";
import { color, space } from "styled-system";

const Box = styled.div`
  ${color}
  ${space}
`;

const Button = styled.button`
  ${color}
  ${space}
  font-size: 1rem;
`;

export default function Home({ toggleTheme }) {
  return (
    <Box color="primary" bg="secondary" p="2">
      <h1>Hello</h1>
      <Button onClick={toggleTheme} p="2">
        toggle theme
      </Button>
    </Box>
  );
}
