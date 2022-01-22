import Ship from '../factories/ship';

let testShip

beforeEach(() => {
  testShip = Ship(0, [1, 2, 3]);
});

test('ship is an object', () => {
  expect(typeof testShip).toBe('object');
});

test('ship properties are available', () => {
  expect(Object.keys(testShip)).toContain('ship');
  expect(Object.keys(testShip)).toContain('id');
  expect(Object.keys(testShip)).toContain('hit');
  expect(Object.keys(testShip)).toContain('isSunk');
});

test('ship id test', () => {
    expect(testShip.id).toBe(0)
})

test('hit function', () => {
  testShip.hit(2);
  expect(testShip.ship[0]).toBe(false);
  expect(testShip.ship[1]).toBe(true);
  expect(testShip.ship[2]).toBe(false);
  expect(testShip.ship[3]).toBe(undefined);
});

test('isSunk function', () => {
    testShip.hit(1);
    // not sunk yet
    expect(testShip.isSunk()).toBe(false)
    testShip.hit(2);
    // not sunk yet
    expect(testShip.isSunk()).toBe(false)
    testShip.hit(3);
    // now it is sunk
    expect(testShip.isSunk()).toBe(true)
});
