const { app } = require("electron");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

function createAudioBridge(sendLevel, onStatusChange = () => {}) {
  let helperProcess = null;

  let helperStatus = {
    mode: "simulated",
    reason: "Helper not started yet."
  };

  let lastStatusUpdate = 0;

  let retryCount = 0;
  const MAX_RETRIES = 3;

  let helperReady = false;
  let stdoutBuffer = "";
  const MAX_STDOUT_BUFFER_BYTES = 64 * 1024;

  function updateStatus(nextStatus) {
    if (
      helperStatus.mode === nextStatus.mode &&
      helperStatus.reason === nextStatus.reason
    ) {
      return false;
    }

    helperStatus = nextStatus;
    onStatusChange(helperStatus);
    return true;
  }

  function findHelperBinary() {
    const appPath = app.getAppPath();

    const candidates = [
      path.join(process.resourcesPath, "audio-helper", "Paraline.AudioBridge.exe"),
      path.join(appPath, "build", "audio-helper", "Paraline.AudioBridge.exe"),
      path.join(appPath, "audio-helper", "bin", "Release", "net8.0-windows", "win-x64", "publish", "Paraline.AudioBridge.exe"),
      path.join(appPath, "audio-helper", "bin", "Debug", "net8.0-windows", "Paraline.AudioBridge.exe"),
      path.join(appPath, "audio-helper", "bin", "Release", "net8.0-windows", "Paraline.AudioBridge.exe")
    ];

    return candidates.find((p) => fs.existsSync(p)) || null;
  }

  function start() {
    const helperBinary = findHelperBinary();

    if (!helperBinary) {
      updateStatus({
        mode: "simulated",
        reason:
          "Audio capture helper not found.\n" +
          "- Build C# helper first\n" +
          "- Or run npm run build:helper"
      });
      return;
    }

    helperReady = false;
    stdoutBuffer = "";

    helperProcess = spawn(helperBinary, [], {
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"]
    });

    helperProcess.stdout.on("data", (chunk) => {
      stdoutBuffer += chunk.toString();

      if (stdoutBuffer.length > MAX_STDOUT_BUFFER_BYTES) {
        stdoutBuffer = "";
        console.warn("stdout buffer cleared due to overflow");
        return;
      }

      const lines = stdoutBuffer.split(/\r?\n/);
      stdoutBuffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const message = JSON.parse(line);

          if (!helperReady) {
            helperReady = true;
            retryCount = 0;

            updateStatus({
              mode: "helper",
              reason: "C# helper process connected."
            });
          }

          if (message.type === "level" && typeof message.value === "number") {
            sendLevel(message.value);
          }
        } catch {
          console.warn("Invalid helper message received");
        }
      }
    });

    helperProcess.stderr.on("data", (chunk) => {
      const errorMessage = chunk.toString().trim();
      console.error(errorMessage);

      const now = Date.now();

      if (now - lastStatusUpdate < 1000) return;

      lastStatusUpdate = now;

      updateStatus({
        mode: "helper-error",
        reason:
          "Audio helper error: " +
          (errorMessage || "unknown error")
      });
    });

    helperProcess.on("exit", (code) => {
      helperProcess = null;

      if (retryCount < MAX_RETRIES) {
        retryCount++;

        updateStatus({
          mode: "reconnecting",
          reason: `Helper crashed. Restarting ${retryCount}/${MAX_RETRIES}`
        });

        setTimeout(() => {
          start();
        }, 2000);

        return;
      }

      updateStatus({
        mode: "simulated",
        reason:
          `Audio helper stopped permanently (exit ${code}).\n` +
          "Max retry limit reached."
      });
    });
  }

  function stop() {
    if (helperProcess) {
      helperProcess.kill();
      helperProcess = null;
    }

    updateStatus({
      mode: "simulated",
      reason: "Helper stopped."
    });
  }

  function getStatus() {
    return helperStatus;
  }

  return {
    start,
    stop,
    getStatus
  };
}

module.exports = {
  createAudioBridge
};