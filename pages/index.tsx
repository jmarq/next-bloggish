import Box from "components/Box";
import Button from "components/Button";
import H1 from "components/H1";
import UL from "components/UL";
import slugs from "helpers/slugs.json";
import Link from "next/link";

export default function Home({ toggleTheme }) {
  return (
    <>
      <Box>
        <H1>Hello</H1>
        <Button onClick={toggleTheme} color="secondary" bg="primary" p="2">
          toggle theme
        </Button>
      </Box>
      <Box>
        What's the goal here? To play with styled components/system and mdx? to
        actually publish content?
        <Box>nested box</Box>
        <Box>another nested box</Box>
      </Box>
      <Box>
        <UL>
          {slugs.map((slug) => (
            <li key={slug}>
              <Link href={slug}>{slug}</Link>
            </li>
          ))}
        </UL>
      </Box>
    </>
  );
}
