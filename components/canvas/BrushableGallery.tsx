import { useRef, useEffect, useState } from "react";
import BrushableCanvas from "./BrushableCanvas";

const BrushableGallery = () => {
  const [images, setImages] = useState([]);
  const addImage = (url) => {
    setImages([...images, url]);
  };

  return (
    <div>
      <BrushableCanvas urlHandler={addImage}></BrushableCanvas>
      {images.length !==0 && (
        <ul>
          {images.map((url) => (
            <li>
              <img width="200" height="200" src={url} alt="something the user drew, who knows"/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BrushableGallery;
