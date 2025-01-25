import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { IElectronAPI } from '../electron';

interface ConnectionContextType {
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  audioPlayerRef: React.RefObject<HTMLAudioElement>;
  setAudioPlayerRef: (ref: HTMLAudioElement | null) => void;
  timeDifference: number | null;
  handleSync: () => Promise<void>;
  gameTime: number | null;
  playbackSpeed: number;
  isPlaying: boolean;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

const checkConnection = async (signal: AbortSignal): Promise<ReturnType<IElectronAPI['checkConnection']>> => {
  try {
    const result = await window.electron.checkConnection();
    return result;
  } catch {
    return false;
  }
};

export const ConnectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [timeDifference, setTimeDifference] = useState<number | null>(null);
  const [gameTime, setGameTime] = useState<number | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const pollInterval = useRef<NodeJS.Timeout | null>(null);

  const setAudioPlayerRef = (element: HTMLAudioElement | null) => {
    if (element) {
      audioPlayerRef.current = element;
    } else {
      audioPlayerRef.current = null;
    }
  };

  const checkSync = (time: number, speed: number, paused: boolean) => {
    console.log('called check sync');
    if (timeDifference !== null && audioPlayerRef.current) {
      console.log('time diff', timeDifference);
      const currTime = audioPlayerRef.current.currentTime;
      const expectedTimeOfAudio = time - timeDifference;
      console.log('curr time', currTime, 'expected time', expectedTimeOfAudio, 'time', time, 'timediff', timeDifference);
      if (Math.abs(audioPlayerRef.current.currentTime - expectedTimeOfAudio) > 2) {
        audioPlayerRef.current.currentTime = expectedTimeOfAudio;
        console.log('Synced! Difference:', expectedTimeOfAudio);
      }
      console.log('paused', paused, 'audio paused', audioPlayerRef.current.paused);
      if (audioPlayerRef.current.paused !== paused) {
        console.log('changing status');
        if(paused) {
          audioPlayerRef.current.pause();
        } else {
          audioPlayerRef.current.play();
        }
      }
      if (audioPlayerRef.current.playbackRate !== speed) {
        audioPlayerRef.current.playbackRate = speed;
      }
    }
  }

  const startPolling = useCallback(() => {
    if (pollInterval.current) {
      clearInterval(pollInterval.current);
    }

    pollInterval.current = setInterval(async () => {
      try {
        const replayData = await window.electron.checkConnection();
        if (replayData) {
          console.log('replay data', replayData, replayData.time);
          setGameTime(replayData.time);
          setPlaybackSpeed(replayData.speed);
          setIsPlaying(!replayData.paused);

          checkSync(replayData.time, replayData.speed, replayData.paused);

        } else {
          // If replayData is false, connection is lost
          setIsConnected(false);
          stopPolling();
        }
      } catch (error) {
        console.error('Polling error:', error);
        stopPolling();
        setIsConnected(false);
      }
    }, 250);
  }, []);

  const stopPolling = useCallback(() => {
    if (pollInterval.current) {
      clearInterval(pollInterval.current);
      pollInterval.current = null;
    }
  }, []);

  // Watch for connection status changes
  useEffect(() => {
    if (!isConnected) {
      stopPolling();
    }
  }, [isConnected, stopPolling]);

  const handleSync = async () => {
    if (!isConnected) {
      alert('Please ensure the Replay API is connected before syncing');
      return;
    }

    try {
      const replayData = await window.electron.checkConnection();
      if (!replayData || !audioPlayerRef.current) {
        return;
      }

      const audioTime = audioPlayerRef.current.currentTime;
      const replayTime = replayData.time;
      
      console.log('audio time', audioTime, 'replay time', replayTime);
      const difference = replayTime - audioTime;
      setTimeDifference(difference);
      
      // Start polling after successful sync
      startPolling();
      
      console.log('Synced! Difference:', difference);
    } catch (error) {
      console.error('Failed to sync:', error);
      alert('Failed to sync with replay. Please try again.');
    }
  };

  useEffect(() => {
    let mounted = true;

    const checkStatus = async () => {
      try {
        const connected = await checkConnection(new AbortController().signal);
        if (mounted) {
          setIsConnected(connected !== false && !isNaN(connected.time));
        }
      } catch (error) {
        if (mounted) {
          setIsConnected(false);
        }
      }
    };

    // Initial check
    checkStatus();

    // Set up interval for checking every 5 seconds
    const interval = setInterval(checkStatus, 5000);

    // Cleanup
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isConnected && !pollInterval.current) {
      startPolling();
    } else {
      stopPolling();
    }
  }, [startPolling, stopPolling, isConnected]);

  return (
    <ConnectionContext.Provider value={{ 
      isConnected, 
      setIsConnected,
      audioPlayerRef,
      setAudioPlayerRef,
      timeDifference,
      handleSync,
      gameTime,
      playbackSpeed,
      isPlaying
    }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error('useConnection must be used within a ConnectionProvider');
  }
  return context;
}; 