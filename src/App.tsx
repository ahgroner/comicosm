import comicosm2 from './assets/comicosm2.jpg'
import Characters from './Characters'
import './App.css'
import * as React from 'react';
import { Stack } from '@mui/material';

function App() {
  const [hoverCharacter, setHoverCharacter] = React.useState('Pearl');

  const handleMouseOver = (e) => {
    // setHoverCharacter(e.target.className.baseVal)
  }

  return (
    <>
      <div>
        <div style={{ position: 'absolute'}}>
        <Stack sx={{
          path: {
            strokeWidth: 0,
            fill: 'rgba(0,0,0,0)',
            ...(hoverCharacter ? 
              {
                [`&.${hoverCharacter}`]: {
                  fill: 'rgb(251, 230, 2)',
                  boxShadow: '0px 0px 40px 8px rgba(255,242,0,1)'
                }
              }: {}
            )
          }
        }}>
          <Characters onMouseOver={handleMouseOver} />
        </Stack>
        </div>
          <img src={comicosm2} width={4096} height={3186} alt="React logo" />
      </div>
    </>
  )
}

export default App
