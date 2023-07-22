let board = document.getElementById("board");
let boardSizeInput = document.getElementById("board-size-input");
let btnCreate = document.getElementById("btn-create");
let hintEl = document.getElementById("hint");
let currentPlayer = "●";
let gameOver = false;
let msgList = [];
boardSizeInput.value = 10;
btnCreate.onclick = createBoard;

//1. 创建棋盘
function createBoard() {
	let size = Number(boardSizeInput.value);
	if (size < 5) {
		sendMessage("棋盘大小至少为5");
		return;
	}
	gameOver = false;
	initTrTd(size, initTbody());
	hintEl.innerHTML = "GAME START!";
}

function initTrTd(size, tbody) {
	let id = 0;
	let y = 0;
	for (let i = 0; i < size; i++) {
		let tr = document.createElement("tr");
		tr.y = y;
		tbody.appendChild(tr);
		let x = 0;
		for (let n = 0; n < size; n++) {
			let td = document.createElement("td");
			td.onclick = putDown;
			td.className = "cell";
			td.id = id;
			td.x = x;
			td.y = y;
			id++;
			x++;
			tr.appendChild(td);
		}
		y++;
	}
}

function initTbody() {
	board.firstElementChild.remove();
	let tbody = document.createElement("tbody");
	board.appendChild(tbody);
	return tbody;
}

// 点击任意棋格执行下棋主逻辑
function putDown(event) {
	if (gameOver) {
		sendMessage("游戏已结束，请重新创建棋盘");
		return;
	}
	if (isCellValid(event)) {
		event.target.innerHTML = currentPlayer;
		checkWin(event);
		turnPlayer();
	} else {
		sendMessage("不可在此处落子");
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
	return event.target.innerHTML == ""
}

// 检查是否存在五子相连
function checkWin(event) {
	if (checkFull()) {
		gameOver = true;
		sendMessage("GAME OVER! TIE!");
		hintEl.innerHTML = msg;
	}
	if (
		checkRow(event) ||
		checkColumn(event) ||
		checkForwardDiagonal(event) ||
		checkBackDiagonal(event)
	) {
		gameOver = true;
		let msg = `GAME OVER! WINNER IS ${currentPlayer}`;
		sendMessage(msg);
		hintEl.innerHTML = msg;
	}
}

// 检查竖向是否存在五子相连
function checkColumn(event) {
	let column = Array.from(board.firstElementChild.children).map(tr => {
		return Array.from(tr.children).find(td => td.x === event.target.x);
	});
	return check(column);
}

function checkForwardDiagonal(event) {
	let forwardDiagonal = [];
	for (let tr of board.firstElementChild.children) {
		let tds = Array.from(tr.children);
		let td = tds.find(
			td =>
				(td.id - event.target.id) % (tds.length - 1) === 0 &&
				!(td.x < event.target.x && td.y < event.target.y)
		);
		if (td) {
			forwardDiagonal.push(td);
			if (td.x == 0) {
				break;
			}
		}
	}
	return forwardDiagonal.length < 5 ? false : check(forwardDiagonal);
}

function checkBackDiagonal(event) {
	let forwardDiagonal = [];
	for (let tr of board.firstElementChild.children) {
		let tds = Array.from(tr.children);
		let td = tds.find(
			td =>
				(td.id - event.target.id) % (tds.length + 1) === 0 &&
				!(td.x > event.target.x && td.y < event.target.y)
		);
		if (td) {
			forwardDiagonal.push(td);
			if (td.x == tds.length - 1) {
				break;
			}
		}
	}
	return forwardDiagonal.length < 5 ? false : check(forwardDiagonal);
}

function checkRow(event) {
	let tr = Array.from(board.firstElementChild.children).find(
		tr => tr.y == event.target.y
	);
	return check(Array.from(tr.children));
}

function checkFull() {
	let isFull = Array.from(board.firstElementChild.children).every(tr =>
		Array.from(tr.children).every(td => td.innerHTML !== "")
	);
	return isFull;
}

function check(array) {
	for (let i = 0; i < array.length - 4; i++) {
		let checkingCells = array.slice(i, i + 5);
		if (checkingCells.every(cell => cell.innerHTML == currentPlayer)) {
			return true;
		} else {
			continue;
		}
	}
	return false;
}

function sendMessage(text) {
	let msgEL = document.createElement("div");
	msgEL.innerText = text;
	msgEL.setAttribute("class", "message");
	document.body.appendChild(msgEL);
	msgList.push(msgEL);
	if (msgList.length > 5) {
		msgList[0].remove();
		msgList.shift();
	}
	setTimeout(() => msgEL.setAttribute("class", "message show-message"));
	setTimeout(() => {
		msgEL.remove();
		msgList.shift();
	}, 2000);
}
