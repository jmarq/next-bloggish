const WithSvg = ({children}) => {
  return (
    <div>
      <div>{children}</div>
      <svg height="1em" width="100%" viewBox="0 0 100 100"  style={{display: "block"}} version="1.1" preserveAspectRatio="none">
        <path stroke="black" fill="red" d="M 0,0 L 50, 100 L 100, 0 Z"></path>
        <rect x="0" y="0" width="50" height="50" fill="yellow"></rect>
      </svg>
    </div>
  );
}

export default WithSvg;