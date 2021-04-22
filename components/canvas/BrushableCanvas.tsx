import { useRef, useEffect, useState } from "react";
import { brush as d3Brush, D3BrushEvent } from "d3-brush";
import { select as d3Select } from "d3";

const BrushableCanvas = ({
  width = 500,
  height = 500,
  color = "#FF0000",
  colorPicker = true,
}) => {
  const canvas = useRef<HTMLCanvasElement>();
  const canvasContext = useRef<CanvasRenderingContext2D>();
  const canvasBrush = useRef<SVGGElement>();
  const [paintColor, setPaintColor] = useState(color);
  useEffect(() => {
    const brushElement = canvasBrush.current;
    if (brushElement && canvas.current) {
      if (!canvasContext.current) {
        canvasContext.current = canvas.current.getContext("2d");
      }
      const context = canvasContext.current;
      context.fillStyle = paintColor;
      console.log("starting brush setup");
      const brush = d3Brush()
        .on("end", (ev) => {
          // console.log(ev);
        })
        .on("brush", (ev) => {
          // console.log(ev);
          if (ev.mode == "drag") {
            const selectionWidth = ev.selection[1][0] - ev.selection[0][0];
            const selectionHeight = ev.selection[1][1] - ev.selection[0][1];
            const midpoint = [
              (ev.selection[1][0] + ev.selection[0][0]) / 2,
              (ev.selection[1][1] + ev.selection[0][1]) / 2,
            ];
            context.beginPath();
            context.ellipse(
              midpoint[0],
              midpoint[1],
              selectionWidth / 2,
              selectionHeight / 2,
              0,
              0,
              2 * Math.PI
            );
            context.fill();
            // context.ellipse(0,0,10,10,0,0,Math.PI*2);

            // context.fillRect(
            //   ev.selection[0][0],
            //   ev.selection[0][1],
            //   selectionWidth,
            //   selectionHeight
            // );
          }
        });
      const selectedBrush = d3Select(brushElement as SVGGElement);
      brush(selectedBrush);
      const brushSelection = brushElement.querySelector("rect.selection");
      brushSelection.setAttribute("fill", "url(#brush-preview)");
      brushSelection.setAttribute("fill-opacity", "0.7");
    }
  }, [canvas.current, canvasBrush.current]);
  return (
    <div style={{ position: "relative" }}>
      <canvas
        width={width}
        height={height}
        style={{
          border: "1px solid red",
          boxSizing: "content-box",
        }}
        ref={canvas}
      ></canvas>
      <svg
        width={width}
        height={height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          border: "1px dashed blue",
          boxSizing: "content-box",
        }}
      >
        <defs>
          <pattern
            id="brush-preview"
            patternUnits="objectBoundingBox"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" fill={paintColor}></circle>
          </pattern>
        </defs>
        <g ref={canvasBrush}></g>
      </svg>
      {colorPicker && (
        <div className="controls">
          <input
            type="color"
            onChange={(ev) => {
              setPaintColor(ev.target.value);
              canvasContext.current.fillStyle = paintColor;
            }}
            value={paintColor}
          />
        </div>
      )}
    </div>
  );
};

export default BrushableCanvas;
