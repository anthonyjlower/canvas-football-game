// console.log("working")


const canvas = document.getElementById('field');
const ctx = canvas.getContext("2d");
const round = 1;
const score = 0;
const turn = "Player 1";
let timer;

const runningBack = {
	body: {},
	direction: "",
	initBody: function(){
		this.body = {x: 200, y: 590, r: 12.5, e: 0}
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
			if (this.body.x + 10 < 400	) {
				this.body = {x: this.body.x + 10, y: this.body.y, r: 12.5, e:0}
			}
		} else if (this.direction === 'juke right'){
			if (this.body.x + 30 < 400) {
				this.body = {x: this.body.x + 30, y: this.body.y, r: 12.5, e:0}
			}
		} else if (this.direction === 'left'){
			if (this.body.x - 10 > 0) {
				this.body = {x: this.body.x - 10, y: this.body.y, r: 12.5, e:0}
			}
		} else if (this.direction === 'juke left'){	
			if (this.body.x - 30 > 0) {
				this.body = {x: this.body.x - 30, y: this.body.y, r: 12.5, e:0}
			}
		} else if (this.direction === 'up'){
			if (this.body.y - 10 > 0) {
				this.body = {x: this.body.x, y: this.body.y -10, r: 12.5, e:0}
			}
		} else if (this.direction === 'down'){
			if (this.body.y + 10 < 600) {
				this.body = {x: this.body.x, y: this.body.y +10, r: 12.5, e:0}
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
		this.body = {x: Math.floor(Math.random()*400), y: 10, r: 12.5, e: 0}
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
			if (this.body.y + this.speed < 600) {
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
			if (this.body.x + this.speed < 400) {
				this.body = {x: this.body.x + this.speed, y: this.body.y, r: 12.5, e:0}
				this.drawBody()
			}
		//10% of the time the opponent move up
		} else {
			if (this.body.x - this.speed > 0	) {
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



document.addEventListener('keydown', function(event){
	let key = event.which;

	// Returns which key is being pressed
	console.log(event.which)
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






let animateCanvas = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	collisionDetection();
	runningBack.drawBody();
	for(let i = 0; i < factory.roster.length; i++){
		factory.roster[i].drawBody();
	}
	window.requestAnimationFrame(animateCanvas)
}


//Start the loop that moves opponents
var startOpp = function() {
	timer = setInterval(()=>{
		for(let i = 0; i < factory.roster.length; i++){
			factory.roster[i].move();
		}
	},500)
}	

//Kills the loop that moves opponents
var stopOpp = function() {
	clearInterval(timer)
};

//Puts the opponent markers on the field
const placeOpponents = function() {
	for(let i = 0; i < factory.roster.length; i++){
		factory.roster[i].initBody()
	}
}

const collisionDetection = function() {
	let playerX = runningBack.body.x;
	let playerY = runningBack.body.y;

	for(let i = 0; i < factory.roster.length; i++){
		let oppX = factory.roster[i].body.x;
		let oppY = factory.roster[i].body.y;

		let xDiff = Math.abs(playerX - oppX);
		let yDiff = Math.abs(playerY - oppY);

		if (xDiff <= 12.5 && yDiff <= 12.5) {
			console.log("tackle")
		}
	}
}




factory.createOpponent()
runningBack.initBody();
placeOpponents();
animateCanvas();
















