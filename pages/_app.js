import "../styles/globals.css";
import { ThemeProvider } from "styled-components";
import React, {useState} from 'react'
const theme1 = {
  colors: {
    primary: "cornflowerblue",
    secondary: "#222"
  },
};

const theme2 = {
  colors: {
    primary: "#bfa",
    secondary: "#003"
  },
};

function MyApp({ Component, pageProps }) {
  const [currentTheme, setTheme] = useState(theme1)
  const toggleTheme = () => {
    if(currentTheme === theme1) {
      setTheme(theme2);
    } else {
      setTheme(theme1);
    }
  }
  return (
    <ThemeProvider theme={currentTheme}>
      <Component toggleTheme={toggleTheme} {...pageProps}/>
    </ThemeProvider>
  );
}

export default MyApp;
