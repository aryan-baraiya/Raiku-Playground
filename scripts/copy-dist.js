const fs = require('fs');
const path = require('path');

async function copy(src, dest) {
  const stat = await fs.promises.stat(src);
  if (stat.isDirectory()) {
    await fs.promises.mkdir(dest, { recursive: true });
    const entries = await fs.promises.readdir(src);
    for (const entry of entries) {
      await copy(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    await fs.promises.mkdir(path.dirname(dest), { recursive: true });
    await fs.promises.copyFile(src, dest);
  }
}

(async () => {
  try {
    const from = path.resolve(__dirname, '..', 'RAIKU', 'dist');
    const to = path.resolve(__dirname, '..', 'dist');
    // remove existing dest if present
    if (fs.existsSync(to)) {
      await fs.promises.rm(to, { recursive: true, force: true });
    }
    await copy(from, to);
    console.log('copied', from, '->', to);
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
})();
