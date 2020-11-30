"use strict";
var table = document.createElement('table');
var rows = [];
var cells = [];
var turn = 'X';
var count = 0;
var result = document.createElement('div');
// const callback2 = (this: HTMLDivElement) => {
// }
function callback(event) {
    // typescript는 html간 부모자식 관계를 잘 모르기 때문에
    var rowIndex = rows.indexOf(event.currentTarget.parentNode);
    var cellIndex = cells[rowIndex].indexOf(event.currentTarget);
    if (cells[rowIndex][cellIndex].textContent !== '') {
        console.log('빈칸이 아닙니다.');
    }
    else {
        count++;
        cells[rowIndex][cellIndex].textContent = turn;
        var full = false;
        if (cells[rowIndex][0].textContent === turn &&
            cells[rowIndex][1].textContent === turn &&
            cells[rowIndex][2].textContent === turn) {
            full = true;
        }
        if (cells[0][cellIndex].textContent === turn &&
            cells[1][cellIndex].textContent === turn &&
            cells[2][cellIndex].textContent === turn) {
            full = true;
        }
        if (cells[0][0].textContent === turn &&
            cells[1][1].textContent === turn &&
            cells[2][1].textContent === turn) {
            full = true;
        }
        if (cells[0][2].textContent === turn &&
            cells[1][1].textContent === turn &&
            cells[2][0].textContent === turn) {
            full = true;
        }
        if (full) {
            result.textContent = turn + "\uB2D8\uC758 \uC2B9\uB9AC!";
            turn = 'X';
            cells.forEach(function (row) {
                row.forEach(function (cell) {
                    cell.textContent = '';
                });
            });
        }
        else if (count === 9) {
            result.textContent = '무승부 입니당';
            turn = 'X';
            cells.forEach(function (row) {
                row.forEach(function (cell) {
                    cell.textContent = '';
                });
            });
        }
        else {
            turn = turn === 'O' ? 'X' : 'O';
        }
    }
}
for (var i = 1; i <= 3; i++) {
    var row = document.createElement('tr');
    rows.push(row);
    cells.push([]);
    for (var j = 1; j <= 3; j++) {
        var cell = document.createElement('td');
        cell.addEventListener('click', callback);
        cells[i - 1].push(cell);
        row.appendChild(cell);
    }
    table.appendChild(row);
}
document.body.appendChild(table);
document.body.appendChild(result);