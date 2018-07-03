
let Ship = (
    function(){
        let shpImgSymbol = Symbol('shp_img');
        let dxSymbol = Symbol('dx');
        let dySymbol = Symbol('dy');
        let dWidthSymbol = Symbol('dWidth');
        let dHeightSymbol = Symbol('dHeight');
        let velocitySymbol = Symbol('velocity');
        function Ship(shp_img,dx,dy,dWidth,dHeight,velocity){
            this[shpImgSymbol] = shp_img;
            this[dxSymbol] = dx;
            this[dySymbol] = dy;
            this[dWidthSymbol] = dWidth;
            this[dHeightSymbol] = dHeight;
            this[velocitySymbol] = velocity;
        };
        Ship.prototype.getShpImg = function(){ return this[shpImgSymbol];};
        Ship.prototype.getDx = function(){return this[dxSymbol];};
        Ship.prototype.getDy = function(){return this[dySymbol];};
        Ship.prototype.getDWidth = function(){return this[dWidthSymbol];};
        Ship.prototype.getDHeight = function(){ return this[dHeightSymbol]; };
        Ship.prototype.getVelocity = function(){ return this[velocitySymbol];};

        Ship.prototype.setDx = function(dx) { this[dxSymbol] = dx;};
        Ship.prototype.setDy = function(dy) { this[dySymbol] = dy;};
        Ship.prototype.setVelocity = function(velocity) { this[velocitySymbol] = velocity;};
        return Ship;
    }

)();

let kirbySS = new Image();
kirbySS.src = "../img/kirbyss.png";
let laser_spr = new Image();
laser_spr.src = "../img/bullet.png";
let player1_ship = new Ship(kirbySS, 30, 20, 50, 50,10);

let my_pen = document.getElementById('main-canvas').getContext('2d');



