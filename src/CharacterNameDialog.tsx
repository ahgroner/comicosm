import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { formatName } from "./utils";

type CharacterNameDialogProps = {
  open: boolean;
  character: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
};

export const CharacterNameDialog: React.FC<CharacterNameDialogProps> = ({
  open,
  character,
  onClose,
  onSubmit,
}) => {
  const [input, setInput] = React.useState("");
  const correctName = formatName(character);

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === correctName.toLowerCase()) {
      onSubmit(character);
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Name That Character!</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Enter the name of the character you clicked on:
        </Typography>
        <TextField
          autoFocus
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type the character's name..."
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 