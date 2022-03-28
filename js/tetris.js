/*
 *  Desarrollo por Maximiliano Brignone © 2022
 *  https://github.com/mbrignone93
 *
 * */

const BLOCKS = {
	O: [
		[[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [0, 1], [1, 0], [1, 1]]
	],
    I: [
        [[0, 0], [1, 0], [2, 0], [3, 0]],
        [[2, -1], [2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0], [3, 0]],
        [[2, -1], [2, 0], [2, 1], [2, 2]]
    ],
    T: [
        [[2, 1], [0, 1], [1, 1], [1, 2]],
        [[1, 0], [0, 1], [1, 1], [1, 2]],  
		[[1, 0], [0, 1], [1, 1], [2, 1]], 
		[[2, 1], [1, 2], [1, 1], [1, 0]]
	],
    Z: [
        [[0, 0], [1, 0], [1, 1], [2, 1]],
        [[0, 1], [1, 0], [1, 1], [0, 2]],
        [[0, 0], [1, 0], [1, 1], [2, 1]],
        [[0, 1], [1, 0], [1, 1], [0, 2]]
    ],
	S: [
        [[1, 0], [2, 0], [0, 1], [1, 1]],
        [[1, 1], [1, 0], [2, 1], [2, 2]],
        [[1, 0], [2, 0], [0, 1], [1, 1]],
        [[1, 1], [1, 0], [2, 1], [2, 2]]
    ],
    J: [
       
        [[0, 1], [1, 1], [2, 1], [2, 2]],
		[[1, 0], [1, 1], [1, 2], [0, 2]],
		[[0, 0], [0, 1], [1, 1], [2, 1]],
        [[1, 0], [2, 0], [1, 1], [1, 2]]
    ],
    L: [
        [[1, 0], [2, 0], [1, 1], [1, 2]],
        [[0, 0], [0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 0], [1, 1], [1, 2]],
        [[0, 1], [1, 1], [2, 1], [2, 2]]
    ],
};

const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const pauseText = document.querySelector(".pause-text");
const scoreDisplay = document.querySelector(".score");
const levelDisplay = document.querySelector(".level");
const playAgainButton = document.querySelector(".game-text > button");

const GAME_ROWS = 20;
const GAME_COLS = 10;

let score = 0;
let duration = 1000; // initial speed tick
let downInterval;
let tempMovingItem;
let gamePaused = false;
let numberLines = 0;
let numberLinesPerLevel = 0;
let level = 1;

levelDisplay.innerText = "Level: " + level;

const movingItem = {
	type: "",
	direction: 0,
	top: 0,
	left: 0
};

function init() {
	
	tempMovingItem = { ...movingItem };

	// build grid
	for (let i = 0; i < GAME_ROWS; i++)
		// add a row
		prependNewLine();

	generateNewBlock();
}

function prependNewLine() {

	const li = document.createElement("li");
	const ul = document.createElement("ul");

	for (let j = 0; j < GAME_COLS; j++) {
		
		const matrix = document.createElement("li");
		ul.prepend(matrix);
	}

	li.prepend(ul);
	playground.prepend(li);
}

function checkMatch() {

	const childNodes = playground.childNodes;
	
	childNodes.forEach(child => {
		
		let matched = true;

		child.children[0].childNodes.forEach(li => {

			if (!li.classList.contains("seized")){
				matched = false;
			}
		});

		// if all childs of the li element contains class seized
		// i remove all line and add new row on the grid
		if (matched) {
			child.remove();
			prependNewLine();
			numberLines++;
			numberLinesPerLevel++;
		}
	});

	generateNewBlock();
}

function seizeBlock() {
	const movingBlocks = document.querySelectorAll(".moving");

	movingBlocks.forEach(moving => {
		moving.classList.remove("moving");
		moving.classList.add("seized");
	});

	score = score + 10;
	scoreDisplay.innerText = "Score: " + score;

	checkMatch();
}

function generateNewBlock() {
	
	if (!gamePaused) {

		// set score and reset number lines
		switch(numberLines) {
			case 1:
				score = score + (level * 100) - 10;
				scoreDisplay.innerText = "Score: " + score;
				break;
			case 2:
				score = score + (level * 300) - 10;
				scoreDisplay.innerText = "Score: " + score;
				break;
			case 3:
				score = score + (level * 500) - 10;
				scoreDisplay.innerText = "Score: " + score;
				break;
			case 4:
				score = score + (level * 800) - 10;
				scoreDisplay.innerText = "Score: " + score;
				break;
		}
		
		// set level 2
		if (numberLinesPerLevel >= 20 && level === 1) {
			numberLinesPerLevel = 0;
			level++;
			levelDisplay.innerText = "Level: " + level;
			duration = duration - 100;
		}
		
		// set level 3
		if (numberLinesPerLevel >= 30 && level === 2) {
			numberLinesPerLevel = 0;
			level++;
			levelDisplay.innerText = "Level: " + level;
			duration = duration - 100;
		}

		// set level 4
		if (numberLinesPerLevel >= 40 && level === 3) {
			numberLinesPerLevel = 0;
			level++;
			levelDisplay.innerText = "Level: " + level;
			duration = duration - 100;
		}

		// set level 5
		if (numberLinesPerLevel >= 50 && level === 4) {
			numberLinesPerLevel = 0;
			level++;
			levelDisplay.innerText = "Level: " + level;
			duration = duration - 100;
		}

		// set level 6
		if (numberLinesPerLevel >= 60 && level === 5) {
			numberLinesPerLevel = 0;
			level++;
			levelDisplay.innerText = "Level: " + level;
			duration = duration - 100;
		}

		// set level 7
		if (numberLinesPerLevel >= 70 && level === 6) {
			numberLinesPerLevel = 0;
			level++;
			levelDisplay.innerText = "Level: " + level;
			duration = duration - 100;
		}

		// set level 8
		if (numberLinesPerLevel >= 80 && level === 7) {
			numberLinesPerLevel = 0;
			level++;
			levelDisplay.innerText = "Level: " + level;
			duration = duration - 100;
		}

		// set level 9
		if (numberLinesPerLevel >= 90 && level === 8) {
			numberLinesPerLevel = 0;
			level++;
			levelDisplay.innerText = "Level: " + level;
			duration = duration - 100;
		}

		// set level 10
		if (numberLinesPerLevel >= 100 && level === 9) {
			numberLinesPerLevel = 0;
			level++;
			levelDisplay.innerText = "Level: " + level;
			duration = duration - 100;
		}

		numberLines = 0;

		// set tick
		clearInterval(downInterval);
		downInterval = setInterval(() => {

			moveBlock("top", 1);

		}, duration);

		const blockArray = Object.entries(BLOCKS);
		const randomIndex = Math.floor(Math.random() * blockArray.length);
		
		movingItem.type = blockArray[randomIndex][0];
		movingItem.top = 0;
		movingItem.left = 3;
		movingItem.direction = 0;

		tempMovingItem = { ...movingItem };
		renderBlocks();
	}
}

function checkEmpty(target) {
	if (!target || target.classList.contains("seized"))
		return false;
	
	return true;
}

function renderBlocks(moveType = "") {

	const { type, direction, top, left } = tempMovingItem;
	const movingBlocks = document.querySelectorAll(".moving");

	movingBlocks.forEach(moving => {
		moving.classList.remove(type, "moving");
	});

	BLOCKS[type][direction].some(block => {
		
		const x = block[0] + left;
		const y = block[1] + top;
		const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
		const isAvailable = checkEmpty(target);

		if (isAvailable)
			target.classList.add(type, "moving");
		else
		{
			tempMovingItem = { ...movingItem };
			if (moveType === "retry") {
				clearInterval(downInterval);
				showGameOverText();
			}
			setTimeout(() => {
				renderBlocks("retry");

				if (moveType === "top"){
					seizeBlock();
				}

			}, 0);

			return true;
		}
	});

	movingItem.left = left;
	movingItem.top = top;
	movingItem.direction = direction;
}

function moveBlock(moveType, amount) {
	tempMovingItem[moveType] += amount;
	renderBlocks(moveType);
}

function changeDirection() {
	const direction = tempMovingItem.direction;
	direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
	renderBlocks();
}

function dropBlock() {
	clearInterval(downInterval);

	downInterval = setInterval(() => {
		moveBlock("top", 1);
	}, 10);
}

function showGameOverText() {

	gameText.style.display = "flex";
}

// event handling
document.addEventListener("keydown", event => {

	switch (event.keyCode) {
		// key right
		case 39:
			moveBlock("left", 1);
			break;
		// key left
		case 37:
			moveBlock("left", -1);
			break;
		// key down
		case 40:
			moveBlock("top", 1);
			break;
		// key up (rotate block)
		case 38:
			changeDirection();
			break;
		// key space (drop block)
		case 32:
			dropBlock();
			break;
		// key P (pause)
		case 80:
			if (!gamePaused) {
				pauseText.style.display = "block";
				gamePaused = true;
				clearInterval(downInterval);
			}
			else
			{
				pauseText.style.display = "none";
				gamePaused = false;

				clearInterval(downInterval);

				downInterval = setInterval(() => {

					moveBlock("top", 1);
				}, duration);
			}
			break;
		default:
			break;
	}
});

playAgainButton.addEventListener("click", () => {
	playground.innerHTML = ""; // clear grid
	gameText.style.display = "none";
	
	duration = 1000;
	score = 0; 
	level = 0;
	numberLinesPerLevel = 0;
	
	scoreDisplay.innerText = "Score: " + score;
	levelDisplay.innerText = "Level: " + level;

	init();
});

init();