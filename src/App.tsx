import { CharacterPaths } from "./CharacterPaths";
import "./App.css";
import * as React from "react";
import { Stack } from "@mui/material";
import { Zoom } from "@visx/zoom";
import { localPoint } from "@visx/event";
import { RectClipPath } from "@visx/clip-path";

import comicosm2 from "./assets/comicosm2.jpg";

const width = 800;
const height = 800;
function App() {
  const [hoverCharacter, setHoverCharacter] = React.useState("Pearl");
  const [showMiniMap, setShowMiniMap] = React.useState(false);
  const handleMouseOver = (e) => {
    console.log(e.target.className.baseVal);
    setHoverCharacter(e.target.className.baseVal);
  };

  const initialTransform = {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0,
  };

  return (
    <>
      <div>
        <div style={{ position: "absolute" }}>
          <Stack
            sx={{
              path: {
                strokeWidth: 0,
                fill: "rgba(0,0,0,0)",
                ...(hoverCharacter
                  ? {
                      [`&.${hoverCharacter}`]: {
                        stroke: "rgb(255,242,0)",
                        strokeWidth: 3,
                      },
                    }
                  : {}),
              },
            }}
          >
            <Zoom<SVGSVGElement>
              width={width}
              height={height}
              scaleXMin={1}
              scaleXMax={10}
              scaleYMin={1}
              scaleYMax={10}
              initialTransformMatrix={initialTransform}
            >
              {(zoom) => (
                <div className="relative">
                  <svg
                    width={width}
                    height={height}
                    fill="none"
                    viewBox="0 0 4096 3186"
                    onMouseOver={handleMouseOver}
                    style={{
                      cursor: zoom.isDragging ? "grabbing" : "grab",
                      touchAction: "none",
                    }}
                    ref={zoom.containerRef}
                  >
                    <RectClipPath
                      id="zoom-clip"
                      width={width}
                      height={height}
                    />
                    <rect width={width} height={height} rx={14} />
                    <g transform={zoom.toString()}>
                      <image
                        href={comicosm2}
                        width="4096"
                        height="3186"
                        preserveAspectRatio="xMidYMid meet"
                      />
                      <CharacterPaths onMouseOver={handleMouseOver} />
                    </g>
                    <rect
                      width={width}
                      height={height}
                      rx={14}
                      fill="transparent"
                      onTouchStart={zoom.dragStart}
                      onTouchMove={zoom.dragMove}
                      onTouchEnd={zoom.dragEnd}
                      onMouseDown={zoom.dragStart}
                      onMouseMove={zoom.dragMove}
                      onMouseUp={zoom.dragEnd}
                      onMouseLeave={() => {
                        if (zoom.isDragging) zoom.dragEnd();
                      }}
                      onDoubleClick={(event) => {
                        const point = localPoint(event) || { x: 0, y: 0 };
                        zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
                      }}
                    />
                  </svg>
                  <div className="controls">
                    <button
                      type="button"
                      className="btn btn-zoom"
                      onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="btn btn-zoom btn-bottom"
                      onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className="btn btn-lg"
                      onClick={zoom.center}
                    >
                      Center
                    </button>
                    <button
                      type="button"
                      className="btn btn-lg"
                      onClick={zoom.reset}
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      className="btn btn-lg"
                      onClick={zoom.clear}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="mini-map">
                    <button
                      type="button"
                      className="btn btn-lg"
                      onClick={() => setShowMiniMap(!showMiniMap)}
                    >
                      {showMiniMap ? "Hide" : "Show"} Mini Map
                    </button>
                  </div>
                </div>
              )}
            </Zoom>
          </Stack>
        </div>
      </div>
    </>
  );
}

export default App;
