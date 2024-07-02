import { createContext, useContext, useState } from 'react';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [globalColor, setGlobalColor] = useState('#f95b12'); // Default color
  const [hoverConfig, setHoverConfig] = useState({
    hoverColor: '#000000', // Default hover color
    hoverDarkenFactor: 0.2, // Default darkening factor
  });

  const changeColor = (newColor) => {
    setGlobalColor(newColor);
  };

  const changeHoverConfig = (newHoverConfig) => {
    setHoverConfig((prevConfig) => ({
      ...prevConfig,
      ...newHoverConfig,
    }));
  };

  return (
    <ColorContext.Provider value={{ globalColor, hoverConfig, changeColor, changeHoverConfig }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  return useContext(ColorContext);
};
