const player = function(name, role){
	let score = 0
	const getScore = function(){ return score }
	const addScore = function(){ score++ }
	 return {name, role, getScore, addScore}
}

const X = player('', 'X')
const O = player('', 'O')

const start = document.querySelector('#play')
start.addEventListener('click', () => {
	const player1 = document.querySelector('#player1')
	const player2 = document.querySelector('#player2')
	if (player1.value && player2.value){
		X.name = player1.value;
		O.name = player2.value;
	}
})

const gamecontrols = function(){
	const gameboard = []
	let currentPlayer = X
	const showGameboard = function(){return gameboard}
	const check_status = function (){
		if((gameboard[0] === gameboard[1] &&  gameboard[0] === gameboard[2]) || (gameboard[0] === gameboard[3] &&  gameboard[0] === gameboard[6]) || (gameboard[0] === gameboard[4] &&  gameboard[0] === gameboard[8]) && (gameboard[0] !== undefined)){return gameboard[0]}
		else if (gameboard[1] === gameboard[4] &&  gameboard[1] === gameboard[7] && gameboard[1] !== undefined){return gameboard[1]}
		
		else if ((gameboard[2] === gameboard[5] &&  gameboard[2] === gameboard[8]) || (gameboard[2] === gameboard[4] &&  gameboard[2] === gameboard[6]) && (gameboard[2] !== undefined)) {return gameboard[2]}
		
		else if (gameboard[3] === gameboard[4] &&  gameboard[3] === gameboard[5] && gameboard[3] !== undefined){return gameboard[3]}
		
		else if (gameboard[6] === gameboard[7] && gameboard[6] === gameboard[8] && gameboard[6] !== undefined){return gameboard[6]}
		
		else if ((!undefined in gameboard) && (gameboard.length === 9)){return 'draw'}
	}
	const play_at = function(area){
		gameboard[area] = this.currentPlayer.role;
	}
	
	const switchPlayer = function(){
		this.currentPlayer = (this.currentPlayer === X) ? O : X
	}
	return {currentPlayer, showGameboard, play_at, check_status, switchPlayer};
}()

/*const displaycontrols = function(){
	const displayGame = function () {
		const body = document.querySelector('body')
		body.textContent = '';
		const game = document.createElement('div')
		game.classList.add('game')
		const score = document.createElement('div')
		score.classList.add('score')
		
	}
	
}()*/