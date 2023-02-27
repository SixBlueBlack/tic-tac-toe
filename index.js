const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let turn = CROSS;
let field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
let winner = EMPTY;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function getOppositeTurn() {
    if (turn === CROSS)
        return ZERO;
    return CROSS;
}

function isAllEqual(allEqual, arr) {
    for (let elem of arr)
        if (allEqual(elem) && elem[0] !== EMPTY)
            return elem[0]
}

function checkWinner() {
    const allEqual = arr => arr.every(v => v === arr[0])
    let winner;

    winner = isAllEqual(allEqual, field)
    if (winner !== undefined) return winner

    let verticals = [];
    for (let j = 0; j < field.length; j++) {
        verticals.push([])
        for (let i = 0; i < field[j].length; i++) {
            verticals[j].push(field[i][j])
        }
    }
    winner = isAllEqual(allEqual, verticals)
    if (winner !== undefined) return winner

    let diagonals = [[], []]
    for (let j = 0; j < field.length; j++) {
        diagonals[0].push(field[j][j])
        diagonals[1].push(field[field.length - j - 1][j])
    }
    winner = isAllEqual(allEqual, diagonals)
    return winner
}

function cellClickHandler(row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field[row][col] !== EMPTY || winner !== EMPTY)
        return;
    field[row][col] = turn;
    renderSymbolInCell(turn, row, col);
    turn = getOppositeTurn();
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);
    let w = checkWinner();
    if (w !== undefined) {
        alert(w);
        winner = w;
    }

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    console.log('reset!');
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}
