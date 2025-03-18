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
import { Sidebar } from "./CharacterList";
import { useScreenSize } from "./hooks/useScreenSize";
import { SIDEBAR_WIDTH } from "./constants";

function App() {
  const dimensions = useScreenSize();
  const [namedCharacters, setNamedCharacters] = React.useState<Set<string>>(new Set());

  const [hoverCharacter, setHoverCharacter] = React.useState("");
  const [activeCharacter, setActiveCharacter] = React.useState("");
  // const [showMiniMap, setShowMiniMap] = React.useState(true);
  const handleMouseOver = (e: React.MouseEvent<SVGElement>) => {
    const target = e.target as SVGPathElement;
    setHoverCharacter(target.className.baseVal);
  };
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    const target = e.target as SVGPathElement;
    setActiveCharacter(target.className.baseVal);
  };

  const initialTransform = {
    scaleX: 1.15,
    scaleY: 1.15,
    translateX: -360,
    translateY: -220,
    skewX: 0,
    skewY: 0,
  };

  const width = dimensions.width - SIDEBAR_WIDTH;

  return (
    <ThemeProvider>
      <div>
        <div style={{ position: "absolute" }}>
          <Zoom<SVGSVGElement>
            width={width}
            height={dimensions.height}
            scaleXMin={0.6}
            scaleXMax={12}
            scaleYMin={0.6}
            scaleYMax={12}
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
                    [`&.${hoverCharacter || "IGNORE"}`]: {
                      stroke: "rgb(255,242,0)",
                      strokeWidth: 3,
                      strokeLinejoin: "round",
                      strokeLinecap: "round",
                      strokeAlignment: "outer",
                    },
                    [`&.${activeCharacter || "IGNORE"}`]: {
                      stroke: "rgb(255,242,0)", 
                      strokeWidth: 3,
                      strokeLinejoin: "round",
                      strokeLinecap: "round",
                      strokeAlignment: "outer",
                    },
                  },
                }}
              >
                {/* {zoom.toString()} */}
                <svg
                  width={width}
                  height={dimensions.height}
                  fill="none"
                  viewBox="0 0 4096 3186"
                  onMouseOver={handleMouseOver}
                  onMouseDown={handleClick}
                  // onClick={!zoom.isDragging ? handleClick : undefined}
                  style={{
                    cursor: zoom.isDragging ? "grabbing" : "grab",
                    touchAction: "none",
                  }}
                  ref={zoom.containerRef}
                >
                  <RectClipPath
                    id="zoom-clip"
                    width={width}
                    height={dimensions.height}
                  />
                  <rect
                    width={width}
                    height={dimensions.height}
                    rx={14}
                  />
                  <g transform={zoom.toString()}>
                    <image
                      href={comicosm2}
                      width="4096"
                      height="3186"
                      preserveAspectRatio="xMidYMid meet"
                    />
                    <CharacterPaths />
                  </g>
                  <rect
                    width={width}
                    height={dimensions.height}
                    rx={14}
                    fill="transparent"
                    onTouchStart={zoom.dragStart}
                    onTouchMove={zoom.dragMove}
                    onTouchEnd={zoom.dragEnd}
                    onMouseDown={(e) => {
                      zoom.dragStart(e);
                      handleClick(e);
                    }}
                    onMouseMove={(e) => {
                      zoom.dragMove(e);
                      if (!zoom.isDragging) {
                        handleMouseOver(e);
                      }
                    }}
                    onMouseUp={zoom.dragEnd}
                    onMouseLeave={() => {
                      if (zoom.isDragging) zoom.dragEnd();
                      setHoverCharacter("");
                    }}
                    onDoubleClick={(event) => {
                      const point = localPoint(event) || { x: 0, y: 0 };
                      zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
                    }}
                    style={{
                      pointerEvents: zoom.isDragging ? "all" : "none"
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
                      padding: 1,
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
      <Sidebar
        hoverCharacter={hoverCharacter}
        activeCharacter={activeCharacter}
        setActiveCharacter={setActiveCharacter}
        setHoverCharacter={setHoverCharacter}
        namedCharacters={namedCharacters}
        setNamedCharacters={setNamedCharacters}
      />
    </ThemeProvider>
  );
}

export default App;
