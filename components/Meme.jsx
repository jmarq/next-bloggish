import styled from "styled-components";
import { color, space } from "styled-system";

const MemeImage = styled.img`
  width: 350px;
  height: 350px;
  display: block;
`;

const Meme = ({ children }) => {
  let stringChildren;
  if (typeof children !== "string") {
    console.log(children);
    // drill down another level
    if (children.props?.children) {
      const innerChildren = children.props?.children;
      stringChildren =
        typeof innerChildren == "string"
          ? innerChildren
          : JSON.stringify(children.props.children);
    } else {
      stringChildren = "not working";
    }
  } else {
    stringChildren = children;
  }
  const joinedChildren = stringChildren.split(" ").join("_");
  const whichMeme = "aag";
  const memeUrl = `https://api.memegen.link/images/${whichMeme}/_/${joinedChildren}.jpg`;
  return <MemeImage src={memeUrl} alt={`meme of ${stringChildren}`}></MemeImage>;
};

//https://api.memegen.link/images/{key}/{phrase_1}/{phrase_2}.jpg

export default Meme;
