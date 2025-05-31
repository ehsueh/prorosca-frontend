const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');

// Define the icon sizes we need
const ICONS = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon.ico', size: 32 },
  { name: 'logo192.png', size: 192 },
  { name: 'logo512.png', size: 512 },
  { name: 'logo192-maskable.png', size: 192 },
  { name: 'apple-touch-icon.png', size: 180 },
];

async function generateIcons() {
  // Create a simple green P icon
  const size = 512;
  const backgroundColor = { r: 34, g: 197, b: 94, alpha: 1 }; // Tailwind green-500
  
  // Create a blank canvas with the background color
  const baseImage = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: backgroundColor
    }
  })
  .png()
  .toBuffer();

  // Generate each icon size
  for (const icon of ICONS) {
    const outputPath = path.join(PUBLIC_DIR, icon.name);
    
    if (icon.name === 'favicon.ico') {
      // For ICO files, we need to use a special format
      await sharp(baseImage)
        .resize(icon.size, icon.size)
        .toFormat('png')
        .toBuffer()
        .then(buffer => {
          const ico = require('png-to-ico');
          return ico(buffer);
        })
        .then(buf => {
          fs.writeFileSync(outputPath, buf);
        });
    } else if (icon.name === 'logo192-maskable.png') {
      // For maskable icons, add padding to ensure safe zone
      await sharp(baseImage)
        .resize(icon.size, icon.size, { 
          fit: 'contain',
          background: backgroundColor
        })
        .toFile(outputPath);
    } else {
      // For regular PNG icons
      await sharp(baseImage)
        .resize(icon.size, icon.size)
        .toFile(outputPath);
    }
  }

  console.log('✅ Generated all icons successfully!');
}

generateIcons().catch(console.error); 