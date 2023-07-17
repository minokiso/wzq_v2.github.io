let board = document.getElementById("board");
let boardSizeInput = document.getElementById("board-size-input");
let btnCreate = document.getElementById("btn-create");
let hintEl = document.getElementById("hint");
let currentPlayer = "●";
let gameOver = false;

// let cells = [];
// let rows = [];
// let columns = [];
// let rightUpDiagonals = [];
// let rightDownDiagonals = [];
// let leftUpDiagonals = [];
// let leftDownDiagonals = [];
// debugger;

boardSizeInput.value = 10;
btnCreate.onclick = createBoard;

//1. 创建棋盘
function createBoard() {
	let size = Number(boardSizeInput.value);
	if (size < 5) {
		alert("棋盘大小至少为5");
		return;
	}
	gameOver = false;
	board.firstElementChild.remove();
	// cells = [];

	let tbody = document.createElement("tbody");
	board.appendChild(tbody);

	let id = 0;
	for (let i = 0; i < size; i++) {
		let tr = document.createElement("tr");
		tbody.appendChild(tr);
		// let row = [];
		// cells.push(row);
		for (let n = 0; n < size; n++) {
			let td = document.createElement("td");
			td.onclick = putDown;
			td.className = "cell";
			td.id = id;
			id++;
			tr.appendChild(td);
			// row.push(td);
		}
		console.log(tr.children);
	}
	hintEl.innerHTML = "GAME START!";
}

// 点击任意棋格执行下棋主逻辑
function putDown(event) {
	if (gameOver) {
		alert("游戏已结束，请重新创建棋盘");
		return;
	}
	if (isCellValid(event)) {
		event.target.innerHTML = currentPlayer;
		checkWin(event);
		turnPlayer();
	} else {
		alert("不可在此处落子");
	}
}

function turnPlayer() {
	if (currentPlayer == "●") {
		currentPlayer = "○";
	} else {
		currentPlayer = "●";
	}
}

// 落子位置是否可放检测
function isCellValid(event) {
	if (event.target.innerHTML == "") {
		return true;
	} else {
		return false;
	}
}

// 检查是否存在五子相连
function checkWin(event) {
	checkResult = checkRow(event) || checkColumn(event) || checkDiagonals(event);
	if (checkResult) {
		gameOver = true;
		hintEl.innerHTML = `GAME OVER! WINNER IS ${currentPlayer}`;
	}
}

// 检查横向是否存在五子相连
// function initCheckRows() {
// 	rows = cells;
// }

// 检查竖向是否存在五子相连
function checkColumn(event) {
	let column = board.firstElementChild.children.map(tr => {
		
	});
	console.log(column);
	// columns = cells.map(row => []);
	// cells.forEach(row => {
	// 	row.forEach((cell, index) => {
	// 		// debugger
	// 		let column = columns[index];
	// 		column.push(cell);
	// 	});
	// });
}

function checkDiagonals(event) {
	// let forwardDiagonals = [];
	// for (let i = 0; i < cells.length - 4; i++) {}
}

function checkRow(array) {
	// for (let item of array) {
	// 	for (let i = 0; i < item.length - 4; i++) {
	// 		let checkingCells = item.slice(i, i + 5);
	// 		if (checkingCells.every(cell => cell.innerHTML == currentPlayer)) {
	// 			return true;
	// 		} else {
	// 			continue;
	// 		}
	// 	}
	// }
}
