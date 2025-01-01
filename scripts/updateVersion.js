const fs = require('fs');

// Read the package.json file
const packageJson = JSON.parse(fs.readFileSync('package.json'));

// Function to increment the version
function incrementVersion(version) {
    const parts = version.split('.');
    const lastPart = parseInt(parts[parts.length - 1]);
    parts[parts.length - 1] = lastPart + 1;
    return parts.join('.');
}

// Update the version
const currentVersion = packageJson.version;
const newVersion = incrementVersion(currentVersion); // You can implement your own version increment logic here
packageJson.version = newVersion;

// Update the build date
const buildDate = new Date().toDateString() + ' ' + new Date().toLocaleTimeString();
packageJson.buildDate = buildDate;

// Write the updated package.json file
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
