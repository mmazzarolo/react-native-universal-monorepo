import { subplatform } from '../config';

describe('config', () => {
  describe('subplatform', () => {
    it('should be defined', () => {
      expect(subplatform).toBeDefined();
    });

    it('should be a string or undefined', () => {
      if (subplatform !== undefined) {
        expect(typeof subplatform).toBe('string');
      }
    });
  });
});
