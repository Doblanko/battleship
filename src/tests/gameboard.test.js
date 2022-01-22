import Gameboard from '../factories/gameboard';

let testBoard;

beforeEach(() => {
    testBoard = Gameboard();
});

describe('ship placing function', () => {
    test('placing a ship', () => {
        testBoard.placeShip([12, 3]);
        expect(testBoard.gameBoard[12]).toBe(1);
        expect(testBoard.gameBoard[3]).toBe(1);
        expect(testBoard.gameBoard[2]).toBe(undefined);
    });

    test('ships do not overlap', () => {
        testBoard.placeShip([4, 5]);
        testBoard.placeShip([4, 5, 6, 7]);

        // should have only placed the first ship
        expect(testBoard.gameBoard[4]).toBe(1);
        expect(testBoard.gameBoard[5]).toBe(1);
        expect(testBoard.gameBoard[6]).toBe(undefined);
        expect(testBoard.gameBoard[7]).toBe(undefined);
    });

    test('ships can be vertical', () => {
        testBoard.placeShip([51, 61, 71]);
        expect(testBoard.gameBoard[51]).toBe(1);
        expect(testBoard.gameBoard[61]).toBe(1);
        expect(testBoard.gameBoard[71]).toBe(1);
    });
});

describe('recieve attack function', () => {
    test('records misses', () => {
        testBoard.placeShip([4, 5, 6]);
        testBoard.receiveAttack(7);
        testBoard.receiveAttack(3);

        expect(testBoard.gameBoard[3]).toBe('missed');
        expect(testBoard.gameBoard[7]).toBe('missed');
    });

    test('records hits', () => {
        testBoard.placeShip([4, 5, 6]);
        testBoard.placeShip([12, 13]);
        testBoard.receiveAttack(4);
        testBoard.receiveAttack(13);

        expect(testBoard.gameBoard[4]).toBe('hit');
        expect(testBoard.gameBoard[13]).toBe('hit');
    });
});

describe('sunk function', () => {
    test('track sunk ship', () => {
        testBoard.placeShip([1, 2, 3]);
        testBoard.placeShip([11, 21, 31]);
        testBoard.placeShip([5, 6, 7, 8]);

        testBoard.receiveAttack(5);
        testBoard.receiveAttack(6);
        testBoard.receiveAttack(7);
        testBoard.receiveAttack(8);

        expect(testBoard.ships.length).toBe(3);
        expect(testBoard.ships[2].isSunk()).toBe(true);
    });

    test('track if all ships sunk', () => {
        testBoard.placeShip([1, 2, 3]);
        testBoard.placeShip([5, 6, 7]);
        testBoard.placeShip([11, 12]);
        expect(testBoard.shipsSunk()).toBe(false);

        testBoard.receiveAttack(1);
        testBoard.receiveAttack(2);
        testBoard.receiveAttack(3);
        expect(testBoard.shipsSunk()).toBe(false);

        testBoard.receiveAttack(5);
        testBoard.receiveAttack(6);
        testBoard.receiveAttack(7);
        expect(testBoard.shipsSunk()).toBe(false);

        testBoard.receiveAttack(11);
        testBoard.receiveAttack(12);
        expect(testBoard.shipsSunk()).toBe(true);
    });
});