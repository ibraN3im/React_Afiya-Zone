import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Jimp from 'jimp';
import pngToIco from 'png-to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, '..', 'assets');
const svgPath = path.join(assetsDir, 'logo.svg');
const svgPathsFallback = [
    path.join(assetsDir, 'logo.svg'),
    path.join(assetsDir, 'logo.svg'),
    path.join(__dirname, '..', 'src', 'logo', 'afiya-logo.svg'),
];
const pngPathsFallback = [
    path.join(assetsDir, 'logo.png'),
    path.join(__dirname, '..', 'src', 'logo', 'afiya-logo.png'),
];
const jpgPathsFallback = [
    path.join(__dirname, '..', 'src', 'logo', 'afiya-logo.jpg'),
    path.join(__dirname, '..', 'src', 'logo', 'afiya-logo.jpeg'),
];
const pngPath = path.join(assetsDir, 'icon.png');
const icoPath = path.join(assetsDir, 'icon.ico');

async function generate() {
    // Find a source image: prefer PNG, then JPG, then SVG
    let sourcePath = null;
    // check png paths
    for (const p of pngPathsFallback) {
        if (fs.existsSync(p)) { sourcePath = p; break; }
    }
    // check jpg paths
    if (!sourcePath) {
        for (const p of jpgPathsFallback) {
            if (fs.existsSync(p)) { sourcePath = p; break; }
        }
    }
    // check svg paths as last resort (jimp can't parse svg)
    if (!sourcePath) {
        for (const p of svgPathsFallback) {
            if (fs.existsSync(p)) { sourcePath = p; break; }
        }
    }

    if (!sourcePath) {
        console.error('No logo found. Place admin logo in one of these locations:');
        console.error('  admin-panel/assets/logo.svg');
        console.error('  admin-panel/assets/logo.png');
        console.error('  admin-panel/src/logo/afiya-logo.jpg');
        console.error('  admin-panel/src/logo/afiya-logo.png');
        process.exit(1);
    }

    // Ensure assets directory exists
    if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

    // Generate a 256x256 PNG from the source using Jimp (supports JPG/PNG)
    let image;
    if (sourcePath.endsWith('.svg')) {
        console.warn('SVG source detected. Jimp cannot parse SVG; trying to require sharp for SVG conversion.');
        try {
            const sharp = await import('sharp');
            await sharp.default(sourcePath).resize(256, 256).png().toFile(pngPath);
            // read the file back with Jimp for further steps
            image = await Jimp.read(pngPath);
        } catch (err) {
            console.error('SVG conversion to PNG failed. Please provide PNG/JPG instead or install sharp. Error:', err);
            process.exit(1);
        }
    } else {
        image = await Jimp.read(sourcePath);
    }
    image.resize(256, 256);
    await image.quality(90).writeAsync(pngPath);

    // Generate ico from PNG (supports multiple sizes if needed). The png-to-ico library can accept multiple sized pngs, but we'll generate standard 256x256.
    const pngBuffer = fs.readFileSync(pngPath);
    const icoBuffer = await pngToIco(pngBuffer);
    fs.writeFileSync(icoPath, icoBuffer);
    console.log('Generated icon files:', pngPath, icoPath);
}

generate().catch((err) => {
    console.error('Icon generation error:', err);
    process.exit(1);
});
