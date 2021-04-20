import { useContext} from "react";
import { ThemeContext } from "styled-components";


const WithSvg = ({children, ...props}) => {
  const theme = useContext(ThemeContext);
  return (
    <div {...props}>
      <div>{children}</div>
      <svg height="1em" width="100%" viewBox="0 0 100 100"  style={{display: "block"}} version="1.1" preserveAspectRatio="none">
        <path stroke="none" fill={theme.colors.accent} d="M 0,0 L 50, 100 L 100, 0 Z"></path>
        <path stroke="none" fill={theme.colors.primary} d="M 0,0 L 25, 100 L 50, 0 L 75, 100, L 100, 0 Z"></path>

      </svg>
    </div>
  );
}

export default WithSvg;