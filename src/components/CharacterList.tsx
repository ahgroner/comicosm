import React from 'react';
import { ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { uniqueCharacters } from '../characters';
import { formatName } from '../utils';

type CharacterListProps = {
  search: string;
  setSearch: (value: string) => void;
  mode: 'challenge' | 'explore';
  namedCharacters: Set<string>;
  setHoverCharacter: (character: string) => void;
  setActiveCharacter: (character: string) => void;
};

export const CharacterList: React.FC<CharacterListProps> = ({
  search,
  setSearch,
  mode,
  namedCharacters,
  setHoverCharacter,
  setActiveCharacter,
}) => {
  const filteredCharacters = search
    ? uniqueCharacters.filter((character) =>
        formatName(character).toLowerCase().includes(search.toLowerCase())
      )
    : uniqueCharacters;

  return (
    <>
      <Typography
        variant="body2"
        sx={{ color: "white", textAlign: "center" }}
      >
        {namedCharacters.size}/{uniqueCharacters.length} characters found
      </Typography>
      <TextField
        size="small"
        sx={{
          ".MuiInputBase-root": {
            borderRadius: 1000,
            backgroundColor: "white",
          },
          px: 1,
          width: "100%",
        }}
        placeholder="Search for characters"
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredCharacters.map((character) => (
        <ListItem
          key={character}
          // onMouseEnter={() => setHoverCharacter(character)}
          // onMouseLeave={() => setHoverCharacter("")}
          onClick={() => setActiveCharacter(character)}
          sx={{
            cursor: "pointer",
            height: 24,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
            opacity: mode === 'explore' || namedCharacters.has(character) ? 1 : 0.5,
          }}
        >
          <ListItemText
            primary={
              mode === 'explore' || namedCharacters.has(character)
                ? formatName(character)
                : "_ ".repeat(formatName(character).length).trim()
            }
          />
        </ListItem>
      ))}
    </>
  );
}; 