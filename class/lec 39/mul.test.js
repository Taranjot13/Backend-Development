const multiply = require('./mul');

describe('multiply function', () => {
    test('2 * 3 should be 6', () => {
        expect(multiply(2, 3)).toBe(6);
    });

    test('5 * 4 should be 20', () => {
        expect(multiply(5, 4)).toBe(20);
    });

    test('should return "invalid argument" if a is missing', () => {
        expect(multiply(null, 5)).toBe("invalid argument");
    });

    test('should return "invalid argument" if b is missing', () => {
        expect(multiply(5, null)).toBe("invalid argument");
    });
});
