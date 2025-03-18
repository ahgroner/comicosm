import React from "react";
import { Stack } from "@mui/material";
import { SIDEBAR_WIDTH } from "./constants";
import { ModeToggle } from "./components/ModeToggle";
import { CharacterPortraitSection } from "./components/CharacterPortraitSection";
import { CharacterList } from "./components/CharacterList";
import { uniqueCharacters } from "./characters";
import { formatName } from "./utils";
import {
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Button,
  Fab,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  CharacterPortrait,
  CONTAINER_HEIGHT,
  CONTAINER_WIDTH,
} from "./CharacterPortrait";
import tvStatic from "./assets/tv-static.gif";
import {
  CloseRounded,
  PsychologyAltRounded,
} from "@mui/icons-material";

type SidebarProps = {
  hoverCharacter: string;
  activeCharacter: string;
  setActiveCharacter: (character: string) => void;
  setHoverCharacter: (character: string) => void;
  namedCharacters: Set<string>;
  setNamedCharacters: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export const Sidebar: React.FC<SidebarProps> = ({
  hoverCharacter,
  activeCharacter,
  setActiveCharacter,
  setHoverCharacter,
  namedCharacters,
  setNamedCharacters,
}) => {
  const [search, setSearch] = React.useState("");
  const [nameInput, setNameInput] = React.useState("");
  const [incorrectGuess, setIncorrectGuess] = React.useState(false);
  const [mode, setMode] = React.useState<'challenge' | 'explore'>('challenge');

  const shownCharacter = hoverCharacter || activeCharacter;

  // Reset incorrectGuess when character changes
  React.useEffect(() => {
    setIncorrectGuess(false);
    setNameInput("");
  }, [shownCharacter]);

  const handleRandomCharacter = () => {
    const unnamedCharacters = uniqueCharacters.filter(
      (char) => !namedCharacters.has(char)
    );
    if (unnamedCharacters.length === 0) return;
    const randomIndex = Math.floor(Math.random() * unnamedCharacters.length);
    setActiveCharacter(unnamedCharacters[randomIndex]);
  };

  const handleNameSubmit = () => {
    if (!shownCharacter) return;
    const correctName = formatName(shownCharacter);
    if (nameInput.trim().toLowerCase() === correctName.toLowerCase()) {
      setNamedCharacters((prev) => new Set([...prev, shownCharacter]));
      setNameInput("");
      setIncorrectGuess(false);
    } else {
      setIncorrectGuess(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameSubmit();
    }
  };

  return (
    <Stack
      sx={{
        position: "absolute",
        backgroundColor: (theme) => theme.palette.primary.main,
        backgroundOpacity: 0.0,
        ":hover": {
          backgroundOpacity: 1,
        },
        color: "white",
        top: 0,
        right: 0,
        width: SIDEBAR_WIDTH,
        height: "100vh",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(255, 255, 255, 0.1)",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(255, 255, 255, 0.3)",
          "&:hover": {
            background: "rgba(255, 255, 255, 0.5)",
          },
        },
      }}
    >
      <Stack
        sx={{
          gap: 1,
          p: 1,
          position: "sticky",
          backgroundColor: (theme) => theme.palette.primary.main,
          top: 0,
          zIndex: 1000,
        }}
      >
        <ModeToggle mode={mode} setMode={setMode} />
        <CharacterPortraitSection
          shownCharacter={shownCharacter}
          mode={mode}
          namedCharacters={namedCharacters}
          nameInput={nameInput}
          setNameInput={setNameInput}
          incorrectGuess={incorrectGuess}
          onNameSubmit={handleNameSubmit}
          onKeyPress={handleKeyPress}
          setActiveCharacter={setActiveCharacter}
          handleRandomCharacter={handleRandomCharacter}
        />
      </Stack>
      <CharacterList
        search={search}
        setSearch={setSearch}
        mode={mode}
        namedCharacters={namedCharacters}
        setHoverCharacter={setHoverCharacter}
        setActiveCharacter={setActiveCharacter}
      />
    </Stack>
  );
};
