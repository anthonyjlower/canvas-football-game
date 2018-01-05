// Game Variables
const canvas = document.getElementById('field');
const ctx = canvas.getContext("2d");
let rbSprite = new Image();
rbSprite.src = "images/rb-sheet.png"
let defSprite = new Image();
defSprite.src = "images/defense-sheet.png"
let wrSprite = new Image();
wrSprite.src = "images/wr-sheet.png"
let fsSprite = new Image();
fsSprite.src = "images/fs-sheet.png"


//Button and Modal selectors
const tackledModalBtn = document.getElementById("tackled-modal-btn");
const tackledModal = document.getElementById('tackled-modal');
const touchdownModalBtn = document.getElementById("touchdown-modal-btn");
const touchdownModal = document.getElementById("touchdown-modal");
const howToBtn = document.getElementById('how-to');
const howToModel = document.getElementById('how-to-modal');
const startGameBtn = document.getElementById('start-game');
const howToModalBtn = document.getElementById('how-to-modal-btn');
const startModel = document.getElementById('start-modal');
const onePlayerBtn = document.getElementById('one-player');
const twoPlayerBtn = document.getElementById('two-players');
const gameOverModal = document.getElementById('game-over-modal');
const gameOverModalBtn = document.getElementById('game-over-modal-btn');
const chooseCharModal1 = document.getElementById('choose-char-modal1');
const chooseCharModal2 = document.getElementById('choose-char-modal2');



//User Controlcd led Players
const runningBack = {
	number: 23,
	body: {},
	direction: "up",
	speed: 8,
	size: 30,
	initBody: function(){
		this.body = {x: canvas.width / 2, y: canvas.height - 40, r: this.size, e: 0};
	},
	drawBody: function() {
		if (this.direction === "left") {
			ctx.drawImage(rbSprite, 66, 66, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		} else if (this.direction === "right") {
			ctx.drawImage(rbSprite, 66, 132, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		} else if (this.direction === "down") {
			ctx.drawImage(rbSprite, 66, 0, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		} else {
			ctx.drawImage(rbSprite, 66, 198, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		}	
	},
	move: function(){
		if (this.direction === 'right') {
			if (this.body.x + this.speed < canvas.width - 30) {
				this.body = {x: this.body.x + this.speed, y: this.body.y, r: this.size, e:0};
			}
		} else if (this.direction === 'juke right'){
			if (this.body.x + 30 < canvas.width - 30) {
				this.body = {x: this.body.x + 30, y: this.body.y, r: this.size, e:0};
			}
		} else if (this.direction === 'left'){
			if (this.body.x - this.speed > 0) {
				this.body = {x: this.body.x - this.speed, y: this.body.y, r: this.size, e:0};
			}
		} else if (this.direction === 'juke left'){	
			if (this.body.x - 30 > 0) {
				this.body = {x: this.body.x - 30, y: this.body.y, r: this.size, e:0};
			}
		} else if (this.direction === 'up'){
			if (this.body.y - this.speed > 0) {
				this.body = {x: this.body.x, y: this.body.y -this.speed, r: this.size, e:0};
			}
		} else if (this.direction === 'down'){
			if (this.body.y + this.speed < canvas.height) {
				this.body = {x: this.body.x, y: this.body.y +this.speed, r: this.size, e:0};
			}
		} else if (this.direction === 'truck'){
			if (this.body.y - 30 > 0) {
				this.body = {x: this.body.x, y: this.body.y - 30, r: this.size, e:0};
			}
		}
	}
}

const wideReceiver = {
	number: 88,
	body: {},
	direction: "up",
	speed: 12,
	size: 30,
	initBody: function(){
		this.body = {x: canvas.width / 2, y: canvas.height - 40, r: this.size, e: 0};
	},
	drawBody: function() {
		if (this.direction === "left") {
			ctx.drawImage(wrSprite, 66, 66, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		} else if (this.direction === "right") {
			ctx.drawImage(wrSprite, 66, 132, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		} else if (this.direction === "down") {
			ctx.drawImage(wrSprite, 66, 0, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		} else {
			ctx.drawImage(wrSprite, 66, 198, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		}
		
	},
	move: function(){
		if (this.direction === 'right') {
			if (this.body.x + this.speed < canvas.width - 30) {
				this.body = {x: this.body.x + this.speed, y: this.body.y, r: this.size, e:0};
			}
		} else if (this.direction === 'juke right'){
			if (this.body.x + 30 < canvas.width - 30) {
				this.body = {x: this.body.x + 15, y: this.body.y, r: this.size, e:0};
			}
		} else if (this.direction === 'left'){
			if (this.body.x - this.speed > 0) {
				this.body = {x: this.body.x - this.speed, y: this.body.y, r: this.size, e:0};
			}
		} else if (this.direction === 'juke left'){	
			if (this.body.x - 30 > 0) {
				this.body = {x: this.body.x - 15, y: this.body.y, r: this.size, e:0};
			}
		} else if (this.direction === 'up'){
			if (this.body.y - this.speed > 0) {
				this.body = {x: this.body.x, y: this.body.y -this.speed, r: this.size, e:0};
			}
		} else if (this.direction === 'down'){
			if (this.body.y + this.speed < canvas.height) {
				this.body = {x: this.body.x, y: this.body.y +this.speed, r: this.size, e:0};
			}
		} else if (this.direction === 'truck'){
			if (this.body.y - 30 > 0) {
				this.body = {x: this.body.x, y: this.body.y - 30, r: this.size, e:0};
			}
		}
	}
}

const safety = {
	number: 33,
	body: {},
	direction: "up",
	speed: 10,
	size: 30,
	initBody: function(){
		this.body = {x: canvas.width / 2, y: canvas.height - 40, r: this.size, e: 0};
	},
	drawBody: function() {
		if (this.direction === "left") {
			ctx.drawImage(fsSprite, 66, 66, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		} else if (this.direction === "right") {
			ctx.drawImage(fsSprite, 66, 132, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		} else if (this.direction === "down") {
			ctx.drawImage(fsSprite, 66, 0, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		} else {
			ctx.drawImage(fsSprite, 66, 198, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		}
		
	},
	move: function(){
		if (this.direction === 'right') {
			if (this.body.x + this.speed < canvas.width - 30) {
				this.body = {x: this.body.x + this.speed, y: this.body.y, r: this.size, e:0};
			}
		} else if (this.direction === 'juke right'){
			if (this.body.x + 20 < canvas.width - 30) {
				this.body = {x: this.body.x + 15, y: this.body.y, r: this.size, e:0};
			}
		} else if (this.direction === 'left'){
			if (this.body.x - this.speed > 0) {
				this.body = {x: this.body.x - this.speed, y: this.body.y, r: this.size, e:0};
			}
		} else if (this.direction === 'juke left'){	
			if (this.body.x - 20 > 0) {
				this.body = {x: this.body.x - 15, y: this.body.y, r: this.size, e:0};
			}
		} else if (this.direction === 'up'){
			if (this.body.y - this.speed > 0) {
				this.body = {x: this.body.x, y: this.body.y -this.speed, r: this.size, e:0};
			}
		} else if (this.direction === 'down'){
			if (this.body.y + this.speed < canvas.height) {
				this.body = {x: this.body.x, y: this.body.y +this.speed, r: this.size, e:0};
			}
		} else if (this.direction === 'truck'){
			if (this.body.y - 30 > 0) {
				this.body = {x: this.body.x, y: this.body.y - 30, r: this.size, e:0};
			}
		}
	}
}


// Computer controlled players
class Opponent {
	constructor(number){
		this.number = number;
		this.speed = 8;
		this.body = {};
		this.size = 30;
		this.direction = "";
	}
	initBody(){
		this.body = {x: Math.floor(Math.random()*220), y: 142.2, r: this.size, e: 0};
	}
	drawBody() {
		if (this.direction === "up") {
			ctx.drawImage(defSprite, 66, 198, 66, 66, this.body.x, this.body.y, this.size, this.size);
		} else if(this.direction === "right"){
			ctx.drawImage(defSprite, 66, 132, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		} else if(this.direction === "left"){
			ctx.drawImage(defSprite, 66, 66, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		} else {
			ctx.drawImage(defSprite, 66, 0, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		}
	}
	move() {
		let randomNum = Math.floor(Math.random()*100);

		// 50% of the time the opponenet moves down
		if (randomNum <= 49) {
			if (this.body.x + this.speed < canvas.width) {
				this.body = {x: this.body.x, y: this.body.y + this.speed, r: this.size, e:0};
				this.direction = "down";
				this.drawBody();
			}
		// 20% of the time the opponent moves left
		} else if (randomNum >= 50 && randomNum <= 69){	
			if (this.body.x - this.speed > 0) {
				this.body = {x: this.body.x - this.speed, y: this.body.y, r: this.size, e:0};
				this.direction = "left";
				this.drawBody();
			}
		// 20% of the time the opponent moves right
		} else if (randomNum >= 70 && randomNum <= 89){
			if (this.body.x + this.speed < canvas.width - 30) {
				this.body = {x: this.body.x + this.speed, y: this.body.y, r: this.size, e:0};
				this.direction = "right";
				this.drawBody();
			}
		//10% of the time the opponent move up
		} else {
			if (this.body.x - this.speed > 10) {
				this.body = {x: this.body.x, y: this.body.y - this.speed, r: this.size, e:0};
				this.direction = "up";
				this.drawBody();
			}
		}	
	}
};

const factory = {
	roster: [],
	createOpponent() {
		console.log("made oppo")
		for(let i = 1; i <= game.round + 6; i++){
			const newPlayer = new Opponent(this.roster.length);
			this.roster.push(newPlayer);
		}
	}
}

const game = {
	round: 1,
	player1Score: 0,
	player2Score: 0,
	player1Char: {},
	player2Char: {},
	activeChar: {},
	turn: "Player 1",
	player1IsAlive: false,
	player2IsAlive: false,
	timer: "",
	//Animate the canvas
	animateCanvas: function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.collisionDetection();
		game.scoreTd();
		fieldLines.draw();
		game.activeChar.drawBody();
		for(let i = 0; i < factory.roster.length; i++){
			factory.roster[i].drawBody();
		}
		window.requestAnimationFrame(game.animateCanvas);
	},
	collisionDetection: function() {
		let playerX = game.activeChar.body.x;
		let playerY = game.activeChar.body.y;

		for(let i = 0; i < factory.roster.length; i++){
			let oppX = factory.roster[i].body.x;
			let oppY = factory.roster[i].body.y;

			let xDiff = Math.abs(playerX - oppX);
			let yDiff = Math.abs(playerY - oppY);

			if (xDiff <= game.activeChar.size / 2 && yDiff <= game.activeChar.size / 2) {
				this.stopOpp();
				this.updateLives();
			}
		}
	},
	scoreTd: function() {
		if (game.activeChar.body.y < 30) {
			this.stopOpp();
			touchdownModal.style.display = "block";
		}
	},
	startOpp: function() {
		this.timer = setInterval(()=>{
			for(let i = 0; i < factory.roster.length; i++){
				factory.roster[i].move();
			}
		},250)
	},
	stopOpp: function() {
		clearInterval(this.timer);
	},
	placeOpponents: function() {
		for(let i = 0; i < factory.roster.length; i++){
			factory.roster[i].initBody();
		}
	},
	changePlayer: function() {
		if(this.turn === "Player 1" && this.player2IsAlive) {
			this.turn = "Player 2";
			this.activeChar = this.player2Char;
		} else if (this.turn === "Player 1" && !this.player2IsAlive) {
			this.round++;
		} else if (this.turn === "Player 2" && this.player1IsAlive) {
			this.turn = "Player 1";
			this.activeChar = this.player1Char;
			this.round++;
		} else if (this.turn === "Player 2" && !this.player1IsAlive){
			this.round++;
		}
	},
	updateLives: function() {
		if (this.turn === "Player 1") {
			this.player1IsAlive = false;
			factory.roster = [];
		} else {
			this.player2IsAlive = false;
			factory.roster = [];
		}
		tackledModal.style.display = "block";
	},
	updateScoreboard: function() {
		if (this.turn === "Player 1") {
			factory.roster = [];
			this.player1Score += 7;
	    	document.getElementById('player1Points').innerText = this.player1Score;
		} else{
			factory.roster = [];
			this.player2Score += 7;
			document.getElementById('player2Points').innerText = this.player2Score;
		}
	},
	resetScoreboard: function() {
		factory.roster = [];
	    this.player1Score = 0;
	    this.player2Score = 0;
	    this.turn = "Player 1";
	    this.round = 1;
	    document.getElementById('player1Points').innerText = this.player1Score;
	    document.getElementById('player2Points').innerText = this.player2Score;
	},
	chooseCharacter1: function() {
		console.log("in choose 1")
		chooseCharModal1.style.display = "block";
		const charBtns = document.getElementsByClassName('char-btn1')
		let selectedChar = ""

		for(let i = 0; i < charBtns.length; i++){
			charBtns[i].addEventListener("click",function(event) {
			selectedChar = this.id;
				if (selectedChar === "runningBack") {
					console.log("character1 === runningBack") 
					game.player1Char = runningBack;
					game.activeChar = game.player1Char;
					game.needToPick();
				} else if(selectedChar === "wideReceiver"){
					console.log("character1 === wideReceiver") 
					game.player1Char = wideReceiver;
					game.activeChar = game.player1Char;
					game.needToPick();
				} else if(selectedChar === "safety"){
					console.log("character1 === safety") 
					game.player1Char = safety;
					game.activeChar = game.player1Char;
					game.needToPick();
				}
			})
		}
	},
	chooseCharacter2: function() {
		console.log("in choose 2")
		chooseCharModal2.style.display = "block";
		const charBtns = document.getElementsByClassName('char-btn2')
		let secondChar = ""

		for(let i = 0; i < charBtns.length; i++){
			// console.log("in the loop")
			charBtns[i].addEventListener("click",function(event) {
			secondChar = this.id;
				if (secondChar === "runningBack") {
					console.log("character2 === runningBack") 
					game.player2Char = runningBack;
					chooseCharModal2.style.display = 'none';
					startGame();
				} else if(secondChar === "wideReceiver"){
					console.log("character2 === wideReceiver") 
					game.player2Char = wideReceiver;
					chooseCharModal2.style.display = 'none';
					startGame();
				} else if(secondChar === "safety"){
					console.log("character2 === safety") 
					game.player2Char = safety;
					chooseCharModal2.style.display = 'none';
					startGame();
				}
			})
		}
	},
	needToPick: function() {
		if (this.player2IsAlive) {
			// console.log("Is alive");
			chooseCharModal1.style.display = "none"
			this.chooseCharacter2();
		} else {
			chooseCharModal1.style.display = "none"
			startGame()
		}
	}
	
}



/*******
Field Design
*******/
const fieldLines = {
	draw: function(){
	
		// Outside lines
		ctx.beginPath();
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.lineWidth = 10;
      	ctx.strokeStyle = "#FFF";
      	ctx.stroke();
      	ctx.closePath();

      	//Home Endzone
      	ctx.beginPath();
      	ctx.rect(5, 5, canvas.width - 10, 30);
      	ctx.fillStyle = "blue";
      	ctx.fill();
      	ctx.lineWidth = 2;
      	ctx.strokeStyle = "#FFF";
      	ctx.stroke();
      	ctx.closePath();

      	//Away Endzone
      	ctx.beginPath();
      	ctx.rect(5, canvas.height - 35, canvas.width - 10, 30);
      	ctx.fillStyle = "blue";
      	ctx.fill();
      	ctx.lineWidth = 2;
      	ctx.strokeStyle = "#FFF";
      	ctx.stroke();
      	ctx.closePath();

      	//50 Yard Line
      	ctx.beginPath();
      	ctx.rect(0, canvas.height / 2, canvas.width, 1);
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();

      	//10 Yard LIne
		ctx.beginPath();
      	ctx.rect(0, 89.6, canvas.width, 1);
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();

      	//20 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6, canvas.width, 1);
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();

      	//30 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6 * 2, canvas.width, 1);
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();

      	//40 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6 * 3, canvas.width, 1);
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();     	


      	//60 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6 * 5, canvas.width, 1);
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();

      	//70 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6 * 6, canvas.width, 1);
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();


      	//70 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6 * 7, canvas.width, 1);
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();

      	//80 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6 * 8, canvas.width, 1);
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();

      	//90 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6 * 9, canvas.width, 1);
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();
	}
}


// Modal and Button click functions

// When the user clicks on <playAgainBtn> close the modal and start over
tackledModalBtn.onclick = function() {
    if (!game.player1IsAlive && !game.player2IsAlive) {
    	tackledModal.style.display = "none";
    	gameOverModal.style.display = "block";
    } else {
    	game.changePlayer();
    	tackledModal.style.display = "none";
    	startGame();
    }
}

touchdownModalBtn.onclick = function() {
	game.updateScoreboard();
	game.changePlayer();
	touchdownModal.style.display = "none";
	startGame();
}

howToBtn.onclick = function() {
	howToModel.style.display = "block";	
}

howToModalBtn.onclick = function() {
	howToModel.style.display = "none";	
}

startGameBtn.onclick = function() {
	startModel.style.display = "block";	
}

onePlayerBtn.onclick = function() {
	game.player1IsAlive = true;
	startModel.style.display = "none";
	game.chooseCharacter1();
	// chooseCharModal.style.display = "block";
	// startGame();
}

twoPlayerBtn.onclick = function() {
	game.player1IsAlive = true;
	
	game.player2IsAlive = true;
	startModel.style.display = "none";	
	game.chooseCharacter1();
	// chooseCharModal.style.display = "block";
	// startGame();
}

gameOverModalBtn.onclick = function() {
	gameOverModal.style.display = "none";
	game.resetScoreboard();
}






//User Movement event listeners
document.addEventListener('keydown', function(event){
	let key = event.which;

	// Returns which key is being pressed
	// console.log(event.which)
	if (key === 39) {
		game.activeChar.direction = 'right';
		game.activeChar.move();
		game.activeChar.drawBody();
	} else if(key === 37){
		game.activeChar.direction = 'left';
		game.activeChar.move();
		game.activeChar.drawBody();
	} else if(key === 38){
		game.activeChar.direction = 'up';
		game.activeChar.move();
		game.activeChar.drawBody();
	}
	else if(key === 40){
		game.activeChar.direction = 'down';
		game.activeChar.move();
		game.activeChar.drawBody();
	}
	else if(key === 65){
		game.activeChar.direction = 'juke left';
		game.activeChar.move();
		game.activeChar.drawBody();
	}
	else if(key === 83){
		game.activeChar.direction = 'juke right';
		game.activeChar.move();
		game.activeChar.drawBody();
	}
	else if(key === 87){
		game.activeChar.direction = 'truck';
		game.activeChar.move();
		game.activeChar.drawBody();
	}
});


//Draws the lines on the field
fieldLines.draw();

//Starts the game - runs no button click
const startGame = function() {
	document.getElementById('logo').innerText = game.turn;
	document.getElementById('round-display').innerText = game.round;
	factory.createOpponent()
	game.activeChar.initBody();
	game.placeOpponents();
	game.animateCanvas();
	game.startOpp();
}


























