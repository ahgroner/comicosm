import React from "react";
import { Stack, TextField, Typography, Button, Fab } from "@mui/material";
import { CloseRounded, PsychologyAltRounded } from "@mui/icons-material";
import {
  CharacterPortrait,
  CONTAINER_HEIGHT,
  CONTAINER_WIDTH,
} from "./CharacterPortrait";
import { formatName } from "../utils";
import tvStatic from "../assets/tv-static.gif";

type CharacterPortraitSectionProps = {
  hoverCharacter: string;
  activeCharacter: string;
  shownCharacter: string;
  mode: "challenge" | "explore";
  namedCharacters: Set<string>;
  nameInput: string;
  setNameInput: (value: string) => void;
  incorrectGuess: boolean;
  onNameSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  setActiveCharacter: (character: string) => void;
  setHoverCharacter: (character: string) => void;
  handleRandomCharacter: () => void;
};

export const CharacterPortraitSection: React.FC<
  CharacterPortraitSectionProps
> = ({
  shownCharacter,
  hoverCharacter,
  activeCharacter,
  mode,
  namedCharacters,
  nameInput,
  setNameInput,
  incorrectGuess,
  onNameSubmit,
  onKeyPress,
  setActiveCharacter,
  setHoverCharacter,
  handleRandomCharacter,
}) => {
  const titleText = shownCharacter
    ? mode === "explore" || namedCharacters.has(shownCharacter)
      ? formatName(shownCharacter)
      : "_ ".repeat(formatName(shownCharacter).length).trim()
    : "Click or hover any character";

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          variant="h6"
          sx={{
            height: "24px",
            color: "white",
            fontSize: (theme) => {
              if (titleText.length <= 18) return theme.typography.h6.fontSize;
              return "1rem";
            },
          }}
        >
          {titleText}
        </Typography>
        {activeCharacter && (
          <Fab
            size="small"
            onClick={() => {
              console.log("clicked");
              setActiveCharacter("");
              setHoverCharacter("");
            }}
            sx={{
              borderRadius: 1000,
              color: "white",
              visibility: shownCharacter ? "visible" : "hidden",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            <CloseRounded
              fontSize="small"
              sx={{ width: "16px", height: "16px" }}
            />
          </Fab>
        )}
      </Stack>
      {shownCharacter ? (
        <>
          <CharacterPortrait id={shownCharacter} />
          {mode === "challenge" && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <TextField
                size="small"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyPress={onKeyPress}
                placeholder="Enter name"
                sx={{
                  ".MuiInputBase-root": {
                    height: "36.5px",
                    borderRadius: "1000px 0 0 1000px",
                    border: "none !important",
                    outline: "none",
                    backgroundColor: "white",
                    "&:focus, &:hover": {
                      outline: "none",
                    },
                    "& fieldset": {
                      border: "none"
                    }
                  },
                  width: "100%",
                }}
              />
              <Button
                variant="contained"
                onClick={onNameSubmit}
                sx={{
                  borderRadius: "0 1000px 1000px 0",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                {incorrectGuess ? "Try Again" : "Submit"}
              </Button>
            </Stack>
          )}
        </>
      ) : (
        <Stack spacing={1}>
          <img
            src={tvStatic}
            style={{
              borderRadius: 30,
            }}
            height={CONTAINER_HEIGHT}
            width={CONTAINER_WIDTH}
          />
        </Stack>
      )}
      {!shownCharacter && mode === "challenge" && (
        <Button
          variant="contained"
          onClick={handleRandomCharacter}
          startIcon={<PsychologyAltRounded />}
          sx={{
            borderRadius: 1000,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          Random Character
        </Button>
      )}
    </>
  );
};
