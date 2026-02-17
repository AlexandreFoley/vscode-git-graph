# Test Suite

This directory contains unit tests for the Git Graph VS Code extension.

## Running Tests

### Run all tests
```bash
npm test
```

### Run only unit tests (without compile step)
```bash
npm run test:unit
```

### Watch mode
```bash
npm run test:watch
```

## Test Structure

- `unit/` - Unit tests for individual modules
  - `utils.test.ts` - Tests for utility functions
  - `config.test.ts` - Tests for configuration management

## Test Setup

Tests use:
- **Mocha** - Test framework
- **Chai** - Assertion library
- **Sinon** - Mocking/stubbing (when needed)
- **ts-node** - TypeScript execution for tests

### VS Code Module Mock

Since VS Code extension code depends on the `vscode` module which isn't available during unit tests, we use a mock module located in `test-mocks/vscode/`. This mock is automatically generated when you run `npm run test:setup` or during `npm install`.

The mock provides minimal implementations of:
- `workspace.getConfiguration()` - Returns default values
- `env.clipboard.writeText()` - Resolves immediately
- `Uri` class - Basic file URI functionality

## Writing Tests

### Example Unit Test

```typescript
import { expect } from 'chai';
import { myFunction } from '../../myModule';

describe('MyModule', () => {
  describe('myFunction', () => {
    it('should do something', () => {
      const result = myFunction('input');
      expect(result).to.equal('expected');
    });
  });
});
```

### Best Practices

1. Test one thing per test case
2. Use descriptive test names
3. Follow the Arrange-Act-Assert pattern
4. Keep tests independent and isolated
5. Mock external dependencies when necessary

## CI Integration

Tests are automatically run in CI on:
- Multiple platforms (Ubuntu, Windows, macOS)
- Multiple Node.js versions (14.x, 16.x, 18.x)
- Every push to `develop` or `master` branches
- All pull requests

See `.github/workflows/ci.yml` for CI configuration.
