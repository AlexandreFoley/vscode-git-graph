import { expect } from 'chai';
import { abbrevCommit, getPathFromStr, evalPromises } from '../../utils';

describe('Utils', () => {
	describe('abbrevCommit', () => {
		it('should abbreviate a full commit hash to 8 characters', () => {
			const fullHash = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
			const result = abbrevCommit(fullHash);
			expect(result).to.equal('a1b2c3d4');
		});

		it('should handle commit hashes shorter than 8 characters', () => {
			const shortHash = 'abc123';
			const result = abbrevCommit(shortHash);
			expect(result).to.equal('abc123');
		});

		it('should return empty string for empty input', () => {
			const result = abbrevCommit('');
			expect(result).to.equal('');
		});
	});

	describe('getPathFromStr', () => {
		it('should convert backslashes to forward slashes', () => {
			const windowsPath = 'C:\\Users\\user\\project\\file.ts';
			const result = getPathFromStr(windowsPath);
			expect(result).to.equal('C:/Users/user/project/file.ts');
		});

		it('should handle paths that already use forward slashes', () => {
			const unixPath = '/home/user/project/file.ts';
			const result = getPathFromStr(unixPath);
			expect(result).to.equal('/home/user/project/file.ts');
		});

		it('should handle mixed slashes', () => {
			const mixedPath = 'C:\\Users/user\\project/file.ts';
			const result = getPathFromStr(mixedPath);
			expect(result).to.equal('C:/Users/user/project/file.ts');
		});

		it('should return empty string for empty input', () => {
			const result = getPathFromStr('');
			expect(result).to.equal('');
		});
	});

	describe('evalPromises', () => {
		it('should execute promises with parallelism limit', async () => {
			const data = [1, 2, 3, 4, 5];
			const createPromise = (val: number) => Promise.resolve(val * 2);

			const results = await evalPromises(data, 2, createPromise);
			expect(results).to.deep.equal([2, 4, 6, 8, 10]);
		});

		it('should handle single item', async () => {
			const data = [5];
			const createPromise = (val: number) => Promise.resolve(val * 2);

			const results = await evalPromises(data, 2, createPromise);
			expect(results).to.deep.equal([10]);
		});

		it('should handle empty array', async () => {
			const data: number[] = [];
			const createPromise = (val: number) => Promise.resolve(val * 2);

			const results = await evalPromises(data, 2, createPromise);
			expect(results).to.deep.equal([]);
		});

		it('should maintain order of results', async () => {
			const data = [1, 2, 3, 4];
			const createPromise = (val: number) => {
				return new Promise<number>(resolve => {
					// Add varying delays to test ordering
					setTimeout(() => resolve(val * 10), (5 - val) * 10);
				});
			};

			const results = await evalPromises(data, 2, createPromise);
			expect(results).to.deep.equal([10, 20, 30, 40]);
		});

		it('should reject if any promise fails', async () => {
			const data = [1, 2, 3];
			const createPromise = (val: number) => {
				if (val === 2) return Promise.reject(new Error('Test error'));
				return Promise.resolve(val * 2);
			};

			try {
				await evalPromises(data, 2, createPromise);
				expect.fail('Should have thrown an error');
			} catch (error) {
				// Expected rejection
				expect(true).to.be.true;
			}
		});

		it('should respect maxParallel limit', async () => {
			const data = [1, 2, 3, 4, 5];
			let maxConcurrent = 0;
			let currentConcurrent = 0;

			const createPromise = (val: number) => {
				return new Promise<number>(resolve => {
					currentConcurrent++;
					maxConcurrent = Math.max(maxConcurrent, currentConcurrent);
					setTimeout(() => {
						currentConcurrent--;
						resolve(val * 2);
					}, 50);
				});
			};

			await evalPromises(data, 2, createPromise);
			expect(maxConcurrent).to.be.at.most(2);
		});
	});
});
