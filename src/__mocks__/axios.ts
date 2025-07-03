const mockAxios = {
  defaults: {
    baseURL: 'http://localhost:3000',
  },
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),
};

export default mockAxios; 