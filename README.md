# Paraline

A Windows desktop overlay application that displays real-time audio visualization in a transparent, frameless window. Built with Electron for the frontend and .NET 8 for native Windows audio capture.

## Features

- ✨ Transparent, frameless, always-on-top overlay window
- 🎵 Real-time audio level visualization using Windows WASAPI loopback capture
- 🎨 Multiple color themes (Blue, Purple, Warm)
- 🖱️ Mouse click-through behavior (clicks pass to underlying windows)
- 🎯 Full-screen canvas animation at 30 FPS
- 📊 RMS (Root Mean Square) loudness calculation
- 🔄 Automatic fallback to simulated audio if helper not available
- 🔒 Secure IPC communication with context isolation

## Tech Stack

### Frontend
- **Electron 37.0.0** - Desktop application framework
- **HTML5 Canvas** - Real-time graphics rendering
- **Vanilla JavaScript** - Lightweight, no frameworks
- **CSS3** - Styling and transparency effects

### Backend
- **Node.js** - Electron main process
- **.NET 8.0 / C# 11** - Native audio capture helper

### Native Audio
- **Windows WASAPI** - System audio capture API
- **COM Interop** - Windows audio device access
- **PCM Audio Formats** - Float32, PCM16, PCM24, PCM32 support

## Project Structure

```
Paraline/
├── main.js                    # Electron main process (window management, IPC)
├── renderer.js                # Canvas visualization logic & themes
├── preload.js                 # Secure IPC bridge (context isolation)
├── index.html                 # Minimal HTML with canvas element
├── styles.css                 # Transparent overlay styling
├── audioBridge.js             # Spawns & manages C# audio helper process
├── package.json               # Node.js dependencies & scripts
├── Paraline.sln               # Visual Studio solution file
└── audio-helper/              # C# audio capture helper
    ├── Program.cs             # WASAPI loopback capture implementation
    ├── Paraline.AudioBridge.csproj
    ├── bin/                   # Compiled binaries
    └── obj/                   # Build artifacts 
```

## Installation

### Prerequisites

- **Windows 10/11**
- **Node.js 18+** (for npm)
- **.NET 8.0 SDK** (for building C# helper)

### Setup

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd Paraline
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Build the C# audio helper:
   ```bash
   dotnet build .\audio-helper\Paraline.AudioBridge.csproj
   ```

## Running the App

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Architecture

### Audio Pipeline

```
System Audio Output
    ↓
Windows WASAPI (Loopback Capture)
    ↓
C# Helper Process (Paraline.AudioBridge.exe)
    ↓
JSON over stdout: {"type": "level", "value": 0.5}
    ↓
Node.js Child Process (audioBridge.js)
    ↓
IPC Message (audio-level)
    ↓
Renderer Process (renderer.js)
    ↓
Canvas Visualization
```

### Key Components

- **main.js** - Manages overlay window lifecycle, starts audio bridge, sends level data to renderer
- **audioBridge.js** - Spawns C# helper, parses JSON audio data, handles errors & fallback
- **preload.js** - Exposes secure IPC methods: `onLevel()`, `getStatus()`
- **renderer.js** - Listens to audio levels, animates canvas visualization
- **Program.cs** - Captures system audio, calculates RMS levels, outputs JSON @ 30 FPS

## Theme Presets

Configure theme via URL query parameter:

```
theme=blue      (default)
theme=purple
theme=warm
```

The themes are defined in `renderer.js` with custom RGB values for:
- Top/bottom line colors
- Glow effects
- Atmospheric haze

## Build Output

After building the C# project, the audio helper executable is located at:
```
audio-helper/bin/Debug/net8.0-windows/Paraline.AudioBridge.exe
```

## Status & Debugging

Query the current audio source with:
```javascript
const status = await window.audioBridge.getStatus();
// Returns: {mode: "helper", reason: "C# helper process connected."}
// or:     {mode: "simulated", reason: "...error message..."}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Audio not showing | Check Task Manager for `Paraline.AudioBridge.exe` process |
| Helper binary not found | Build C# project: `dotnet build .\audio-helper\Paraline.AudioBridge.csproj` |
| Window appearing behind other windows | Close and reopen the app |
| Performance issues | Reduce canvas resolution in styles.css |



