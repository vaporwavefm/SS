
let leftArrowPressed = function () {
    var element = document.getElementById("kss");
    if(element.style.left > '0px'){
        element.style.left = parseInt(element.style.left) - 5 + 'px';
        console.log("LEFT", element.style.left);
    }
};

let rightArrowPressed = function() {
    let element = document.getElementById("kss");
    if(element.style.left != '300px'){
        element.style.left = parseInt(element.style.left) + 5 + 'px';
        console.log("RIGHT", element.style.left);
    }
    
};

let upArrowPressed = function() {
    let element = document.getElementById("kss");
    if(element.style.top > '0px'){
        element.style.top = parseInt(element.style.top) - 5 + 'px';
        console.log("UP", element.style.top);
    }
};

let downArrowPressed = function() {
    let element = document.getElementById("kss");
    if(element.style.top != '500px'){
        element.style.top = parseInt(element.style.top) + 5 + 'px';
        console.log("DOWN", element.style.top);
    }
};

let moveKirby = function(evt){
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
        case 38:
            upArrowPressed();
            break;
        case 40:
            downArrowPressed();
            break;
    }
};

let shoot = function(evt){
    if(evt.keyCode == 32){
        console.log("SPACE", parseInt(document.getElementById("kss").style.left) + 20);
        cell = document.createElement("img");
        //cell.setAttribute("src", "url('../img/kirbyss.png')");
        //cell.style.position = "absolute";
        cell.src = "../img/bullet.png";
        cell.style.position = "absolute";
        cell.id = "curr-bullet";
        cell.style.left = parseInt(document.getElementById("kss").style.left) + 60 + 'px';
        cell.style.top = parseInt(document.getElementById("kss").style.top) + 25 + 'px';
        document.getElementById("maindiv").appendChild(cell);
        for(let i = 0; i < 50; i++){
            document.getElementById("curr-bullet").style.left = 
            parseInt(document.getElementById("kss").style.left) + 60 + (5 * i) + 'px';
        }
    }
}

let lod = function(){
    window.addEventListener('keydown', moveKirby);
    window.addEventListener('keydown', shoot)
};