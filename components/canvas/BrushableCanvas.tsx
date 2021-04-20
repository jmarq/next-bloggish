import { useRef, useEffect } from "react";
import { brush as d3Brush, D3BrushEvent } from "d3-brush";
import { select as d3Select } from "d3";

const BrushableCanvas = () => {
  const canvas = useRef<HTMLCanvasElement>();
  const canvasContext = useRef<CanvasRenderingContext2D>();
  const canvasBrush = useRef<SVGGElement>();
  useEffect(() => {
    const brushElement = canvasBrush.current;
    if (brushElement && canvas.current) {
      if(!canvasContext.current){
        canvasContext.current = canvas.current.getContext('2d')
      }
      const context = canvasContext.current;
      console.log("starting brush setup");
      const brush = d3Brush()
        .on("end", (ev) => {
          console.log(ev);
          const width = ev.selection[1][0] - ev.selection[0][0];
          const height = ev.selection[1][1] - ev.selection[0][1];
          context.fillRect(ev.selection[0][0],ev.selection[0][1],width, height);
        })
        .on("brush", (ev) => {
          console.log(ev);
          const width = ev.selection[1][0] - ev.selection[0][0];
          const height = ev.selection[1][1] - ev.selection[0][1];
          context.fillRect(ev.selection[0][0],ev.selection[0][1],width, height);
        });
      const selectedBrush = d3Select(brushElement as SVGGElement);
      brush(selectedBrush);
    }
  }, [canvas.current, canvasBrush.current]);
  return (
    <div style={{position: "relative"}}>
      <canvas
        width="500"
        height="500"
        style={{ border: "1px solid red", position: "absolute", top: 0, left: 0, boxSizing: 'content-box' }}
        ref={canvas}
      ></canvas>
      <svg width="500" height="500" style={{position: "absolute", top: 0, left: 0, border: "1px dashed blue", boxSizing: 'content-box'}}>
        <g ref={canvasBrush}></g>
      </svg>
    </div>
  );
};

export default BrushableCanvas;
