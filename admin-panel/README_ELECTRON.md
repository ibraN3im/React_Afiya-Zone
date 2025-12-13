Electron Build Instructions
===========================

This file explains how to run the Admin Panel as a desktop application (Windows .exe) using Electron and electron-builder.

Requirements
- Node.js >= 18
- npm
- Windows (for a Windows .exe build), but dev/preview works on any platform

Install and run locally
-----------------------
1. Open a terminal in `admin-panel` directory.
2. Install dependencies:

```bash
npm install
```

3. Run in dev mode (runs vite dev server and electron):

```bash
npm run electron:dev
```

Build a Windows .exe (portable)
-------------------------------
The packaging uses `electron-builder` to generate a Windows portable exe. It will:

1. Generate `icon.ico` and `icon.png` from your logo using one of the supported input locations:

- `admin-panel/assets/logo.svg` (preferred vector)
- `admin-panel/assets/logo.png`
- `admin-panel/src/logo/afiya-logo.jpg` (legacy JPG logo)
- `admin-panel/src/logo/afiya-logo.png`

Use:

```bash
npm run generate:icons
```

2. Run `npm run build` to generate the Vite `dist` artifacts
2. Package the `dist` and electron scripts into an executable

Run the following in `admin-panel`:

```bash
npm run electron:build
```
The resulting installer/exe will be in `admin-panel/dist_electron`.

Notes
- If you prefer an installer or MSI, adjust the `target` in `package.json#build.win.target`.
- Electron and electron-builder versions are set in `package.json`, update them if needed.
- You must run `npm install` to fetch the dev dependencies: electron, electron-builder, wait-on, and concurrently.
 - You must run `npm install` to fetch the dev dependencies: electron, electron-builder, wait-on, concurrently, sharp and png-to-ico.
 - `npm run electron:build` will now run `npm run generate:icons` automatically before building.
 - Note: Building a Windows executable with `electron-builder` may require Administrator privileges on the build machine to extract and run necessary native tools (e.g., 7zip). If a build fails with permission errors, run the build command from an elevated (Administrator) PowerShell.
 - Fallback: If `electron-builder` fails due to permission/signing issues, use `electron-packager` fallback which produces a standalone EXE (un-signed) without needing additional privileges:

```bash
npm run electron:pack
```

The resulting portable app will be in `admin-panel/dist_electron/pack/Afiya Zone Admin Panel-win32-x64` (or similar). This is a complete unpacked app folder with an EXE you can run or ZIP for distribution.
 - If you placed your logo in `admin-panel/src/logo/afiya-logo.jpg`, it will be used automatically by `generate:icons`.
