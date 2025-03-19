import React from "react";
import {
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { uniqueCharacters } from "../characters";
import { formatName } from "../utils";
import { characters } from "../characters";

type CharacterListProps = {
  search: string;
  setSearch: (value: string) => void;
  mode: "challenge" | "explore";
  namedCharacters: Set<string>;
  setHoverCharacter: (character: string) => void;
  setActiveCharacter: (character: string) => void;
};

export const CharacterList: React.FC<CharacterListProps> = ({
  search,
  setSearch,
  mode,
  namedCharacters,
  // setHoverCharacter,
  setActiveCharacter,
}) => {
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const isInitialRender = React.useRef(true);

  React.useEffect(() => {
    isInitialRender.current = false;
  }, []);

  // Get unique tags and their counts
  const tagCounts = React.useMemo(() => {
    const counts = new Map<string, { total: number; found: number }>();

    characters.forEach((char) => {
      char.tags.forEach((tag) => {
        if (!counts.has(tag)) {
          counts.set(tag, { total: 0, found: 0 });
        }
        const count = counts.get(tag)!;
        count.total++;
        if (namedCharacters.has(char.name)) {
          count.found++;
        }
      });
    });

    return counts;
  }, [namedCharacters]);

  // Filter characters by both search and tag
  const filteredCharacters = React.useMemo(() => {
    return uniqueCharacters.filter((character) => {
      const matchesSearch =
        !search ||
        formatName(character).toLowerCase().includes(search.toLowerCase());

      const matchesTag =
        !selectedTag ||
        characters
          .find((c) => c.name === character)
          ?.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [search, selectedTag]);

  return (
    <>
      {mode === "challenge" && (
        <Typography
          key={namedCharacters.size}
          variant="h6"
          sx={{
            color: "white",
            textAlign: "center",
            animation: isInitialRender.current
              ? "none"
              : "pulse 0.5s ease-in-out",
            "@keyframes pulse": {
              "0%": {
                transform: "scale(1)",
                color: "white",
              },
              "50%": {
                transform: "scale(1.1)",
                color: "#FFD700", // bright yellow
              },
              "100%": {
                transform: "scale(1)",
                color: "white",
              },
            },
          }}
        >
          {namedCharacters.size}/{uniqueCharacters.length} characters found
        </Typography>
      )}
      {/* Tag filters */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          flexWrap: "wrap",
          gap: "2px",
          px: 1,
          py: 2,
        }}
      >
        {Array.from(tagCounts.entries()).map(([tag, counts]) => {
          const selected = selectedTag === tag;
          return (
            <Chip
              key={tag}
              label={`${tag} ${
                mode === "challenge"
                  ? `${counts.found}/${counts.total}`
                  : `(${counts.total})`
              }`}
              onClick={() => setSelectedTag(selected ? null : tag)}
              onDelete={selected ? () => setSelectedTag(null) : undefined}
              deleteIcon={<></>}
              sx={{
                fontSize: "12px",
                padding: 0,
                backgroundColor: selected
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(255, 255, 255, 0)",
                borderRadius: "4px",
                border: selected
                  ? "1px solid rgba(255,255,255,1)"
                  : "1px solid rgba(255,255,255,0.3)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            />
          );
        })}
      </Stack>

      {/* Search input */}
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

      {/* Character list */}
      {filteredCharacters.map((character, index) => (
        <ListItem
          key={index}
          onClick={() => {
            console.log("clicked", character);
            setActiveCharacter(character);
          }}
          sx={{
            cursor: "pointer",
            height: 24,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
            opacity:
              mode === "explore" || namedCharacters.has(character) ? 1 : 0.5,
          }}
        >
          <ListItemText
            primary={
              mode === "explore" || namedCharacters.has(character)
                ? formatName(character)
                : "_ ".repeat(formatName(character).length).trim()
            }
          />
        </ListItem>
      ))}
    </>
  );
};
