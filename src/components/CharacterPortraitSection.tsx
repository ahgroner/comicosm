import React from 'react';
import { Stack, TextField, Typography, Button, Fab } from '@mui/material';
import { CloseRounded, PsychologyAltRounded } from '@mui/icons-material';
import { CharacterPortrait, CONTAINER_HEIGHT, CONTAINER_WIDTH } from '../CharacterPortrait';
import { formatName } from '../utils';
import tvStatic from '../assets/tv-static.gif';

type CharacterPortraitSectionProps = {
  shownCharacter: string;
  mode: 'challenge' | 'explore';
  namedCharacters: Set<string>;
  nameInput: string;
  setNameInput: (value: string) => void;
  incorrectGuess: boolean;
  onNameSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  setActiveCharacter: (character: string) => void;
  handleRandomCharacter: () => void;
};

export const CharacterPortraitSection: React.FC<CharacterPortraitSectionProps> = ({
  shownCharacter,
  mode,
  namedCharacters,
  nameInput,
  setNameInput,
  incorrectGuess,
  onNameSubmit,
  onKeyPress,
  setActiveCharacter,
  handleRandomCharacter,
}) => {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          {shownCharacter
            ? mode === 'explore' || namedCharacters.has(shownCharacter)
              ? formatName(shownCharacter)
              : "_ ".repeat(formatName(shownCharacter).length).trim()
            : "COMICOSM 2"}
        </Typography>
        <Fab
          size="small"
          onClick={() => setActiveCharacter("")}
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
      </Stack>
      {shownCharacter ? (
        <>
          <CharacterPortrait id={shownCharacter} />
          {mode === 'challenge' && (
            <>
              <TextField
                size="small"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyPress={onKeyPress}
                placeholder="Type the character's name..."
                sx={{
                  ".MuiInputBase-root": {
                    borderRadius: 1000,
                    backgroundColor: "white",
                  },
                  width: "100%",
                }}
              />
              <Button
                variant="contained"
                onClick={onNameSubmit}
                sx={{
                  borderRadius: 1000,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                {incorrectGuess ? "Try Again" : "Submit Name"}
              </Button>
            </>
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
      {!shownCharacter && mode === 'challenge' && (
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