import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  minimize: () => ipcRenderer.send('minimize-window'),
  close: () => ipcRenderer.send('close-window'),
  checkConnection: () => ipcRenderer.invoke('check-connection'),
  openLink: (url: string) => ipcRenderer.send('open-link', url)
}); 