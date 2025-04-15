const player = function(name, role){
	let score = 0;
	const getScore = function(){ return score };
	const addScore = function(){ score++; };
	return {name, role, getScore, addScore}
}

const X = player('', 'X')
const O = player('', 'O')

const gamecontrols = function(){
	
	let gameboard = [];
	let currentPlayer = X;
	const showGameboard = function(at){return this.gameboard[at];}
	const check_status = function (){
		if(((gameboard[0] === gameboard[1] &&  gameboard[0] === gameboard[2]) || 
			(gameboard[0] === gameboard[3] &&  gameboard[0] === gameboard[6]) || 
			(gameboard[0] === gameboard[4] &&  gameboard[0] === gameboard[8])) && 
			(gameboard[0] !== undefined)){return gameboard[0]}
		else if (gameboard[1] === gameboard[4] &&  gameboard[1] === gameboard[7] && 
				gameboard[1] !== undefined){return gameboard[1]}
		
		else if (((gameboard[2] === gameboard[5] &&  gameboard[2] === gameboard[8]) || 
				(gameboard[2] === gameboard[4] &&  gameboard[2] === gameboard[6])) && 
				(gameboard[2] !== undefined)) {return gameboard[2]}
		
		else if (gameboard[3] === gameboard[4] &&  gameboard[3] === gameboard[5] && gameboard[3] !== undefined){return gameboard[3]}
		
		else if (gameboard[6] === gameboard[7] && gameboard[6] === gameboard[8] && gameboard[6] !== undefined){return gameboard[6]}
		
		else if (!undefined in gameboard && gameboard.length === 9){return 'draw'}
	};
	
	const play_at = function(area){
		gameboard[area] = this.currentPlayer.role;
	};
	
	const switchPlayer = function(){
		this.currentPlayer = (this.currentPlayer === X) ? O : X;
	};
	return {currentPlayer, showGameboard, play_at, check_status, switchPlayer, gameboard}

}()

const displayControl = function(){
	
	const boxes = document.querySelectorAll('.grid-child')
	const player1Name = document.querySelector('.player1-score > .name')
	const player1Score = document.querySelector('.player1-score > .score')
	const player2Name = document.querySelector('.player2-score > .name')
	const player2Score = document.querySelector('.player2-score > .score')
	const result = document.querySelector('.result')
	const resultText = result.firstElementChild
	const turn = document.querySelector('.current-player > h3')
	const displayBoard = function(){
		boxes.forEach((box) => {
			box.textContent = gamecontrols.showGameboard(box.dataset.id)
		})
	}
	
	const displayScore = function(){
		player1Name.textContent = X.name;
		player2Name.textContent = O.name;
		player1Score.textContent = X.getScore()
		player2Score.textContent = O.getScore()
	}
	
	const displayTurn = function(){
		turn.textContent = `${gamecontrols.currentPlayer.name}'s turn`
	}
	
	const displayResult = function(winner){
		result.showModal()
		switch (winner){
			case 'draw':
				resultText.textContent = 'You drawed'
				break
			case 'X':
				resultText.textContent = `${X.name} won`
				X.addScore()
				break
			case 'O':
				resultText.textContent =`${O.name} won`
				O.addScore()
			
		}
	}
	return {displayBoard, displayScore, displayTurn, displayResult}
}()

const game = function(){
	const boxes = document.querySelectorAll('.grid-child')
	const start = document.querySelector('#play')
	const result = document.querySelector('.result')
	const openingDialog = document.querySelector('.opening')
	const resetBtn = document.querySelector('.reset')
	const nextRound = document.querySelector('.result > button')
	const restart = function () {
		gamecontrols.gameboard.splice(0, gamecontrols.gameboard.length)
		gamecontrols.currentPlayer = X
		displayControl.displayBoard()
		displayControl.displayScore()
		play()
	}
	
	resetBtn.addEventListener('click', restart)
	nextRound.addEventListener('click', () => {result.close(); restart()})	
	const play = function() {
		displayControl.displayTurn()
		boxes.forEach((box) => {
			box.addEventListener('click', () => {
				let id = box.dataset.id
				if (gamecontrols.showGameboard(id) === undefined) {
					gamecontrols.play_at(id)
					gamecontrols.switchPlayer()
					displayControl.displayBoard()
					displayControl.displayTurn()
					let status = gamecontrols.check_status()
					if (status) {
						displayControl.displayResult(status)
					}
				}
				
			})
		})
	}
	
	const startGame = function () {
		openingDialog.show()
		
		start.addEventListener('click', () => {
			const player1 = document.querySelector('#player1')
			const player2 = document.querySelector('#player2')
			if (player1.value && player2.value) {
				X.name = player1.value.trim();
				O.name = player2.value.trim();
				openingDialog.close()
				displayControl.displayScore()
				play()
			}
		})
	}
	return {startGame}
}()

game.startGame()