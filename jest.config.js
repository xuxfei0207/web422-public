module.exports = {
    testEnvironment: "jest-environment-jsdom",
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    setupFiles: ["<rootDir>/jest.setup.js"],
  };