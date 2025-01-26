import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TitleBar from './components/TitleBar';
import { GlobalStyle } from './GlobalStyle';
import { ConnectionProvider, useConnection } from './context/ConnectionContext';
import {
  AppContainer,
  Content,
  Title,
  StatusContainer,
  StatusLabel,
  StatusValue,
  UploadArea,
  UploadText,
  Instructions,
  InstructionLink,
  Disclaimer,
  MadeByContainer,
  MadeByText,
  Logo,
  AudioPlayer,
  HowToContainer,
  SyncButton,
  HowToTitle,
  ButtonContainer,
  FileInfo,
  FileName,
  RemoveButton,
  AudioContainer,
  GameStatusContainer,
  GameStatusItem,
  GameStatusValue,
  ToastLink
} from './App.styles';
import LogoImage from './assets/Logo.png';
import { checkForUpdates } from './utils/versionCheck';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const ACCEPTED_AUDIO_TYPES = [
  'audio/mpeg',  // .mp3
  'audio/wav',   // .wav
  'audio/ogg',   // .ogg
  'audio/aac',   // .aac
  'audio/m4a',   // .m4a
  'audio/flac'   // .flac
];

const AppContent: React.FC = () => {
  const {
    isConnected,
    setAudioPlayerRef,
    handleSync,
    stopSync,
    gameTime,
    playbackSpeed,
    isPlaying,
    timeDifference
  } = useConnection();
  const [isDragging, setIsDragging] = React.useState(false);
  const [audioFile, setAudioFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = useCallback((file: File) => {
    setAudioFile(file);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && ACCEPTED_AUDIO_TYPES.includes(file.type)) {
      handleChange(file);
    }
  }, [handleChange]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ACCEPTED_AUDIO_TYPES.includes(file.type)) {
      handleChange(file);
    }
  }, [handleChange]);

  const handleLinkClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.electron.openLink('https://developer.riotgames.com/docs/lol#game-client-api_replay-api');
  }, []);

  const handleLogoClick = useCallback(() => {
    window.electron.openLink('https://www.replays.lol');
  }, []);

  const handleRemove = useCallback(() => {
    setAudioFile(null);
    setAudioPlayerRef(null);
    stopSync();
  }, [setAudioPlayerRef, stopSync]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const audioFileUrl = useMemo(() => audioFile ? URL.createObjectURL(audioFile) : null, [audioFile]);

  useEffect(() => {
    console.log('fully reloaded');
  }, [audioFile]);

  useEffect(() => {
    const checkVersion = async () => {
      const updateAvailable = await checkForUpdates();
      if (updateAvailable) {
        toast((
          <div>
            <span>A new version is available!</span>{' '}
            <ToastLink
              href="https://github.com/yourusername/ekko-chamber"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download now
            </ToastLink>
          </div>
        ),
          {
            duration: 10000,
          }
        );
      };
    }

    checkVersion();
  }, []);

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <TitleBar />
        <Content>
          <Title>Ekko Chamber</Title>
          <StatusContainer>
            <StatusLabel>Replay API Status:</StatusLabel>
            <StatusValue connected={isConnected}>
              {isConnected ? 'Connected' : 'Not Connected'}
            </StatusValue>
          </StatusContainer>
          {isConnected && (
            <GameStatusContainer>
              <GameStatusItem>
                <StatusLabel>Game Time:</StatusLabel>
                <GameStatusValue>
                  {gameTime !== null ? formatTime(gameTime) : '--:--'}
                </GameStatusValue>
              </GameStatusItem>
              <GameStatusItem>
                <StatusLabel>Playback Speed:</StatusLabel>
                <GameStatusValue>{playbackSpeed}x</GameStatusValue>
              </GameStatusItem>
              <GameStatusItem>
                <StatusLabel>Status:</StatusLabel>
                <GameStatusValue>{isPlaying ? 'Playing' : 'Paused'}</GameStatusValue>
              </GameStatusItem>
              <GameStatusItem>
                <StatusLabel>Time difference between audio and replay:</StatusLabel>
                <GameStatusValue>{timeDifference !== null ? `${timeDifference.toFixed(0)}s` : '--:--'}</GameStatusValue>
              </GameStatusItem>
            </GameStatusContainer>
          )}
          {audioFile && (
            <FileInfo>
              <StatusLabel>Audio File:</StatusLabel>
              <FileName>{audioFile.name}</FileName>
            </FileInfo>
          )}
          {!audioFile ? (
            <>
              <UploadArea
                isDragging={isDragging}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={onClick}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".mp3,.wav,.ogg,.aac,.m4a,.flac"
                  onChange={onFileInputChange}
                />
                <UploadText>Drop an audio file here or click to select</UploadText>
              </UploadArea>
              <Instructions>
                Ekko Chamber is an app to sync up your team's comms with the replay file for playback.
                <br /><br />
                You must first enable the Replay API to use the app, you can find out how to do that by{' '}
                <InstructionLink onClick={handleLinkClick}>
                  clicking here
                </InstructionLink>
              </Instructions>
            </>
          ) : (
            <>
              <AudioContainer>
                <AudioPlayer
                  ref={ref => setAudioPlayerRef(ref)}
                  controls
                  src={audioFileUrl || ""}
                />
                <RemoveButton onClick={handleRemove}>Remove</RemoveButton>
              </AudioContainer>
              <ButtonContainer>
                <SyncButton onClick={timeDifference === null ? handleSync : stopSync}>
                  {timeDifference === null ? 'Sync' : 'Stop Sync'}
                </SyncButton>
              </ButtonContainer>
              <HowToContainer>
                <HowToTitle>How it works</HowToTitle>
                Set the in game replay time to a point where you know you can sync up the comms
                <br /><br />
                Set the above audio widget to the same point in the comms that matches the replay, then press Sync
              </HowToContainer>
            </>
          )}
        </Content>
        <Disclaimer>
          Ekko Chamber isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
        </Disclaimer>
        <MadeByContainer onClick={handleLogoClick}>
          <MadeByText>An app made by</MadeByText>
          <Logo src={LogoImage} alt="replays.lol" />
        </MadeByContainer>
      </AppContainer>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ConnectionProvider>
      <AppContent />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#ffffff',
            border: '1px solid #333333',
            padding: '16px',
            borderRadius: '8px',
          },
        }}
      />
    </ConnectionProvider>
  );
};

export default App; 