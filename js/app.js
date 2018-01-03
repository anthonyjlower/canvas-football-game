// Game Variables
const canvas = document.getElementById('field');
const ctx = canvas.getContext("2d");
let round = 1;
let player1Score = 0;
let player2Score = 0;
let turn = "Player 1";
let player1IsAlive = false;
let player2IsAlive = false;
let timer;


//Button and Modal selectors
const playAgainBtn = document.getElementById('play-again');
const tackledModal = document.getElementById('tackled-modal');
const nextRoundBtn = document.getElementById("next-round");
const touchDownModal = document.getElementById("touchdown-modal");
const howToBtn = document.getElementById('how-to');
const howToModel = document.getElementById('how-to-modal');
const startGameBtn = document.getElementById('start-game');
const closeBtn = document.getElementById('close');
const startModel = document.getElementById('start-modal');
const onePlayerBtn = document.getElementById('one-player');
const twoPlayerBtn = document.getElementById('two-players');



//User Controlled Players
const runningBack = {
	body: {},
	direction: "",
	speed: 8,
	size: 8,
	initBody: function(){
		this.body = {x: canvas.width / 2, y: canvas.height - this.speed, r: this.size, e: 0}
	},
	drawBody: function() {
		ctx.beginPath();
		ctx.arc(this.body.x, this.body.y, this.body.r, this.body.e, Math.PI*2)
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();
	},
	move: function(){
		if (this.direction === 'right') {
			if (this.body.x + this.speed < canvas.width - 10) {
				this.body = {x: this.body.x + this.speed, y: this.body.y, r: this.size, e:0}
			}
		} else if (this.direction === 'juke right'){
			if (this.body.x + 30 < canvas.width - 10) {
				this.body = {x: this.body.x + 30, y: this.body.y, r: this.size, e:0}
			}
		} else if (this.direction === 'left'){
			if (this.body.x - this.speed > 10) {
				this.body = {x: this.body.x - this.speed, y: this.body.y, r: this.size, e:0}
			}
		} else if (this.direction === 'juke left'){	
			if (this.body.x - 30 > 30) {
				this.body = {x: this.body.x - 30, y: this.body.y, r: this.size, e:0}
			}
		} else if (this.direction === 'up'){
			if (this.body.y - this.speed > 0) {
				this.body = {x: this.body.x, y: this.body.y -this.speed, r: this.size, e:0}
			}
		} else if (this.direction === 'down'){
			if (this.body.y + this.speed < canvas.height) {
				this.body = {x: this.body.x, y: this.body.y +this.speed, r: this.size, e:0}
			}
		} else if (this.direction === 'truck'){
			if (this.body.y - 30 > 0) {
				this.body = {x: this.body.x, y: this.body.y - 30, r: this.size, e:0}
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
		this.size = 8;
		this.direction = "";
	}
	initBody(){
		this.body = {x: Math.floor(Math.random()*canvas.width), y: 142.2, r: this.size, e: 0}
	}
	drawBody() {
		ctx.beginPath();
		ctx.arc(this.body.x, this.body.y, this.body.r, this.body.e, Math.PI*2)
		ctx.fillStyle = 'red';
		ctx.fill();
		ctx.closePath();
	}
	move() {
		let randomNum = Math.floor(Math.random()*100)

		// 50% of the time the opponenet moves down
		if (randomNum <= 49) {
			if (this.body.y + this.speed < canvas.height - 10) {
				this.body = {x: this.body.x, y: this.body.y + this.speed, r: this.size, e:0}
				this.drawBody()
			}
		// 20% of the time the opponent moves left
		} else if (randomNum >= 50 && randomNum <= 69){	
			if (this.body.x - this.speed > 10) {
				this.body = {x: this.body.x - this.speed, y: this.body.y, r: this.size, e:0}
				this.drawBody()
			}
		// 20% of the time the opponent moves right
		} else if (randomNum >= 70 && randomNum <= 89){
			if (this.body.x + this.speed < canvas.width - 10) {
				this.body = {x: this.body.x + this.speed, y: this.body.y, r: this.size, e:0}
				this.drawBody()
			}
		//10% of the time the opponent move up
		} else {
			if (this.body.x - this.speed > 10) {
				this.body = {x: this.body.x, y: this.body.y - this.speed, r: this.size, e:0}
				this.drawBody()
			}
		}	
	}
};

const factory = {
	roster: [],
	createOpponent() {
		for(let i = 1; i <= round + 2; i++){
			const newPlayer = new Opponent(this.roster.length);
			this.roster.push(newPlayer);
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
      	ctx.rect(5, 5, canvas.width - 10, 30)
      	ctx.fillStyle = "blue";
      	ctx.fill();
      	ctx.lineWidth = 2;
      	ctx.strokeStyle = "#FFF";
      	ctx.stroke();
      	ctx.closePath();

      	//Away Endzone
      	ctx.beginPath();
      	ctx.rect(5, canvas.height - 35, canvas.width - 10, 30)
      	ctx.fillStyle = "blue";
      	ctx.fill();
      	ctx.lineWidth = 2;
      	ctx.strokeStyle = "#FFF";
      	ctx.stroke();
      	ctx.closePath();

      	//50 Yard Line
      	ctx.beginPath();
      	ctx.rect(0, canvas.height / 2, canvas.width, 1)
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();

      	//10 Yard LIne
		ctx.beginPath();
      	ctx.rect(0, 89.6, canvas.width, 1)
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();

      	//20 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6, canvas.width, 1)
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();

      	//30 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6 * 2, canvas.width, 1)
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();

      	//40 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6 * 3, canvas.width, 1)
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();     	


      	//60 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6 * 5, canvas.width, 1)
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();

      	//70 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6 * 6, canvas.width, 1)
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();


      	//70 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6 * 7, canvas.width, 1)
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();

      	//80 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6 * 8, canvas.width, 1)
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();

      	//90 Yard Line
		ctx.beginPath();
      	ctx.rect(0, 89.6 + 52.6 * 9, canvas.width, 1)
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();
	}
}


// Modal and Button click functions

// When the user clicks on <playAgainBtn> close the modal and start over
playAgainBtn.onclick = function() {
    factory.roster = [];
    player1Score = 0;
    document.getElementById('player1Points').innerText = player1Score;
    round = 1;
    document.getElementById('round-display').innerText = round;
    tackledModal.style.display = "none";
}

nextRoundBtn.onclick = function() {
	updateScoreboard();
	changePlayer();
	touchDownModal.style.display = "none";
	startGame();
}

howToBtn.onclick = function() {
	howToModel.style.display = "block";	
}

closeBtn.onclick = function() {
	howToModel.style.display = "none";	
}

startGameBtn.onclick = function() {
	startModel.style.display = "block";	
}

onePlayerBtn.onclick = function() {
	player1IsAlive = true
	startModel.style.display = "none";
	startGame();
}

twoPlayerBtn.onclick = function() {
	player1IsAlive = true
	player2IsAlive = true
	startModel.style.display = "none";	
	startGame();
}


const updateScoreboard = function() {
	if (turn === "Player 1") {
		factory.roster = []
		player1Score += 7;
    	document.getElementById('player1Points').innerText = player1Score;
	} else{
		factory.roster = []
		player2Score += 7;
		document.getElementById('player2Points').innerText = player2Score;
	}
}

const updateLives = function() {
	if (turn === "Player 1") {
		player1IsAlive = false;
	} else {
		player2IsAlive = false;
	}
	tackledModal.style.display = "block";
}

const changePlayer = function() {
	if(turn === "Player 1" && player2IsAlive) {
		turn = "Player 2";
	} else if (turn === "Player 1" && !player2IsAlive) {
		round++
	} else if (turn === "Player 2" && player1IsAlive) {
		turn = "Player 1";
		round++;
	} else if (turn === "Player 2" && !player1IsAlive){
		round++;
	}
};





//Animate the canvas
let animateCanvas = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	collisionDetection();
	scoreTd();
	fieldLines.draw();
	runningBack.drawBody();
	for(let i = 0; i < factory.roster.length; i++){
		factory.roster[i].drawBody();
	}
	window.requestAnimationFrame(animateCanvas)
};


//Start the loop that moves opponents
const startOpp = function() {
	timer = setInterval(()=>{
		for(let i = 0; i < factory.roster.length; i++){
			factory.roster[i].move();
		}
	},250)
};	

//Kills the loop that moves opponents
const stopOpp = function() {
	clearInterval(timer)
};

//Puts the opponent markers on the field
const placeOpponents = function() {
	for(let i = 0; i < factory.roster.length; i++){
		factory.roster[i].initBody()
	}
};

//Looks for a tackle
const collisionDetection = function() {
	let playerX = runningBack.body.x;
	let playerY = runningBack.body.y;

	for(let i = 0; i < factory.roster.length; i++){
		let oppX = factory.roster[i].body.x;
		let oppY = factory.roster[i].body.y;

		let xDiff = Math.abs(playerX - oppX);
		let yDiff = Math.abs(playerY - oppY);

		if (xDiff <= runningBack.size && yDiff <= runningBack.size) {
			stopOpp();
			updateLives()
		}
	}
};

//Stops the game - runs when collisions are detected
const endGame = function() {
	stopOpp()
};

//Stope ths game - runs when the user gets into the endzone
const scoreTd = function() {
	if (runningBack.body.y < 30) {
		stopOpp();
		touchDownModal.style.display = "block";
	};
}






//User Movement event listeners
document.addEventListener('keydown', function(event){
	let key = event.which;

	// Returns which key is being pressed
	// console.log(event.which)
	if (key === 39) {
		runningBack.direction = 'right';
		runningBack.move();
		runningBack.drawBody();
	} else if(key === 37){
		runningBack.direction = 'left'
		runningBack.move();
		runningBack.drawBody();
	} else if(key === 38){
		runningBack.direction = 'up'
		runningBack.move();
		runningBack.drawBody();
	}
	else if(key === 40){
		runningBack.direction = 'down'
		runningBack.move();
		runningBack.drawBody();
	}
	else if(key === 65){
		runningBack.direction = 'juke left'
		runningBack.move();
		runningBack.drawBody();
	}
	else if(key === 83){
		runningBack.direction = 'juke right'
		runningBack.move();
		runningBack.drawBody();
	}
	else if(key === 87){
		runningBack.direction = 'truck'
		runningBack.move();
		runningBack.drawBody();
	}
})




//Draws the lines on the field
fieldLines.draw();

//Starts the game - runs no button click
const startGame = function() {
	document.getElementById('logo').innerText = turn;
	factory.createOpponent()
	runningBack.initBody();
	placeOpponents();
	animateCanvas();
	startOpp();
}


console.log(player1IsAlive)
console.log(player2IsAlive)
























