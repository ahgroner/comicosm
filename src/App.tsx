import { CharacterPaths } from "./CharacterPaths";
import "./App.css";
import * as React from "react";
import { Stack, Button, ButtonGroup } from "@mui/material";
import { Zoom } from "@visx/zoom";
import { localPoint } from "@visx/event";
import { RectClipPath } from "@visx/clip-path";
import { ReplayRounded, AddRounded, RemoveRounded } from "@mui/icons-material";
import comicosm2 from "./assets/comicosm2.jpg";
import { ThemeProvider } from "./ThemeProvider";
import { CharacterList } from "./CharacterList";
const width = 800;
const height = 800;
function App() {
  const [hoverCharacter, setHoverCharacter] = React.useState("");
  const [activeCharacter, setActiveCharacter] = React.useState("");
  // const [showMiniMap, setShowMiniMap] = React.useState(true);
  const handleMouseOver = (e) => {
    setHoverCharacter(e.target.className.baseVal);
  };
  const handleClick = (e) => {
    setActiveCharacter(e.target.className.baseVal);
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
    <ThemeProvider>
      <div>
        <div style={{ position: "absolute" }}>
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
              <Stack
                className="relative"
                sx={{
                  path: {
                    cursor: "pointer",
                    strokeWidth: 0,
                    fill: "rgba(0,0,0,0)",
                    [`&.${hoverCharacter || 'IGNORE'}`]: {
                      stroke: "rgb(255,242,0)",
                      strokeWidth: 3,
                    },
                    [`&.${activeCharacter  || 'IGNORE'}`]: {
                      stroke: "rgb(255,242,0)",
                      strokeWidth: 3,
                    },
                  },
                }}
              >
                <svg
                  width={width}
                  height={height}
                  fill="none"
                  viewBox="0 0 4096 3186"
                  onMouseOver={handleMouseOver}
                  onClick={!zoom.isDragging && handleClick}
                  style={{
                    cursor: zoom.isDragging ? "grabbing" : "grab",
                    touchAction: "none",
                  }}
                  ref={zoom.containerRef}
                >
                  <RectClipPath id="zoom-clip" width={width} height={height} />
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
                <Stack
                  sx={{
                    direction: "row",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  <ButtonGroup
                    variant="contained"
                    orientation="vertical"
                    sx={{
                      opacity: 0.7,
                      "&:hover": {
                        opacity: 1,
                      },

                      button: {
                        width: "40px",
                      },
                      svg: {
                        path: {
                          fill: "white",
                        },
                      },
                    }}
                  >
                    <Button
                      color="primary"
                      onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
                    >
                      <AddRounded />
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
                    >
                      <RemoveRounded />
                    </Button>
                    <Button color="primary" onClick={zoom.reset}>
                      <ReplayRounded />
                    </Button>
                  </ButtonGroup>
                </Stack>
                {/* <div className="mini-map">
                    <button
                      type="button"
                      className="btn btn-lg"
                      onClick={() => setShowMiniMap(!showMiniMap)}
                    >
                      {showMiniMap ? "Hide" : "Show"} Mini Map
                    </button>
                  </div> */}
              </Stack>
            )}
          </Zoom>
        </div>
      </div>
      <CharacterList / >
    </ThemeProvider>
  );
}

export default App;
