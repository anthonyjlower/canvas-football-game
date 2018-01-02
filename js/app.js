// console.log("working")

const canvas = document.getElementById('field');
const ctx = canvas.getContext("2d");
let round = 1;
let player1Score = 0;
const turn = "Player 1";
let timer;
const fieldWidth = document.getElementById('field').width;
const fieldHeight = document.getElementById('field').height;

const playAgainBtn = document.getElementById('play-again');
const tackledModal = document.getElementById('tackled-modal');
const nextRoundBtn = document.getElementById("next-round");
const touchDownModal = document.getElementById("touchdown-modal");
const howToBtn = document.getElementById('how-to');
const howToModel = document.getElementById('how-to-modal');
const startGameBtn = document.getElementById('start-game');
const closeBtn = document.getElementById('close');


const runningBack = {
	body: {},
	direction: "",
	speed: 10,
	initBody: function(){
		this.body = {x: fieldWidth / 2, y: fieldHeight - this.speed, r: 12.5, e: 0}
	},
	drawBody: function() {
		ctx.beginPath();
		ctx.arc(this.body.x, this.body.y, this.body.r, this.body.e, Math.PI*2)
		ctx.strokeStyle = 'black';
		ctx.fill();
		ctx.closePath();
	},
	move: function(){
		if (this.direction === 'right') {
			if (this.body.x + this.speed < fieldWidth - 10) {
				this.body = {x: this.body.x + this.speed, y: this.body.y, r: 12.5, e:0}
			}
		} else if (this.direction === 'juke right'){
			if (this.body.x + 30 < fieldWidth - 10) {
				this.body = {x: this.body.x + 30, y: this.body.y, r: 12.5, e:0}
			}
		} else if (this.direction === 'left'){
			if (this.body.x - this.speed > 10) {
				this.body = {x: this.body.x - this.speed, y: this.body.y, r: 12.5, e:0}
			}
		} else if (this.direction === 'juke left'){	
			if (this.body.x - 30 > 30) {
				this.body = {x: this.body.x - 30, y: this.body.y, r: 12.5, e:0}
			}
		} else if (this.direction === 'up'){
			if (this.body.y - this.speed > 0) {
				this.body = {x: this.body.x, y: this.body.y -this.speed, r: 12.5, e:0}
			}
		} else if (this.direction === 'down'){
			if (this.body.y + this.speed < fieldHeight) {
				this.body = {x: this.body.x, y: this.body.y +this.speed, r: 12.5, e:0}
			}
		} else if (this.direction === 'truck'){
			if (this.body.y - 30 > 0) {
				this.body = {x: this.body.x, y: this.body.y - 30, r: 12.5, e:0}
			}
		}
	}
}


class Opponent {
	constructor(number){
		this.number = number;
		this.speed = 10;
		this.body = {};
		this.direction = "";
	}
	initBody(){
		this.body = {x: Math.floor(Math.random()*fieldWidth), y: this.speed, r: 12.5, e: 0}
	}
	drawBody() {
		ctx.beginPath();
		ctx.arc(this.body.x, this.body.y, this.body.r, this.body.e, Math.PI*2)
		ctx.strokeStyle = 'black';
		ctx.fill();
		ctx.closePath();
	}
	move() {
		let randomNum = Math.floor(Math.random()*100)

		// 50% of the time the opponenet moves down
		if (randomNum <= 49) {
			if (this.body.y + this.speed < fieldHeight - 10) {
				this.body = {x: this.body.x, y: this.body.y + this.speed, r: 12.5, e:0}
				this.drawBody()
			}
		// 20% of the time the opponent moves left
		} else if (randomNum >= 50 && randomNum <= 69){	
			if (this.body.x - this.speed > 10) {
				this.body = {x: this.body.x - this.speed, y: this.body.y, r: 12.5, e:0}
				this.drawBody()
			}
		// 20% of the time the opponent moves right
		} else if (randomNum >= 70 && randomNum <= 89){
			if (this.body.x + this.speed < fieldWidth - 10) {
				this.body = {x: this.body.x + this.speed, y: this.body.y, r: 12.5, e:0}
				this.drawBody()
			}
		//10% of the time the opponent move up
		} else {
			if (this.body.x - this.speed > 10) {
				this.body = {x: this.body.x, y: this.body.y - this.speed, r: 12.5, e:0}
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
		ctx.rect(0, 0, fieldWidth, fieldHeight);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.lineWidth = 10;
      	ctx.strokeStyle = "#FFF";
      	ctx.stroke();
      	ctx.closePath();
      	ctx.fillStyle = "#FFF";

      	//Home Endzone
      	ctx.beginPath();
      	ctx.rect(5, 5, fieldWidth - 10, 30)
      	ctx.fillStyle = "blue";
      	ctx.fill();
      	ctx.lineWidth = 4;
      	ctx.strokeStyle = "#FFF";
      	ctx.stroke();
      	ctx.closePath();
      	ctx.fillStyle = "#FFF"

      	//Away Endzone
      	ctx.beginPath();
      	ctx.rect(5, fieldHeight - 35, fieldWidth - 10, 30)
      	ctx.fillStyle = "blue";
      	ctx.fill();
      	ctx.lineWidth = 4;
      	ctx.strokeStyle = "#FFF";
      	ctx.stroke();
      	ctx.closePath();
      	ctx.fillStyle = "#FFF"

      	//50 Yard Line
      	ctx.beginPath();
      	ctx.rect(0, fieldHeight / 2, fieldWidth, 1)
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();

      	//25 Yard LIne
		ctx.beginPath();
      	ctx.rect(0, fieldHeight / 4, fieldWidth, 1)
      	ctx.fillStyle = "white";
      	ctx.fill();
      	ctx.stroke();
      	ctx.closePath();      	
	}
}



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


// When the user clicks on <playAgainBtn> close the modal and start over
playAgainBtn.onclick = function() {
    factory.roster = [];
    player1Score = 0;
    document.getElementById('player1Points').innerText = player1Score;
    round = 1;
    tackledModal.style.display = "none";
}

nextRoundBtn.onclick = function() {
	factory.roster = [];
	round++;
	player1Score += 7;
    document.getElementById('player1Points').innerText = player1Score;
    document.getElementById('round-display').innerText = round;
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
	startGame();	
}

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
var startOpp = function() {
	timer = setInterval(()=>{
		for(let i = 0; i < factory.roster.length; i++){
			factory.roster[i].move();
		}
	},250)
};	

//Kills the loop that moves opponents
var stopOpp = function() {
	clearInterval(timer)
};

//Puts the opponent markers on the field
const placeOpponents = function() {
	for(let i = 0; i < factory.roster.length; i++){
		factory.roster[i].initBody()
	}
};

const collisionDetection = function() {
	let playerX = runningBack.body.x;
	let playerY = runningBack.body.y;

	for(let i = 0; i < factory.roster.length; i++){
		let oppX = factory.roster[i].body.x;
		let oppY = factory.roster[i].body.y;

		let xDiff = Math.abs(playerX - oppX);
		let yDiff = Math.abs(playerY - oppY);

		if (xDiff <= 12.5 && yDiff <= 12.5) {
			endGame()
		}
	}
};

const endGame = function() {
	stopOpp()
	tackledModal.style.display = "block";
};

const scoreTd = function() {
	if (runningBack.body.y < 30) {
		stopOpp();
		touchDownModal.style.display = "block";
	};
}

fieldLines.draw();




const startGame = function() {
	factory.createOpponent()
	runningBack.initBody();
	placeOpponents();
	animateCanvas();
	startOpp();
}




























