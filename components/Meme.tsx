import styled from "styled-components";
import { ReactElement } from "react";
const MemeImage = styled.img`
  width: 350px;
  height: 350px;
  display: block;
`;

const Meme = ({
  children,
  meme = "aag",
}: {
  children: ReactElement;
  meme: string;
}) => {
  let stringChildren: string;
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
  const memeUrl = `https://api.memegen.link/images/${meme}/_/${joinedChildren}.jpg`;
  return (
    <MemeImage src={memeUrl} alt={`meme of ${stringChildren}`}></MemeImage>
  );
};

export default Meme;
