import React from "react";
import { characters } from "./characters";
import { ListItem, ListItemText, Stack, TextField } from "@mui/material";
export const CharacterList = () => {
  const [search, setSearch] = React.useState("");

  const filteredCharacters = search
    ? characters.filter((character) =>
        character.toLowerCase().includes(search.toLowerCase())
      )
    : characters;

  return (
    <Stack
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "300px",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Stack
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 1000,
        }}
      >
        {/* <Typography variant="h6">Characters</Typography> */}
        <TextField
          size="small"
          sx={{
            ".MuiInputBase-root": {
              borderRadius: 1000,
            },
            width: "100%",
            padding: 1,
          }}
          placeholder="Find a character"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Stack>
      {filteredCharacters.map((character) => (
        <ListItem key={character} sx={{ height: 24 }}>
          <ListItemText primary={character} />
        </ListItem>
      ))}
    </Stack>
  );
};
