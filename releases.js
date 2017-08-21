/**
 * Export object with links to the latest releases on GitHub.
 */
module.exports = {
  daemon: {
    sha256sums: 'https://github.com/openvcash/vcash/releases/download/0.6.0.4/vcash-0.6.0.4-sha256.asc',
    mac: 'https://github.com/openvcash/vcash/releases/download/0.6.0.4/vcashd-0.6.0.4-osx.zip',
    linux: 'https://github.com/openvcash/vcash',
    win32: 'https://github.com/openvcash/vcash/releases/download/0.6.0.4/vcashd-0.6.0.4-win32.zip',
    win64: 'https://github.com/openvcash/vcash/releases/download/0.6.0.4/vcashd-0.6.0.4-win64.zip'
  },
  electron: {
    sha256sums: 'https://github.com/openvcash/vcash-electron/releases/download/v0.33.1/SHA256SUMS.asc',
    deb: 'https://github.com/openvcash/vcash-electron/releases/download/v0.33.1/Vcash-Electron-GUI-0.33.1-linux64.deb',
    mac: 'https://github.com/openvcash/vcash-electron/releases/download/v0.33.1/Vcash-Electron-GUI-0.33.1-macOS.dmg',
    zip: 'https://github.com/openvcash/vcash-electron/releases/download/v0.33.1/Vcash-Electron-GUI-0.33.1-linux64.zip',
    win32: 'https://github.com/openvcash/vcash-electron/releases/download/v0.33.1/Vcash-Electron-GUI-0.33.1-x86.exe',
    win64: 'https://github.com/openvcash/vcash-electron/releases/download/v0.33.1/Vcash-Electron-GUI-0.33.1-x64.exe'
  },
  wxWidgets: {
    linux: 'https://github.com/openvcash/wxVcashGUI',
    mac: 'https://github.com/openvcash/vcash/releases/download/0.6.0.4/vcash-client-0.6.0.4-osx.zip',
    win64: 'https://github.com/openvcash/vcash/releases/download/0.6.0.4/vcash-client-0.6.0.4-win64.zip'
  }
}
