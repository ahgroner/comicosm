import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

type ModeToggleProps = {
  mode: 'challenge' | 'explore';
  setMode: (mode: 'challenge' | 'explore') => void;
};

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => {
  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={(_, newMode) => newMode && setMode(newMode)}
      sx={{
        width: '100%',
        '& .MuiToggleButton-root': {
          color: 'white',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
          },
        },
      }}
    >
      <ToggleButton value="challenge" sx={{ flex: 1 }}>
        Challenge
      </ToggleButton>
      <ToggleButton value="explore" sx={{ flex: 1 }}>
        Explore
      </ToggleButton>
    </ToggleButtonGroup>
  );
}; 