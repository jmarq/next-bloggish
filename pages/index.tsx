import Box from "components/Box";
import Button from "components/Button";
import H1 from "components/H1";
import { Fragment } from "react";

export default function Home({ toggleTheme }) {
  return (
    <>
      <Box color="primary" bg="secondary" p={["2", "4"]} boxShadow="medium">
        <H1>Hello</H1>
        <Button onClick={toggleTheme} color="secondary" bg="primary" p="2">
          toggle theme
        </Button>
      </Box>
      <Box p={["2", "4"]}>
        What's the goal here? To play with styled components/system and mdx? to
        actually publish content?
        <Box p={["2", "4"]}>nested box</Box>
        <Box p={["2", "4"]}>another nested box</Box>
      </Box>
    </>
  );
}
