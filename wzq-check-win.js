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
	checkResult = checkRow(event) || checkColumn(event) || checkForwardDiagonal(event);
	if (checkResult) {
		gameOver = true;
		hintEl.innerHTML = `GAME OVER! WINNER IS ${currentPlayer}`;
	}
}



// 检查竖向是否存在五子相连
function checkColumn(event) {
	let column = Array.from(board.firstElementChild.children).map(tr => {
		let tds = Array.from(tr.children)
		let cIndex = event.target.id % tds.length
		return tds.find(td => td.id % tds.length === cIndex)
	});
	return check(column)
}

function checkForwardDiagonal(event) {
    let forwardDiagonal = []
    for (let tr of board.firstElementChild.children){
        let tds = Array.from(tr.children)
        let td = tds.find(td => (td.id - event.target.id) % (tds.length -1) === 0)
        forwardDiagonal.push(td)
        if (td.id % tds.length === 0){
            break
        } 
    }
    console.log(forwardDiagonal)
	// let forwardDiagonal = Array.from(board.firstElementChild.children).map(tr => {
	// 	let tds = Array.from(tr.children)
	// 	// let cIndex = event.target.id % tds.length
    //     console.log(tds.find(td => (td.id - event.target.id) % (tds.length -1) === 0))
	// 	return tds.find(td => (td.id - event.target.id) % (tds.length -1) === 0)
	// });
	return check(forwardDiagonal)
}

function checkRow(event) {
    let tr = Array.from(board.firstElementChild.children).find(tr => {
        return Array.from(tr.children).includes(event.target)
    })
    return check(Array.from(tr.children))
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
    return false
}