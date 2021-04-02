import styled from "styled-components";
import {ReactElement} from 'react';
const MemeImage = styled.img`
  width: 350px;
  height: 350px;
  display: block;
`;

const Meme = ({ children } : {children: ReactElement}) => {
  let stringChildren : string;
  let currentChildren = children;
  while (currentChildren.props?.children) {
    currentChildren = currentChildren.props.children;
  }
  if (typeof currentChildren !== "string") {
    stringChildren = JSON.stringify(currentChildren);
  } else {
    stringChildren = currentChildren;
  }
  const joinedChildren = stringChildren.trim().split(" ").join("_");
  const whichMeme = "aag";
  const memeUrl = `https://api.memegen.link/images/${whichMeme}/_/${joinedChildren}.jpg`;
  return (
    <MemeImage src={memeUrl} alt={`meme of ${stringChildren}`}></MemeImage>
  );
};

export default Meme;
