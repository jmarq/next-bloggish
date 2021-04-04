import Box from 'components/Box';
import Button from 'components/Button';

export default function Home({ toggleTheme }) {
  return (
    <Box color="primary" bg="secondary" p={["2", "4"]} boxShadow="medium">
      <h1>Hello</h1>
      <Button onClick={toggleTheme} color="secondary" bg="primary" p="2">
        toggle theme
      </Button>
    </Box>
  );
}
