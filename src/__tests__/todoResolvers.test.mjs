import {todosResolver} from '../todos/resolvers.mjs';

describe('Todos resolvers', () => {
  describe('Get Todos', () => {
    it('should resolve todos', async () => {
      const mockDb = {
        all: jest.fn((url, values, cb) => {
          cb(null, []);
        }),
      };

      const resolved = await todosResolver({db: mockDb})(
        null,
        {},
        {email: 'test@test.com'},
      );
      expect(resolved).toEqual([]);
    });

    it('should handle caught error and return empty array', async () => {
      const mockDb = {
        all: jest.fn((url, values, cb) => {
          cb(new Error('Mock caught error', undefined));
        }),
      };

      const resolved = await todosResolver({db: mockDb})(
        null,
        {},
        {email: 'test@test.com'},
      );
      expect(resolved).toEqual([]);
    });

    it('should handle uncaught error and return empty array', async () => {
      const mockDb = {
        all: jest.fn((url, values, cb) => {
          throw new Error('Mock error');
        }),
      };

      const resolved = await todosResolver({db: mockDb})(
        null,
        {},
        {email: 'test@test.com'},
      );
      expect(resolved).toEqual([]);
    });
  });
});
