#!/usr/bin/env node

// Setup script to create vscode mock module for unit testing
const fs = require('fs');
const path = require('path');

const mockDir = path.join(__dirname, '../test-mocks/vscode');

// Create directory if it doesn't exist
if (!fs.existsSync(mockDir)) {
	fs.mkdirSync(mockDir, { recursive: true });
}

// Create mock implementation
const mockImpl = `// Mock vscode module for unit testing
module.exports = {
	workspace: {
		getConfiguration: (section) => ({
			get: (key, defaultValue) => defaultValue
		})
	},
	env: {
		clipboard: {
			writeText: (text) => Promise.resolve()
		}
	},
	Uri: class {
		constructor() {
			this.fsPath = '';
		}
		static file(path) {
			return { fsPath: path };
		}
	}
};
`;

// Create type definitions
const mockTypes = `export interface WorkspaceConfiguration {
	get<T>(key: string, defaultValue: T): T;
}

export namespace workspace {
	export function getConfiguration(section?: string): WorkspaceConfiguration;
}

export namespace env {
	export const clipboard: {
		writeText(text: string): Promise<void>;
	};
}

export class Uri {
	fsPath: string;
	static file(path: string): Uri;
}
`;

// Create package.json
const packageJson = {
	name: 'vscode',
	version: '0.0.0',
	main: 'index.js'
};

// Write files
fs.writeFileSync(path.join(mockDir, 'index.js'), mockImpl);
fs.writeFileSync(path.join(mockDir, 'index.d.ts'), mockTypes);
fs.writeFileSync(path.join(mockDir, 'package.json'), JSON.stringify(packageJson, null, 2));

console.log('✓ VS Code mock module created successfully');
