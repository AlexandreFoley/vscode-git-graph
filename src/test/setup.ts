// Mock setup for VS Code API
// This file mocks the vscode module for unit testing

const mockWorkspaceConfiguration = {
	get: (key: string, defaultValue: any) => defaultValue
};

const mockVSCode = {
	workspace: {
		getConfiguration: () => mockWorkspaceConfiguration
	},
	env: {
		clipboard: {
			writeText: (text: string) => Promise.resolve()
		}
	},
	Uri: class {
		static file(path: string) {
			return { fsPath: path };
		}
		fsPath: string = '';
	}
};

// Mock the vscode module
require.cache[require.resolve('vscode')] = {
	exports: mockVSCode,
	id: 'vscode',
	filename: 'vscode',
	loaded: true,
	parent: null,
	children: [],
	paths: [],
	require: require
} as any;

export {}; // Make this a module
