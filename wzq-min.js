let board = document.getElementById("board");
let boardSizeInput = document.getElementById("board-size-input");
let btnCreate = document.getElementById("btn-create");
let hintEl = document.getElementById("hint");
let currentPlayer = "●";

boardSizeInput.value = 10;
btnCreate.onclick = createBoard;

if (2 < "3") {
	console.log(true);
}

//1. 创建棋盘
function createBoard() {
	let size = boardSizeInput.value;
	if (size < 5) {
		alert("棋盘大小至少为5");
		return;
	}
	board.firstElementChild.remove();

	let tbody = document.createElement("tbody");
	board.appendChild(tbody);

	for (let i = 0; i < size; i++) {
		let tr = document.createElement("tr");
		tbody.appendChild(tr);
		for (let n = 0; n < size; n++) {
			let td = document.createElement("td");
			td.onclick = putDown;
			td.className = "cell";
			tr.appendChild(td);
		}
	}
	hintEl.innerHTML = "GAME START!";
}

// 点击任意棋格执行下棋主逻辑
function putDown(event) {
	if (isCellValid(event)) {
		event.target.innerHTML = currentPlayer;
		turnPlayer();
	} else {
		alert("不可在此处落子");
	}
}

function turnPlayer() {
	if (currentPlayer === "●") {
		currentPlayer = "○";
	} else {
		currentPlayer = "●";
	}
}

// 落子位置是否可放检测
function isCellValid(event) {
	if (event.target.innerHTML === "") {
		return true;
	} else {
		return false;
	}
}
