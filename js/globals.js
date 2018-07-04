// Jorge Juarez : ./js/Globals.js
// Used in conjunction with ../views/index.html

let kirbySS = new Image();
kirbySS.src = "../img/kirbyss.png";
let laser_spr = new Image();
laser_spr.src = "../img/player1_laser.png";
let enemy1_spr = new Image();
let enemy2_spr = new Image();
let enemy3_spr = new Image();
let ice_pupspr = new Image();
let fire_pupspr = new Image();
enemy1_spr.src = "../img/enemy1.png";
enemy2_spr.src = "../img/enemy2.png";
enemy3_spr.src = "../img/enemy3.png";
ice_pupspr.src = "../img/ice-pow.png";
fire_pupspr.src = "../img/fire-pow.png";
let enemyspr_arr = [enemy1_spr, enemy2_spr, enemy3_spr];

let player1_ship = new Ship(kirbySS, 30, 20, 50, 50,10);
let test_laser = new Laser(laser_spr, 10, 10, 0,0);
let my_pen = document.getElementById('main-canvas').getContext('2d');
const CANVAS_WIDTH = document.getElementById('main-canvas').width;
const CANVAS_HEIGHT = document.getElementById('main-canvas').height;
let LASER_WIDTH = 15;
let LASER_HEIGHT = 5;
let ENEMY_WIDTH = 50;
let ENEMY_HEIGHT = 50;
let PUP_WIDTH = 50;
let PUP_HEIGHT = 50;
let INIT_SHIP_VEL = 10;
let INIT_LASER_VEL = 10;
let current_level = 1;

let player1_lasers = [];
let enemy_arr = [];
let pup_arr = [];
let ani_frame_idx = 0;
let did_we_lose_yet = false;
let pow_duration_idx = 20;
let is_pow_in_effect = false;

let score_content = document.getElementById("scoreboard").innerHTML;
let level_content = document.getElementById("gamestatus").innerHTML;
let enemy1 = new Enemy(enemy1_spr, CANVAS_WIDTH + 5, CANVAS_HEIGHT - 100, 5);


