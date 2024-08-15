import { setToken, getToken, readToken, isAuthenticated, removeToken, authenticateUser, registerUser } from '../lib/authenticate';
import { jwtDecode } from 'jwt-decode';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => store[key] = value.toString()),
    removeItem: jest.fn((key) => delete store[key]),
    clear: jest.fn(() => store = {}),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock fetch
global.fetch = jest.fn();

// Mock jwtDecode
jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe('Authentication Utility Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setToken', () => {
    it('should store the token in localStorage', () => {
      const token = 'sample-token';
      setToken(token);
      expect(localStorage.setItem).toHaveBeenCalledWith('access_token', token);
    });
  });

  describe('getToken', () => {
    it('should retrieve the token from localStorage', () => {
      const token = 'sample-token';
      localStorage.getItem.mockReturnValue(token);
      expect(getToken()).toBe(token);
      expect(localStorage.getItem).toHaveBeenCalledWith('access_token');
    });
  });

  describe('readToken', () => {
    it('should decode the token if present', () => {
      const token = 'sample-token';
      const decodedToken = { user: 'test-user' };
      localStorage.getItem.mockReturnValue(token);
      jwtDecode.mockReturnValue(decodedToken);

      expect(readToken()).toEqual(decodedToken);
      expect(jwtDecode).toHaveBeenCalledWith(token);
    });

    it('should return null if no token is present', () => {
      localStorage.getItem.mockReturnValue(null);
      expect(readToken()).toBeNull();
    });

    it('should return null if decoding fails', () => {
      localStorage.getItem.mockReturnValue('invalid-token');
      jwtDecode.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      expect(readToken()).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if token is present and valid', () => {
      jwtDecode.mockReturnValue({ user: 'test-user' });
      expect(isAuthenticated()).toBe(true);
    });

    it('should return false if no token is present', () => {
      jwtDecode.mockReturnValue(null);
      expect(isAuthenticated()).toBe(false);
    });
  });

  describe('removeToken', () => {
    it('should remove the token from localStorage', () => {
      removeToken();
      expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    });
  });

  describe('authenticateUser', () => {
    it('should authenticate the user and store the token', async () => {
      const token = 'sample-token';
      const response = { status: 200, json: jest.fn().mockResolvedValue({ token }) };
      fetch.mockResolvedValue(response);

      const result = await authenticateUser('username', 'password');
      expect(result).toBe(true);
      expect(fetch).toHaveBeenCalledWith('/api/login', expect.anything());
      expect(localStorage.setItem).toHaveBeenCalledWith('access_token', token);
    });

    it('should throw an error if authentication fails', async () => {
      const response = { status: 400, json: jest.fn().mockResolvedValue({ message: 'Error' }) };
      fetch.mockResolvedValue(response);

      await expect(authenticateUser('username', 'password')).rejects.toThrow('Error');
    });
  });

  describe('registerUser', () => {
    it('should register the user and store the token', async () => {
      const token = 'sample-token';
      const response = { status: 200, json: jest.fn().mockResolvedValue({ token }) };
      fetch.mockResolvedValue(response);

      await registerUser('username', 'password', 'password2');
      expect(fetch).toHaveBeenCalledWith('/api/register', expect.anything());
      expect(localStorage.setItem).toHaveBeenCalledWith('access_token', token);
    });

    it('should throw an error if registration fails', async () => {
      const response = { status: 400, json: jest.fn().mockResolvedValue({ message: 'Error' }) };
      fetch.mockResolvedValue(response);

      await expect(registerUser('username', 'password', 'password2')).rejects.toThrow('Error');
    });
  });
});
