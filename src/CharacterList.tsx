import { characters } from "./characters";
import { ListItem, ListItemText, Stack } from "@mui/material";

export const CharacterList = () => {
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
      {characters.map((character) => (
        <ListItem key={character}>
          <ListItemText primary={character} />
        </ListItem>
      ))}
    </Stack>
  );
};
