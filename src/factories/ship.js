const Ship = (id, coords) => {
    // represents a ship object.

    const ship = new Array(coords.length).fill(false)

    const hit = (num) => {
        let idx = coords.indexOf(num)
        ship[idx] = true
        return ship
    }

    const isSunk = () => {
        return ship.reduce((prev, curr) => prev && curr, true)
    }

    return { ship, id, hit, isSunk }
}

export default Ship


