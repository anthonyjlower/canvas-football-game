// console.log("working")


const canvas = document.getElementById('field');
const ctxHero = canvas.getContext("2d");
const ctxOpp = canvas.getContext("2d");
const endZone = canvas.getContext("2d");
let round = 1;
let score = 0;
const turn = "Player 1";
let timer;
const fieldWidth = document.getElementById('field').width;
const fieldHeight = document.getElementById('field').height;


const playAgainBtn = document.getElementById('play-again');
const tackledModal = document.getElementById('tackled-modal');
const nextRoundBtn = document.getElementById("next-round");
const touchDownModal = document.getElementById("touchdown-modal");


const runningBack = {
	body: {},
	direction: "",
	speed: 10,
	initBody: function(){
		this.body = {x: fieldWidth / 2, y: fieldHeight - this.speed, r: 12.5, e: 0}
	},
	drawBody: function() {
		ctxHero.beginPath();
		ctxHero.arc(this.body.x, this.body.y, this.body.r, this.body.e, Math.PI*2)
		ctxHero.strokeStyle = 'black';
		ctxHero.fill();
		ctxHero.closePath();
	},
	move: function(){
		if (this.direction === 'right') {
			if (this.body.x + this.speed < fieldWidth	) {
				this.body = {x: this.body.x + this.speed, y: this.body.y, r: 12.5, e:0}
			}
		} else if (this.direction === 'juke right'){
			if (this.body.x + 30 < fieldWidth) {
				this.body = {x: this.body.x + 30, y: this.body.y, r: 12.5, e:0}
			}
		} else if (this.direction === 'left'){
			if (this.body.x - this.speed > 0) {
				this.body = {x: this.body.x - this.speed, y: this.body.y, r: 12.5, e:0}
			}
		} else if (this.direction === 'juke left'){	
			if (this.body.x - 30 > 0) {
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
		ctxOpp.beginPath();
		ctxOpp.arc(this.body.x, this.body.y, this.body.r, this.body.e, Math.PI*2)
		ctxOpp.strokeStyle = 'white';
		ctxOpp.fill();
		ctxOpp.closePath();
	}
	move() {
		let randomNum = Math.floor(Math.random()*100)

		// 50% of the time the opponenet moves down
		if (randomNum <= 49) {
			if (this.body.y + this.speed < fieldHeight) {
				this.body = {x: this.body.x, y: this.body.y + this.speed, r: 12.5, e:0}
				this.drawBody()
			}
		// 20% of the time the opponent moves left
		} else if (randomNum >= 50 && randomNum <= 69){	
			if (this.body.x - this.speed > 0) {
				this.body = {x: this.body.x - this.speed, y: this.body.y, r: 12.5, e:0}
				this.drawBody()
			}
		// 20% of the time the opponent moves right
		} else if (randomNum >= 70 && randomNum <= 89){
			if (this.body.x + this.speed < fieldWidth) {
				this.body = {x: this.body.x + this.speed, y: this.body.y, r: 12.5, e:0}
				this.drawBody()
			}
		//10% of the time the opponent move up
		} else {
			if (this.body.x - this.speed > 0) {
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
    score = 0;
    round = 1;
    tackledModal.style.display = "none";
    startGame()
}

nextRoundBtn.onclick = function() {
	factory.roster = [];
	score += 7;
	round++;
	touchDownModal.style.display = "none";
	startGame();
}



let animateCanvas = function() {
	ctxHero.clearRect(0, 0, canvas.width, canvas.height);
	ctxOpp.clearRect(0, 0, canvas.width, canvas.height);
	collisionDetection();
	scoreTd();
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
	},500)
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
	if (runningBack.body.y < 15) {
		stopOpp();
		touchDownModal.style.display = "block";
	};
}




















const startGame = function() {
	factory.createOpponent()
	runningBack.initBody();
	placeOpponents();
	animateCanvas();
	startOpp();
}




























