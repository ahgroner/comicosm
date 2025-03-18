import * as React from 'react';

interface ScreenDimensions {
  width: number;
  height: number;
}

export function useScreenSize(): ScreenDimensions {
  const [dimensions, setDimensions] = React.useState<ScreenDimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
} 