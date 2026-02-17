const fs = require('fs');
const path = require('path');

const OUTPUT_DIRECTORY = './out';

function deleteRecursive(dirPath) {
	if (fs.existsSync(dirPath)) {
		if (fs.statSync(dirPath).isDirectory()) {
			fs.readdirSync(dirPath).forEach(file => {
				const curPath = path.join(dirPath, file);
				deleteRecursive(curPath);
			});
			fs.rmdirSync(dirPath);
		} else {
			fs.unlinkSync(dirPath);
		}
	}
}

if (fs.existsSync(OUTPUT_DIRECTORY)) {
	let outFiles = fs.readdirSync(OUTPUT_DIRECTORY);
	for (let i = 0; i < outFiles.length; i++) {
		deleteRecursive(path.join(OUTPUT_DIRECTORY, outFiles[i]));
	}
}
