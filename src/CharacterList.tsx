import React from "react";
import { uniqueCharacters } from "./characters";
import {
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  CharacterPortrait,
  CONTAINER_HEIGHT,
  CONTAINER_WIDTH,
} from "./CharacterPortrait";
import { formatName } from "./utils";
import tvStatic from "./assets/tv-static.gif";
import { SIDEBAR_WIDTH } from "./constants";

type CharacterListProps = {
  hoverCharacter: string;
  activeCharacter: string;
  setActiveCharacter: (character: string) => void;
  setHoverCharacter: (character: string) => void;
};

export const CharacterList: React.FC<CharacterListProps> = ({
  hoverCharacter,
  activeCharacter,
  setActiveCharacter,
  setHoverCharacter,
}) => {
  const [search, setSearch] = React.useState("");

  const filteredCharacters = search
    ? uniqueCharacters.filter((character) =>
        formatName(character).toLowerCase().includes(search.toLowerCase())
      )
    : uniqueCharacters;

  const shownCharacter = hoverCharacter || activeCharacter;

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
          p: 1,
          position: "sticky",
          backgroundColor: (theme) => theme.palette.primary.main,
          top: 0,
          zIndex: 1000,
        }}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          {shownCharacter ? formatName(shownCharacter) : "COMICOSM 2"}
        </Typography>
        {shownCharacter ? (
          <>
            <CharacterPortrait id={shownCharacter} />
          </>
        ) : (
          <img
            src={tvStatic}
            style={{
              borderRadius: 30,
            }}
            height={CONTAINER_HEIGHT}
            width={CONTAINER_WIDTH}
          />
        )}
        <TextField
          size="small"
          sx={{
            ".MuiInputBase-root": {
              borderRadius: 1000,
              backgroundColor: "white",
            },
            width: "100%",
            padding: 1,
          }}
          placeholder="Search for characters"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Stack>
      {filteredCharacters.map((character) => (
        <ListItem
          key={character}
          onMouseEnter={() => setHoverCharacter(character)}
          onMouseLeave={() => setHoverCharacter(null)}
          onClick={() => setActiveCharacter(character)}
          sx={{
            cursor: "pointer",
            height: 24,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <ListItemText primary={formatName(character)} />
        </ListItem>
      ))}
    </Stack>
  );
};
