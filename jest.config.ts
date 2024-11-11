module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testPathIgnorePatterns: ['/__tests__/.*/__fixtures__/.*'],
  collectCoverageFrom: ['index.js', 'src/**/*.{js,ts}'],
  testMatch: ['**/*.test.{js,ts}'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
    '^@typings/(.*)$': '<rootDir>/typings/$1'
  }
}
