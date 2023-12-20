module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
	globalTeardown: '<rootDir>/src/teardown.ts',
};