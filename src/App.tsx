import Characters from './Characters'
import './App.css'
import * as React from 'react';
import { Stack } from '@mui/material';

function App() {
  const [hoverCharacter, setHoverCharacter] = React.useState('Pearl');

  const handleMouseOver = (e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as SVGPathElement;
    setHoverCharacter(target.className.baseVal)
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
                  stroke: 'rgb(255,242,0)',
                  strokeWidth: 3,
                }
              }: {}
            )
          }
        }}>
          <Characters onMouseOver={handleMouseOver} />
        </Stack>
        </div>
      </div>
    </>
  )
}

export default App
