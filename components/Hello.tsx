import styles from "styles/hello.module.scss";
import styled from 'styled-components'
import { theme1 } from "theme";
// uses scss modules, unlike most of the other components that use styled components, styled system, etc.
// note the .module.scss suffix on the file. note the styles[] syntax.

// this is probably silly but I'm experimenting. using theme to set custom property that is referred to by scss module.
// perhaps a way to inject theme styles into components that heavily use stylesheets.
// could maybe replace "hardcoded values" with var(--a-variable, the-previously-hardcoded-value-as-fallback)
// the complexity may not be worth it, though.
export const Wrapper = styled.div`
--theme-accent-color: ${({theme}) => theme.colors.accent};
`

const Hello = ({}) => {
  return (
    <div className={styles['hello']}>Hello</div>
  )
}

export default Hello;