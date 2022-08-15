# Electron Auto Updated App Example

## Installation

After cloning the repo use NPM to install the dependencies.

```bash
npm i
```

## Configure Electron Builder
Edit the file electron-builder.yml to configure your app info for electron-builder.

```yml
appId: com.electron-auto-update-example.app
productName: Electron-Auto-Update-Example
win:
  target:
    - nsis
nsis:
  perMachine: true
  allowElevation: true
publish:
  provider: github
  token: github_access_token
```

## Run (dev)
```bash
npm start
```
note: electron-updater functions are ignored on dev.


## build (windows)
```bash
npm run build
```

## Publish (windows)
```bash
npm run release
```
