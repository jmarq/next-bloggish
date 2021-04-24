import { useRef, useEffect, useState } from "react";
import BrushableCanvas from "./BrushableCanvas";
import Box from "components/Box";
import UL from "components/UL";
import H1 from "components/H1";

const BrushableGallery = () => {
  const [images, setImages] = useState([]);
  const addImage = (url) => {
    setImages([...images, url]);
  };

  return (
    <Box style={{ border: "2px solid white" }}>
      <BrushableCanvas urlHandler={addImage}></BrushableCanvas>
      {images.length !== 0 && (
        <>
          <H1>Images</H1>
          <UL style={{ display: "flex", flexWrap: "wrap" }}>
            {images.map((url) => (
              <li>
                <img
                  width="200"
                  height="200"
                  src={url}
                  style={{ border: "2px solid white" }}
                  alt="something the user drew, who knows"
                />
              </li>
            ))}
          </UL>
        </>
      )}
    </Box>
  );
};

export default BrushableGallery;
