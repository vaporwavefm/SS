// Jorge Juarez : ./js/globals.js
// Used in conjunction with ../views/index.html

let kirbySS = new Image();
kirbySS.src = "../img/kirbyss.png";
let laser_spr = new Image();
laser_spr.src = "../img/laser.png";
let player1_ship = new Ship(kirbySS, 30, 20, 50, 50,10);
let test_laser = new Laser(laser_spr, 10, 10, 0,0);

let my_pen = document.getElementById('main-canvas').getContext('2d');
const CANVAS_WIDTH = document.getElementById('main-canvas').width;
const CANVAS_HEIGHT = document.getElementById('main-canvas').height;
const LASER_WIDTH = 15;
const LASER_HEIGHT = 5;
const INIT_LASER_VEL = 10;

let player1_lasers = [];

let did_we_lose_yet = false;



