const mockAxios = {
  defaults: {
    baseURL: 'https://project-tasks-flow.onrender.com',
  },
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),
};

export default mockAxios; 