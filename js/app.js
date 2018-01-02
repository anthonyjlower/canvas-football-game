// console.log("working")


const canvas = document.getElementById('field');
const ctx = canvas.getContext("2d");
const round = 1;
const score = 0;
const turn = "Player 1";

const runningBack = {
	body: {},
	direction: "",
	initHero: function(){
		this.body = {x: 200, y: 600, r: 12.5, e: 0}
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
			if (this.body.x + 10 < 600) {
				this.body = {x: this.body.x + 10, y: this.body.y, r: 12.5, e:0}
			}
		} else if (this.direction === 'juke right'){	
			this.body = {x: this.body.x + 30, y: this.body.y, r: 12.5, e:0}
		} else if (this.direction === 'left'){
			this.body = {x: this.body.x - 10, y: this.body.y, r: 12.5, e:0}
		} else if (this.direction === 'juke left'){	
			this.body = {x: this.body.x - 30, y: this.body.y, r: 12.5, e:0}
		} else if (this.direction === 'up'){
			this.body = {x: this.body.x, y: this.body.y -10, r: 12.5, e:0}
		} else if (this.direction === 'down'){
			this.body = {x: this.body.x, y: this.body.y +10, r: 12.5, e:0}
		} else if (this.direction === 'truck'){
			this.body = {x: this.body.x, y: this.body.y - 30, r: 12.5, e:0}
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
	initOpponent(){
		this.body = {x: 200, y: 0, r: 12.5, e: 0}
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
			this.body = {x: this.body.x, y: this.body.y + this.speed, r: 12.5, e:0}
			this.drawBody()
		// 20% of the time the opponent moves left
		} else if (randomNum >= 50 && randomNum <= 69){	
			this.body = {x: this.body.x - this.speed, y: this.body.y, r: 12.5, e:0}
			this.drawBody()
		// 20% of the time the opponent moves right
		} else if (randomNum >= 70 && randomNum <= 89){	
			this.body = {x: this.body.x + this.speed, y: this.body.y, r: 12.5, e:0}
			this.drawBody()
		//10% of the time the opponent move up
		} else {
			this.body = {x: this.body.x, y: this.body.y - this.speed, r: 12.5, e:0}
			this.drawBody()
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




// const opponent = {
// 		speed: 10,
// 		body: {},
// 	initOpponent(){
// 		this.body = {x: 200, y: 0, r: 12.5, e: 0}
// 	},
// 	drawBody() {
// 		ctx.beginPath();
// 		ctx.arc(this.body.x, this.body.y, this.body.r, this.body.e, Math.PI*2)
// 		ctx.strokeStyle = 'blue';
// 		ctx.fill();
// 		ctx.closePath();
// 	},
	// move: function(){
		
	// 	let randomNum = Math.floor(Math.random()*100)

	// 	// 50% of the time the opponenet moves down
	// 	if (randomNum <= 49) {
	// 		this.body = {x: this.body.x, y: this.body.y + this.speed, r: 12.5, e:0}
	// 		this.drawBody()
	// 	// 20% of the time the opponent moves left
	// 	} else if (randomNum >= 50 && randomNum <= 69){	
	// 		this.body = {x: this.body.x - this.speed, y: this.body.y, r: 12.5, e:0}
	// 		this.drawBody()
	// 	// 20% of the time the opponent moves right
	// 	} else if (randomNum >= 70 && randomNum <= 89){	
	// 		this.body = {x: this.body.x + this.speed, y: this.body.y, r: 12.5, e:0}
	// 		this.drawBody()
	// 	//10% of the time the opponent move up
	// 	} else {
	// 		this.body = {x: this.body.x, y: this.body.y - this.speed, r: 12.5, e:0}
	// 		this.drawBody()
	// 	}	
	// }
// };




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
	runningBack.drawBody();
	factory.roster[0].drawBody();
	window.requestAnimationFrame(animateCanvas)
}


let intervalID = setInterval(()=>{
		factory.roster[0].move()
	}, 500)


factory.createOpponent()
runningBack.initHero();
factory.roster[0].initOpponent();
animateCanvas();
















