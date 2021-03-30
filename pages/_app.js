import "../styles/globals.css";
import { ThemeProvider } from "styled-components";
import React, { useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import H1 from "components/H1";

const theme1 = {
  colors: {
    primary: "cornflowerblue",
    secondary: "#222",
  },
};

const theme2 = {
  colors: {
    primary: "#bfa",
    secondary: "#003",
  },
};

const components = {
  h1: H1,
};

function MyApp({ Component, pageProps }) {
  const [currentTheme, setTheme] = useState(theme1);
  const toggleTheme = () => {
    if (currentTheme === theme1) {
      setTheme(theme2);
    } else {
      setTheme(theme1);
    }
  };
  return (
    <ThemeProvider theme={currentTheme}>
      <MDXProvider components={components}>
        <Component toggleTheme={toggleTheme} {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  );
}

export default MyApp;
