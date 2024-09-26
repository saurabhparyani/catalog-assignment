import React, { createContext, useState } from "react";

interface FullscreenContextType {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const FullscreenContext = createContext<
  FullscreenContextType | undefined
>(undefined);

export const FullscreenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <FullscreenContext.Provider value={{ isFullscreen, toggleFullscreen }}>
      {children}
    </FullscreenContext.Provider>
  );
};
