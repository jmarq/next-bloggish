import "../styles/globals.css";
import styled, { ThemeProvider } from "styled-components";
import css from "@styled-system/css";
import React, { useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { theme1, theme2 } from "theme";
import H1 from "components/H1";
import P from "components/P";
import Button from "components/Button";
import Box from "components/Box";
import Meme from "components/Meme";

const MDXWrapper = (props) => {
  console.log({ mdxWrapperProps: props });
  const { meta, children } = props;
  return (
    <>
      <Head>
        <title>{meta?.title || "a post"}</title>
      </Head>
      <div className="mdx-wrapper">
        <Box>{children}</Box>
      </div>
    </>
  );
};

const components = {
  wrapper: MDXWrapper,
  h1: H1,
  p: Box,
  blockquote: Meme,
};

const GlobalWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
`;

const ContentWrapper = styled.div`
  max-width: 960px;
  margin: auto;
`;

const Layout = ({ children }) => (
  <GlobalWrapper>
    <ContentWrapper>{children}</ContentWrapper>
  </GlobalWrapper>
);

function MyApp({ Component, pageProps }) {
  const [currentTheme, setTheme] = useState(theme1);
  const router = useRouter();
  const toggleTheme = () => {
    if (currentTheme === theme1) {
      setTheme(theme2);
    } else {
      setTheme(theme1);
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <Layout>
        <MDXProvider components={components}>
          <Button
            color="secondary"
            bg="primary"
            p="2"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <Button onClick={toggleTheme} color="secondary" bg="primary" p="2">
            toggle theme
          </Button>
          <Component toggleTheme={toggleTheme} {...pageProps} />
        </MDXProvider>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
