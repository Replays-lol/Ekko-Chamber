export interface IElectronAPI {
  minimize: () => void;
  close: () => void;
  checkConnection: () => Promise<{
    length: number;
    paused: boolean;
    seeking: boolean;
    speed: number;
    time: number;
  } | false>;
  openLink: (url: string) => void;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
} 