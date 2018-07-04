// Jorge Juarez - ./js/index.js
// Used in conjunction with ../views/index.html

let drawShip = function(){
    //my_pen.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    my_pen.drawImage(player1_ship.getShpImg(), player1_ship.getDx(),
        player1_ship.getDy(), player1_ship.getDWidth(), player1_ship.getDHeight());
} // draws the player ship on the canvas

let drawLaser = function (laser) {
    my_pen.drawImage(laser.getLsrImg(), laser.getDx(), laser.getDy(), laser.getDWidth(), laser.getDHeight());
    for(let i = 0; i< enemy_arr.length; i++){ // now, loop through the enemies if our laser is touching them
        if (areTheyTouching(enemy_arr[i], laser) == true) {
            enemy_arr.splice(i,1);
            score_content = parseInt(score_content) + 100;
            document.getElementById("scoreboard").innerHTML = score_content ;
            return false;
        }
    }; // draws the current laser object on the canvas
    return true;
}

let drawEnemy = function (enemy) {
    my_pen.drawImage(enemy.getEnImg(), enemy.getDx(), enemy.getDy(), enemy.getDWidth(), enemy.getDHeight());
}; // draws the current enemy object on the canvas

let drawPup = function(pup, player){
    my_pen.drawImage(pup.getPUpImg(), pup.getDx(), pup.getDy(), pup.getDWidth(), pup.getDHeight());
   if(areTheyTouching(player1_ship, pup) == true){
       console.log("TOUCH POWERUP", pup);
       setPowerUp(pup, player);
       pup_arr.splice(pup_arr.indexOf(pup), 1);
   }
   // not sure why, but powerups freeze the game when i touch them unless i define the setPowerUp function call
   // here, and not in the main drawthewholegame function
};

let moveLaser = function(laser){
    if(laser.getDx() >= CANVAS_WIDTH){
        return false;   // laser has reached the end of the screen, stop!!!
    }
    laser.setDx(laser.getDx() + laser.getVelocity());
    return true;
};

let moveEnemy = function(enemy){
    if(enemy.getDx() <= -100){
        return false;
    }
    else{
        let factor = 2;
        let random_number = Math.floor(Math.random() * (2 * factor)) + 1;
        let plus_or_minus = Math.floor(Math.random() * 100) + 1;
        let do_i_move = Math.floor(Math.random() * 100) + 1;
        if(do_i_move % 2 == 0){
            if(plus_or_minus % 2 == 0){
                if(enemy.getDy() <= 5){
                    enemy.setDy(5);
                }
                else enemy.setDy(enemy.getDy() - random_number);
            }
            if(plus_or_minus % 2 == 1){
                if(enemy.getDy() >= CANVAS_HEIGHT - 40){
                    enemy.setDy(CANVAS_HEIGHT - 40);
                }
                else enemy.setDy(enemy.getDy() + random_number);
            }
            enemy.setDx(enemy.getDx() - (enemy.getVelocity() / 2));
        }
        else{
            // TODO: uhhh hmm...
        }
    }
    return true;
}

let movePup = function(pup){ // move the power-up, all power-ups move in a uniform fashion
    if(pup.getDx() <= -100){
        return false;
    }
    else{
        pup.setDx(pup.getDx() - pup.getVelocity());
    }
    return true;
};

let setPowerUp = function(pup, player){
    if(pup.getPUpId() == "ice"){ // since ice powerup slows you down, let's make sure it doesn't completely slow you down
        if(player.getVelocity() <= 2){
            player.setVelocity(2);
        }
        else {
            player.setVelocity(player.getVelocity() - 2);
        }
    }
    if(pup.getPUpId() == "fire"){ // fire powerup speeds you up, let's make sure you're not going TOO fast
        if(player.getVelocity() >= 15){
            player.setVelocity(15);
        }
        else {
            player.setVelocity(player.getVelocity() + 2);
        }
    }
};

let checkCurrLevel = function(){
    // make enemies spawn more when level goes up
};

let pickRandomEnemy = function(){
    return enemyspr_arr[Math.floor(Math.random() * enemyspr_arr.length)]; // pick a random sprite
};

let generateRandomPup = function(rand2){ // this generates a random Power-Up Object, and returns it
    res = Math.floor(Math.random() * (pupspr_arr.length));
    if(res == 0) { // ice
        return new PowerUp(ice_pupspr, "ice", CANVAS_WIDTH + 5, rand2 - 40, PUP_WIDTH, PUP_HEIGHT, 5);
    }
    if(res == 1){ // fire
        return new PowerUp(fire_pupspr, "fire", CANVAS_WIDTH + 5, rand2 - 40, PUP_WIDTH, PUP_HEIGHT, 5);
    }
    return new PowerUp(fire_pupspr, "ice", CANVAS_WIDTH + 5, rand2 - 40, PUP_WIDTH, PUP_HEIGHT, 5);
    // idk im scares of unexpected boundary errors, so i just set a default value lol
}

let areTheyTouching = function(thing, otherthing){ // this compares the distances of two objects, returns true if below threshold
    let x_diff = Math.abs(thing.getDx() - otherthing.getDx());
    let y_diff = Math.abs(thing.getDy() - otherthing.getDy());
    //let  = 40;
    //let max_height = 40;
    let threshold = 40;
    if(x_diff <= threshold && y_diff <= threshold)
        return true;
    return false;
}

let drawTheWholeGame = function (level) {
    my_pen.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // first, let's clear the canvas
    if (!did_we_lose_yet) {
        drawShip(); // now, let's draw the ship's current coordinates on canvas
    }
    for (let i = 0; i < player1_lasers.length; i++) { // for each laser that the player has shot, let's move it
        if (drawLaser(player1_lasers[i]) == false) { // should laser be out of view, take the laser out of the array
            player1_lasers.splice(player1_lasers[i], 1);
        };
    }
    let rand = Math.random(); // let's generate a random number to see if an enemy should appear in this frame 
    let rand2 = Math.floor(Math.random() * (CANVAS_HEIGHT - 5)) + 1; // this denotes which x height should it spawn at
    if (rand < (.1 * level)) { // if the the rand variable is less than this, spawn the enemy!
        newEnSpr = pickRandomEnemy();
        let temp_enemy = new Enemy(newEnSpr, CANVAS_WIDTH + 5, rand2, ENEMY_WIDTH, ENEMY_HEIGHT, 5);
        enemy_arr.push(temp_enemy);
    }
    if (rand < (.2 - (.01 * level) )){
        if (rand2 - 20 <= 40) { // it bugs me that i can see the sprite getting cut off at the top of the canvas
            rand2 = 80; // so let's set a static destination height if the predefined random height is too small
        }
        //let temp_pUp = new PowerUp(ice_pupspr, "ice", CANVAS_WIDTH + 5, rand2 - 40, PUP_WIDTH, PUP_HEIGHT, 5);

        let temp_pUp = generateRandomPup(rand2);
        console.log("PUP:", temp_pUp.getPUpImg());
        pup_arr.push(temp_pUp);
    }

    for (let i = 0; i < pup_arr.length; i++) {
        drawPup(pup_arr[i], player1_ship);
    }
    for (let i = 0; i < enemy_arr.length; i++) {
        if (areTheyTouching(enemy_arr[i], player1_ship) == true) {
            did_we_lose_yet = true;
        }
        drawEnemy(enemy_arr[i]);
    }
};
let animateNextFrame = function(){ // animate the next frame, aka move all Lasers, Enemies, and PowerUps
    for(let i = 0; i< player1_lasers.length; i++){
        moveLaser(player1_lasers[i]); 
    }
    for(let i = 0; i < enemy_arr.length; i++){
        moveEnemy(enemy_arr[i]);
    }
    for(let i = 0; i < pup_arr.length; i++){
        movePup(pup_arr[i]);
    }
}

// -------------- event handlers for key presses ------------------------------------------------
let leftArrowPressed = function(player){
    console.log("LEFT");
    if(player.getDx() > 0){
        player.setDx(player.getDx() - player.getVelocity()); 
        console.log("X",player.getDx());
    }
};

let rightArrowPressed = function(player){
    console.log("RIGHT");
    if (player.getDx() < (CANVAS_WIDTH / 2) ) {
        player.setDx(player.getDx() + player.getVelocity());
        console.log("X",player.getDx());
    }
};

let upArrowPressed = function(player){
    console.log("UP");
    if(player.getDy() > 0){
        player.setDy(player.getDy() - player.getVelocity());
        console.log("Y",player.getDy());
    }
};

let downArrowPressed = function(player){
    console.log("DOWN");
    if(player.getDy() < (CANVAS_HEIGHT - 80)){
        player.setDy(player.getDy() + player.getVelocity());
        console.log("Y",player.getDy());
    }
};

let kirbyShoot = function(player){
    let temp_laser = new Laser(laser_spr, player.getDx() + 55, player.getDy() + 20, 
        LASER_WIDTH, LASER_HEIGHT, INIT_LASER_VEL, 10);
    player1_lasers.push(temp_laser);
    drawLaser(temp_laser);
};

// -------------- end key press event handlers -----------------------------------------
let moveKirbyShip = function(evt){
    switch (evt.keyCode) {
        case 32: // she pressed the space bar
            kirbyShoot(player1_ship);
            break;
        case 37: // she pressed the left arrow key
            leftArrowPressed(player1_ship);
            break;
        case 39: // she pressed the right arrow key
            rightArrowPressed(player1_ship);
            break;
        case 38: // she pressed the up arrow key
            upArrowPressed(player1_ship);
            break;
        case 40: // she pressed the down arrow key
            downArrowPressed(player1_ship);
            break;
    }
};

let loopGame = function(){
    drawTheWholeGame(current_level); // first we draw the current frame of the game
    animateNextFrame(); // now we draw the next frame of the game and animate it
    //console.log('in progess, frame: ', ani_frame_idx);
    if(did_we_lose_yet == false){ // make sure we didn't lose yet
        window.requestAnimationFrame(loopGame);
        ani_frame_idx++; // add to the animation frame counter
    }
    else{
        console.log("We lost"); // she just lost her last life
        my_pen.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        //window.requestAnimationFrame(loopGame);
        document.removeEventListener('keydown', moveKirbyShip);
        document.getElementById("gamestatus").innerHTML = "GAME OVER, FINAL LEVEL REACHED: " + current_level;
    }
}; 

window.onload = function(){
    //initiateGame();
    document.addEventListener('keydown', moveKirbyShip);
    loopGame();
}
