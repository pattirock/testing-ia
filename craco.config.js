const path = require('path');

const aliasConfig = {
  '@components': path.resolve(__dirname, 'src/components'),
  '@pages': path.resolve(__dirname, 'src/pages'),
  '@types': path.resolve(__dirname, 'src/types'),
  '@services': path.resolve(__dirname, 'src/services'),
  '@hooks': path.resolve(__dirname, 'src/hooks'),
  '@utils': path.resolve(__dirname, 'src/utils'),
  '@constants': path.resolve(__dirname, 'src/constants'),
  '@styles': path.resolve(__dirname, 'src/styles'),
  '@': path.resolve(__dirname, 'src'),
};

module.exports = {
  webpack: {
    alias: aliasConfig,
  },
  jest: {
    configure: (jestConfig) => {
      jestConfig.moduleNameMapper = {
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@types/(.*)$': '<rootDir>/src/types/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@constants/(.*)$': '<rootDir>/src/constants/$1',
        '^@styles/(.*)$': '<rootDir>/src/styles/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
      };
      jestConfig.collectCoverageFrom = [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/index.tsx',
      ];
      return jestConfig;
    },
  },
};
