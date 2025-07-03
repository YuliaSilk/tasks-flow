const viteMock = {
  env: {
    VITE_BASE_URL: 'http://localhost:3000',
  },
};

global.import = {
  meta: viteMock,
}; 