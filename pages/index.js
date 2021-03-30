import styles from "../styles/Home.module.css";
import styled from "styled-components";
import { color, space } from "styled-system";

const Box = styled.div`
  ${color}
  ${space}
`;
export default function Home() {
  return (
    <Box color="blue" bg="#222" p="2">
      <h1>Hello</h1>
    </Box>
  );
}
