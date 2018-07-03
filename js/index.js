// Jorge Juarez - index.js
// Used in conjunction with ../views/index.html
let initiateGame = function(){
    let canvas_width = 1200;
    let canvas_length = 600;
    //document.getElementById('main-canvas').style.width = '1200px';
    //document.getElementById('main-canvas').style.height = '600px';

    my_pen.drawImage(player1_ship.getShpImg(), player1_ship.getDx(), 
        player1_ship.getDy(), player1_ship.getDWidth(), player1_ship.getDHeight());
    

}

let drawShip = function(dx){
    my_pen.clearRect(0, 0, 1200,600);
    my_pen.drawImage(player1_ship.getShpImg(), player1_ship.getDx(), 
        player1_ship.getDy(), player1_ship.getDWidth(), player1_ship.getDHeight());
}

/*function buttonGotPressed(e){
	if(e.key==" "){
		ship.shoot();
	}
	if(e.key=="ArrowLeft"){
		ship.x = ship.x - ship.speed;
		if(ship.x<=0){
			ship.x= 0;
		}
	}
	if(e.key=="ArrowRight"){
		ship.x = ship.x + ship.speed;
		if(ship.x >= W-ship.w){
			ship.x = W-ship.w;
		}
	}
}
*/

let leftArrowPressed = function(player){
    console.log("LEFT");
    if(player.getDx() > 0){
        player.setDx(player.getDx() - player.getVelocity());
        drawShip();
        console.log("X",player.getDx());
    }
};

let rightArrowPressed = function(player){
    console.log("RIGHT");
    if(player.getDx() < 500){
        player.setDx(player.getDx() + player.getVelocity());
        drawShip();
        console.log("X",player.getDx());
    }
};

let upArrowPressed = function(player){
    console.log("UP");
    if(player.getDy() > 0){
        player.setDy(player.getDy() - player.getVelocity());
        drawShip();
        console.log("Y",player.getDy());
    }
};

let downArrowPressed = function(player){
    console.log("DOWN");
    if(player.getDy() < 350){
        player.setDy(player.getDy() + player.getVelocity());
        drawShip();
        console.log("Y",player.getDy());
    }
};

let kirbyShoot = function(){

};

let moveKirbyShip = function(evt){
    switch (evt.keyCode) {
        case 32:
            kirbyShoot();
        case 37:
            leftArrowPressed(player1_ship);
            break;
        case 39:
            rightArrowPressed(player1_ship);
            break;
        case 38:
            upArrowPressed(player1_ship);
            break;
        case 40:
            downArrowPressed(player1_ship);
            break;
    }
};

window.onload = function(){
    document.addEventListener('keydown', moveKirbyShip);
    initiateGame();
}

