document.addEventListener('DOMContentLoaded', () => {

	//Refernecia
	const dino = document.querySelector('.dino');
	const grid = document.querySelector('.grid');
	const body = document.querySelector('body');
	const alerta = document.getElementById('alert');

	//variaveis
	let jumping = false;
	let gravity = 0.9;
	let gameo = false;
	let dinoPy = 0;

	//entrada de dados
	document.addEventListener('keyup',jumpCrontrol);

	//controle do pulo
	function jumpCrontrol(e){
		if(e.keyCode == 32){
			if(!jumping){
				jumping = true;
				jump();
			}
		}
	}

	//funçao de pular
	function jump(){
		let count = 0;
		let timerId = setInterval(function(){
			// caindo
			if(count == 15){
				clearInterval(timerId);
				let downTimerId = setInterval(function(){
					if(count == 0){
						clearInterval(downTimerId)
						jumping = false;
					}	
					dinoPy -= 5;
					count--;
					dinoPy = dinoPy * gravity;
					dino.style.bottom = dinoPy + 'px';
				},20)
			}
			//subida
			dinoPy += 30;
			count++;
			dinoPy = dinoPy * gravity;
			dino.style.bottom = dinoPy + 'px'; 
		},20)
	}

	function gerarObst(){
		let randoTime = Math.random()*4000;
		let obstaclePx = 1000;
		const obstacle = document.createElement('div');

		//Criando copias
		if(!gameo){
			obstacle.classList.add('obstacle');
			grid.appendChild(obstacle);
			obstacle.style.left = obstaclePx + 'px';
		}

		//logica do jogo + movimento dos obstaculo
		let timerId = setInterval(function(){
			//colisao com player
			if(obstaclePx > 0 && obstaclePx < 60 && dinoPy < 60){
				clearInterval(timerId);
				alerta.innerHTML = 'Fim de jogo';
				gameo = true;
				//removendo copias e parando
				body.removeChild(body.firstChild);
				while(grid.fistChild){
					grid.removeChild(grid.lastChild);
				}
			}
			//movimento dos obstaculos
			obstaclePx -= 10;
			obstacle.style.left = obstaclePx + 'px';
		}, 20)

		if(!gameo) setTimeout(gerarObst, randoTime)
	}

	gerarObst();
})