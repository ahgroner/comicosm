import { styled } from "@mui/material/styles";
import React from "react";
import comicosm2 from "../assets/comicosm2.jpg";

const IMAGE_WIDTH = 6750;
const IMAGE_HEIGHT = 5250;
const ASPECT_RATIO = IMAGE_WIDTH / IMAGE_HEIGHT;
export const CONTAINER_WIDTH = 220;
export const CONTAINER_HEIGHT = CONTAINER_WIDTH / ASPECT_RATIO;

const AnimatedPortrait = styled('div')({
  transition: 'background-size 0.5s ease-in-out, background-position 0.5s ease-in-out',
});

export const CharacterPortrait: React.FC<{ id: string }> = ({ id }) => {
  const normalizedBounds = React.useMemo(() => {
    try {
      const svgElement = document?.querySelector?.("svg g");
      const pathElement = document?.querySelector?.(`svg path.${id}`);

      if (!svgElement || !pathElement) return null;

      const svgRect = svgElement.getBoundingClientRect();
      const pathRect = pathElement.getBoundingClientRect();

      const rawBounds = {
        top: (pathRect.top - svgRect.top) / svgRect.height,
        left: (pathRect.left - svgRect.left) / svgRect.width,
        right: (pathRect.right - svgRect.left) / svgRect.width,
        bottom: (pathRect.bottom - svgRect.top) / svgRect.height,
      };

      // Calculate the width and height of the character in normalized space
      const characterWidth = rawBounds.right - rawBounds.left;
      const characterHeight = rawBounds.bottom - rawBounds.top;
      const characterAspectRatio = characterWidth / characterHeight;

      // If character is taller than the image's aspect ratio, adjust width
      // If character is wider than the image's aspect ratio, adjust height
      if (characterAspectRatio < ASPECT_RATIO) {
        // Character is too tall, adjust width to match aspect ratio
        const newWidth = characterHeight * ASPECT_RATIO;
        const widthDiff = (newWidth - characterWidth) / 2;
        return {
          ...rawBounds,
          left: rawBounds.left - widthDiff,
          right: rawBounds.right + widthDiff,
        };
      } else {
        // Character is too wide, adjust height to match aspect ratio
        const newHeight = characterWidth / ASPECT_RATIO;
        const heightDiff = (newHeight - characterHeight) / 2;
        return {
          ...rawBounds,
          top: rawBounds.top - heightDiff,
          bottom: rawBounds.bottom + heightDiff,
        };
      }
    } catch {
      return null;
    }
  }, [id]);

  if (!normalizedBounds) {
    return null;
  }

  const basePosX = `${normalizedBounds.left * 100}%`;
  const basePosY = `${normalizedBounds.top * 100}%`;
  const baseSizeW = `${(1 / (normalizedBounds.right - normalizedBounds.left)) * 0.7 * 100}%`;
  const baseSizeH = `${(1 / (normalizedBounds.bottom - normalizedBounds.top)) * 0.7 * 100}%`;

  return (
    <AnimatedPortrait
      style={{
        borderRadius: 30,
        width: `${CONTAINER_WIDTH}px`,
        height: `${CONTAINER_HEIGHT}px`,
        backgroundImage: `url(${comicosm2})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${basePosX} ${basePosY}`,
        backgroundSize: `${baseSizeW} ${baseSizeH}`,
        '--base-pos-x': basePosX,
        '--base-pos-y': basePosY,
        '--base-size-w': baseSizeW,
        '--base-size-h': baseSizeH,
      } as any}
    />
  );
};
