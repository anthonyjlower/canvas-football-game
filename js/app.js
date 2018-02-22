// Canvas Variables
const canvas = document.getElementById('field');
const ctx = canvas.getContext("2d");

//Character Images
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


// User controlled character class
class Player {
	constructor (name, speed, jukeDist, size, image){
		this.name = name;
		this.speed = speed;
		this.jukeDist = jukeDist;
		this.size = size;
		this.body = {};
		this.image = image
		this.direction = "up";
	}
	initBody(){
		this.body = {x: canvas.width / 2, y: canvas.height - 40, r: this.size, e: 0};
	}
	drawBody(){
		if (this.direction === "left") {
			ctx.drawImage(this.image, 66, 66, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		} else if (this.direction === "right") {
			ctx.drawImage(this.image, 66, 132, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		} else if (this.direction === "down") {
			ctx.drawImage(this.image, 66, 0, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		} else {
			ctx.drawImage(this.image, 66, 198, 66, 66, this.body.x, this.body.y, this.size, this.size);	
		}	
	}
	move(){
		if (this.direction === 'right') {
			if (this.body.x + this.speed < canvas.width - 30) {
				this.body = {x: this.body.x + this.speed, y: this.body.y, r: this.size, e:0};
			}
		} else if (this.direction === 'juke right'){
			if (this.body.x + this.jukeDist < canvas.width - 30) {
				this.body = {x: this.body.x + this.jukeDist, y: this.body.y, r: this.size, e:0};
			}
		} else if (this.direction === 'left'){
			if (this.body.x - this.speed > 0) {
				this.body = {x: this.body.x - this.speed, y: this.body.y, r: this.size, e:0};
			}
		} else if (this.direction === 'juke left'){	
			if (this.body.x - this.jukeDist > 0) {
				this.body = {x: this.body.x - this.jukeDist, y: this.body.y, r: this.size, e:0};
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

// Player class instances
const runningBack = new Player("runningback", 8, 30, 30, rbSprite);
const safety = new Player('safety', 10, 20, 30, fsSprite);
const wideReceiver = new Player('wide receiver', 12, 15, 30, wrSprite)



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

// Creates opponents
const factory = {
	roster: [],
	createOpponent() {
		for(let i = 1; i <= game.round + 6; i++){
			// Instantiates the opponenet class and pushes them to roster
			const newPlayer = new Opponent(this.roster.length);
			this.roster.push(newPlayer);
		}
	}
}

const game = {
	round: 1,
	player1Score: 0,
	player2Score: 0,
	player1Char: runningBack,
	player2Char: runningBack,
	activeChar: runningBack,
	turn: "Player 1",
	player1IsAlive: true,
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
	//Look for collisions between the user and the computer characters
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
	// Look for a user getting into the endzone
	scoreTd: function() {
		if (game.activeChar.body.y < 30) {
			this.stopOpp();
			touchdownModal.style.display = "block";
		}
	},
	// Computer controlled users start to move
	startOpp: function() {
		this.timer = setInterval(()=>{
			for(let i = 0; i < factory.roster.length; i++){
				factory.roster[i].move();
			}
		},250)
	},
	//Computer controlled users stop moving
	stopOpp: function() {
		clearInterval(this.timer);
	},
	//Computer controlled users are placed on the canvas
	placeOpponents: function() {
		for(let i = 0; i < factory.roster.length; i++){
			factory.roster[i].initBody();
		}
	},
	// Alternate between player 1 and player2 in multiplayer mode
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
		} else if (this.turn === "Player 2" && !this.player1IsAlive) {
			this.round++;
		}
	},
	// Updates game data when a player is tackled and clears the roster
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
	// Updates scoreboard and clears the roster on touchdowns
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
	// Updates scoreboard, turn, round, and resets roster after all users are tackled
	resetScoreboard: function() {
		factory.roster = [];
    this.player1Score = 0;
    this.player2Score = 0;
    this.turn = "Player 1";
    this.round = 1;
    this.player1Char = {};
    this.player2Char = {};
    document.getElementById('player1Points').innerText = this.player1Score;
    document.getElementById('player2Points').innerText = this.player2Score;
    document.getElementById('logo').innerText = game.turn;
		document.getElementById('round-display').innerText = game.round;
	},
	// Allows player 1 to select the character they want to play with and assigns it to the game attribute
	// chooseCharacter1: function() {
	// 	console.log('in chooseCharacter1')
	// 	chooseCharModal1.style.display = "block";
	// 	const charBtns = document.getElementsByClassName('char-btn1')
	// 	let selectedChar = ""

	// 	for(let i = 0; i < charBtns.length; i++){
	// 		charBtns[i].addEventListener("click",function(event) {
	// 		selectedChar = this.id;
	// 			if (selectedChar === "runningBack") {
	// 				game.player1Char = runningBack;
	// 				game.activeChar = game.player1Char;
	// 				game.needToPick();
	// 			} else if(selectedChar === "wideReceiver"){
	// 				game.player1Char = wideReceiver;
	// 				game.activeChar = game.player1Char;
	// 				game.needToPick();
	// 			} else if(selectedChar === "safety"){
	// 				game.player1Char = safety;
	// 				game.activeChar = game.player1Char;
	// 				game.needToPick();
	// 			}
	// 		})
	// 	}
	// },
	// // Allows player 2 to select the character they want to play with and assigns it to the game attribute
	// chooseCharacter2: function() {
	// 	console.log("chooseCharacter2")
	// 	chooseCharModal2.style.display = "block";
	// 	const charBtns = document.getElementsByClassName('char-btn2')
	// 	let secondChar = ""

	// 	for(let i = 0; i < charBtns.length; i++){
	// 		charBtns[i].addEventListener("click",function(event) {
	// 		secondChar = this.id;
	// 			if (secondChar === "runningBack") {
	// 				game.player2Char = runningBack;
	// 				chooseCharModal2.style.display = 'none';
	// 				startGame();
	// 			} else if(secondChar === "wideReceiver"){
	// 				game.player2Char = wideReceiver;
	// 				chooseCharModal2.style.display = 'none';
	// 				startGame();
	// 			} else if(secondChar === "safety"){
	// 				game.player2Char = safety;
	// 				chooseCharModal2.style.display = 'none';
	// 				startGame();
	// 			}
	// 		})
	// 	}
	// },
	// After player1 selects their character checks to see if player 2 should select theirs
	// needToPick: function() {
	// 	console.log('in needToPick')
	// 	if (this.player2IsAlive) {
	// 		chooseCharModal1.style.display = "none"
	// 		this.chooseCharacter2();
	// 	} else {
	// 		chooseCharModal1.style.display = "none"
	// 		startGame()
	// 	}
	// }
	
}

/*******
Field Design -- Draws the field lines
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


/********
Modal and Button click functions
*********/

//Button click on modal that is displayed when a player is tackled
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

//Button click on modal that is displayed when a player scores
touchdownModalBtn.onclick = function() {
	game.updateScoreboard();
	game.changePlayer();
	touchdownModal.style.display = "none";
	startGame();
}

//Displays modal with instructions when someone clicks on the how to button
howToBtn.onclick = function() {
	howToModel.style.display = "block";	
}

//Button click on the modal that displays the how-to-play instructions
howToModalBtn.onclick = function() {
	howToModel.style.display = "none";	
}

//Displays a modal when a player clicks on the start game button
startGameBtn.onclick = function() {
	startModel.style.display = "block";	
	// startGame();
}

//Button click on 1 Player mode in the start Game Modal
onePlayerBtn.onclick = function() {
	game.player1IsAlive = true;
	startModel.style.display = "none";
	// game.chooseCharacter1();
	startGame();
}

//Button click on the 2 player mode in the start game modal
twoPlayerBtn.onclick = function() {
	game.player1IsAlive = true;
	game.player2IsAlive = true;
	startModel.style.display = "none";	
	// game.chooseCharacter1();
	startGame();
}

//Buttonn click on the game over modal displayed when both users are tackled
gameOverModalBtn.onclick = function() {
	gameOverModal.style.display = "none";
	game.resetScoreboard();
}






//User Movement event listeners
document.addEventListener('keydown', function(event){
	let key = event.which;

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

//Starts the game
const startGame = function() {
	document.getElementById('logo').innerText = game.turn;
	document.getElementById('round-display').innerText = game.round;
	factory.createOpponent();
	game.activeChar.initBody();
	game.placeOpponents();
	game.animateCanvas();
	game.startOpp();
}