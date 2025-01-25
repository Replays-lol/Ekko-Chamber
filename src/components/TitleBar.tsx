import React from 'react';
import {
  TitleBarContainer,
  Title,
  WindowControls,
  Button
} from './TitleBar.styles';

const TitleBar: React.FC = () => {
  const handleMinimize = () => {
    window.electron.minimize();
  };

  const handleClose = () => {
    window.electron.close();
  };

  return (
    <TitleBarContainer>
      <Title>Ekko Chamber</Title>
      <WindowControls>
        <Button onClick={handleMinimize} color="#333">
          ─
        </Button>
        <Button onClick={handleClose} color="#c42b1c">
          ✕
        </Button>
      </WindowControls>
    </TitleBarContainer>
  );
};

export default TitleBar; 