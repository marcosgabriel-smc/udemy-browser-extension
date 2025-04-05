/**
 * Simple build script for Firefox extension
 * 
 * This script creates a zip file that can be renamed to .xpi for Firefox installation
 * 
 * Usage:
 * 1. Make sure you have Node.js installed
 * 2. Run: node build.js
 * 3. The output will be a file named 'udemy-course-time-tracker.xpi'
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create a file to stream archive data to
const output = fs.createWriteStream(path.join(__dirname, 'udemy-course-time-tracker.xpi'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log(`Archive created: ${archive.pointer()} total bytes`);
});

// Handle warnings and errors
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files to the archive
archive.file(path.join(__dirname, 'manifest.json'), { name: 'manifest.json' });
archive.file(path.join(__dirname, 'content.js'), { name: 'content.js' });
archive.file(path.join(__dirname, 'styles.css'), { name: 'styles.css' });

// Add icons if they exist
if (fs.existsSync(path.join(__dirname, 'icon48.png'))) {
  archive.file(path.join(__dirname, 'icon48.png'), { name: 'icon48.png' });
}
if (fs.existsSync(path.join(__dirname, 'icon128.png'))) {
  archive.file(path.join(__dirname, 'icon128.png'), { name: 'icon128.png' });
}

// Finalize the archive
archive.finalize();

console.log('Building Firefox extension...'); 