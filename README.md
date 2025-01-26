# Ekko Chamber

Ekko Chamber is a desktop application that helps League of Legends players sync their team's voice communications with replay files for perfect playback. This tool is especially useful for teams and coaches reviewing gameplay footage with comms.

<img src="/src/assets/screenshot.png" alt="Ekko Chamber Screenshot" width="800"/>

## Features

- Real-time audio sync with League of Legends replay API
- Syncs pause, resume, and playback speed changes

## Download

You can download the latest version of Ekko Chamber from the [Releases](https://github.com/yourusername/ekko-chamber/releases) page.

## How to Use

1. Enable the League of Legends Replay API:
   - By default the Replay API is disabled. To start using the Replay API, enable the Replay API in the game client config by locating where your game is installed and adding the following lines to the game.cfg file:
   - Example file location: `C:\Riot Games\League of Legends\Config\game.cfg`
   - Add the following lines to the file:

```
[General]
EnableReplayApi=1
```



2. Launch Ekko Chamber and sync your comms:
   - Drop your audio file into the app
   - Navigate to a memorable moment in the replay
   - Set the audio to the same moment
   - Click "Sync"

The app will maintain perfect synchronization even when pausing, resuming, or changing playback speed in the replay.

## Development

### Prerequisites

- Node.js (v20 or higher)
- npm

### Setup

1. Clone the repository:

```bash
git clone https://github.com/replays-lol/ekko-chamber.git
cd ekko-chamber
```

2. Install dependencies:

```bash
npm install
```

3. Start the development environment:

```bash
npm run electron-dev
```

4. Build the application:

```bash
npm run electron-build
```

The built executable will be in the \`dist\` folder.

### Project Structure

```
ekko-chamber/
├── electron/ # Electron main process
│ ├── main.ts # Main entry point
│ ├── preload.ts # Preload script
│ └── tsconfig.json # Electron TypeScript config
├── src/
│ ├── components/ # React components
│ ├── context/ # React context providers
│ ├── assets/ # Images and assets
│ ├── App.tsx # Main React component
│ └── GlobalStyle.ts # Global styles
├── public/ # Static files
└── package.json # Project config
```

## Made by

Made by the team at [replays.lol](https://www.replays.lol) - for development requests join our [Discord](https://discord.gg/jZnxsgubgk)

## Disclaimer

Ekko Chamber isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.