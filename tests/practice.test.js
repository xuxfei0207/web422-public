let sum = (num1, num2) => num1 + num2;

describe('Test sum()', () => {
  test('sum function adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  test('sum function adds 2 + 2 to equal 4 ', () => {
    expect(sum(2, 2)).toBe(4);
  });
  test('sum function adds 0 + 1 to equal 1', () => {
    expect(sum(1, 0)).toBe(1);
  });
});