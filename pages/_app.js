import "../styles/globals.css";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    blue: "cornflowerblue",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
