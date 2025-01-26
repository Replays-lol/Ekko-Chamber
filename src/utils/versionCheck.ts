interface VersionResponse {
  version: string;
}

export const CURRENT_VERSION = '1.0.0'; // TODO: automate updating this from the package.json file

export async function checkForUpdates(): Promise<boolean> {
  try {
    console.log('curr version', CURRENT_VERSION);
    const response = await fetch('https://ekko-chamber.replays-lol.workers.dev/version');
    const data: VersionResponse = await response.json();
    
    const currentParts = CURRENT_VERSION.split('.').map(Number);
    const latestParts = data.version.split('.').map(Number);
    
    for (let i = 0; i < 3; i++) {
      if (latestParts[i] > currentParts[i]) return true;
      if (latestParts[i] < currentParts[i]) return false;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to check for updates:', error);
    return false;
  }
} 