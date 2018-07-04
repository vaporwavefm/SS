// Jorge Juarez - ./js/index.js
// Used in conjunction with ../views/index.html
let initiateGame = function(){
    my_pen.drawImage(player1_ship.getShpImg(), player1_ship.getDx(), 
        player1_ship.getDy(), player1_ship.getDWidth(), player1_ship.getDHeight());
}

let drawShip = function(){
    //my_pen.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    my_pen.drawImage(player1_ship.getShpImg(), player1_ship.getDx(),
        player1_ship.getDy(), player1_ship.getDWidth(), player1_ship.getDHeight());
}

let drawLaser = function (laser) {
    my_pen.drawImage(laser.getLsrImg(), laser.getDx(), laser.getDy(), LASER_WIDTH, LASER_HEIGHT);
}

let moveLaser = function(laser){
    if(laser.getDx() >= CANVAS_WIDTH){
        return false;   // laser has reached the end of the screen, stop!!!
    }
    laser.setDx(laser.getDx() + laser.getVelocity());
    return true
};

let drawTheWholeGame = function(){
    my_pen.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawShip();
    for(let i = 0; i< player1_lasers.length;i++){
        drawLaser(player1_lasers[i]);
    }
}

let animateNextFrame = function(){
    for(let i = 0; i< player1_lasers.length; i++){
        moveLaser(player1_lasers[i]);
    }
}

// -------------- event handlers for key presses ------------------------------------------------
let leftArrowPressed = function(player){
    console.log("LEFT");
    if(player.getDx() > 0){
        player.setDx(player.getDx() - player.getVelocity()); 
        //drawShip();
        console.log("X",player.getDx());
    }
};

let rightArrowPressed = function(player){
    console.log("RIGHT");
    if (player.getDx() < (CANVAS_WIDTH / 3) ) {
        player.setDx(player.getDx() + player.getVelocity());
        //drawShip();
        console.log("X",player.getDx());
    }
};

let upArrowPressed = function(player){
    console.log("UP");
    if(player.getDy() > 0){
        player.setDy(player.getDy() - player.getVelocity());
        //drawShip();
        console.log("Y",player.getDy());
    }
};

let downArrowPressed = function(player){
    console.log("DOWN");
    if(player.getDy() < (CANVAS_HEIGHT - 100)){
        player.setDy(player.getDy() + player.getVelocity());
        //drawShip();
        console.log("Y",player.getDy());
    }
};

let kirbyShoot = function(player){
    let temp_laser = new Laser(laser_spr, player.getDx() + 55, player.getDy() + 20, INIT_LASER_VEL,10);
    player1_lasers.push(temp_laser);
    drawLaser(temp_laser);
};
// -------------- end key press event handlers -----------------------------------------
let moveKirbyShip = function(evt){
    switch (evt.keyCode) {
        case 32:
            kirbyShoot(player1_ship);
            break;
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

let ani = 0;
let loopGame = function(){
    drawTheWholeGame();
    animateNextFrame();
    console.log('in progess');
    
    if(did_we_lose_yet == false){
        window.requestAnimationFrame(loopGame);
        ani +=1;
        
    }
    
};
window.onload = function(){
    //initiateGame();
    document.addEventListener('keydown', moveKirbyShip);
    loopGame();
}

