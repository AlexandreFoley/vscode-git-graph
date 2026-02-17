import { expect } from 'chai';
import { getConfig } from '../../config';

describe('Config', () => {
	// Note: These tests use a mocked VS Code environment.
	// The vscode module is mocked in test-mocks/vscode/ to provide
	// minimal implementations that return default configuration values.

	describe('Configuration methods', () => {
		let config: ReturnType<typeof getConfig>;

		beforeEach(() => {
			config = getConfig();
		});

		it('should return a boolean for autoCenterCommitDetailsView', () => {
			const result = config.autoCenterCommitDetailsView();
			expect(result).to.be.a('boolean');
		});

		it('should return a valid dateFormat', () => {
			const result = config.dateFormat();
			expect(result).to.be.a('string');
			expect(['Date & Time', 'Date Only', 'Relative']).to.include(result);
		});

		it('should return a valid dateType', () => {
			const result = config.dateType();
			expect(result).to.be.a('string');
			expect(['Author Date', 'Commit Date']).to.include(result);
		});

		it('should return a boolean for fetchAvatars', () => {
			const result = config.fetchAvatars();
			expect(result).to.be.a('boolean');
		});

		it('should return an array of graph colours', () => {
			const result = config.graphColours();
			expect(result).to.be.an('array');
			expect(result.length).to.be.greaterThan(0);
		});

		it('should filter valid hex and RGB colors only', () => {
			const result = config.graphColours();
			result.forEach((color: string) => {
				const trimmed = color.trim();
				const isValidHex = /^#[0-9a-fA-F]{6}$/.test(trimmed) || /^#[0-9a-fA-F]{8}$/.test(trimmed);
				const isValidRgb = /^rgba?\s*\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$/.test(trimmed);
				expect(isValidHex || isValidRgb).to.be.true;
			});
		});

		it('should return a valid graphStyle', () => {
			const result = config.graphStyle();
			expect(result).to.be.a('string');
			expect(['rounded', 'angular']).to.include(result);
		});

		it('should return a number for initialLoadCommits', () => {
			const result = config.initialLoadCommits();
			expect(result).to.be.a('number');
			expect(result).to.be.greaterThan(0);
		});

		it('should return a number for loadMoreCommits', () => {
			const result = config.loadMoreCommits();
			expect(result).to.be.a('number');
			expect(result).to.be.greaterThan(0);
		});

		it('should return a number for maxDepthOfRepoSearch', () => {
			const result = config.maxDepthOfRepoSearch();
			expect(result).to.be.a('number');
			expect(result).to.be.at.least(0);
		});

		it('should return a boolean for showCurrentBranchByDefault', () => {
			const result = config.showCurrentBranchByDefault();
			expect(result).to.be.a('boolean');
		});

		it('should return a boolean for showStatusBarItem', () => {
			const result = config.showStatusBarItem();
			expect(result).to.be.a('boolean');
		});

		it('should return a boolean for showUncommittedChanges', () => {
			const result = config.showUncommittedChanges();
			expect(result).to.be.a('boolean');
		});

		it('should return a valid tabIconColourTheme', () => {
			const result = config.tabIconColourTheme();
			expect(result).to.be.a('string');
			expect(['colour', 'grey']).to.include(result);
		});

		it('should return a string for gitPath', () => {
			const result = config.gitPath();
			expect(result).to.be.a('string');
			expect(result.length).to.be.greaterThan(0);
		});
	});
});
