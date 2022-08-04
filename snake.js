const canvas = document.getElementById("canv");
const str = document.querySelector("#start");
const rst = document.querySelector("#reset");
const scr = document.querySelector("#score");
const ctx = canvas.getContext('2d');
let canvH = canvas.height;
let canvW = canvas.width;
let dispx = 10;
let dispy = 10;
let flagl = false;
let flagr = false;
let flagu = false;
let flagd = false;
let lastx, lasty;
let interval = null;
let randx;
let score = 0;
let t = 0;
let randy;
let tmp = [];
let occ = [];

/*for (let tt = 0; tt < 30; tt++){
    for (let t = 0; t < 30; t++){
        tmp.push("false");
    }
    occ.push(tmp);
    tmp = [];
}*/
let snakes = [{ x: 40, y: 10 }];
//snakes.unshift({ x: 100, y: 200 });
let l = 1;
drawsnake();
create_rand();
layfood();
function layfood() {
    ctx.beginPath()
    ctx.rect(randx,randy,10,10);
    ctx.fillStyle = "#146356";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
function create_rand() {
    randx = Math.floor(Math.random() * 290);
    randx -= randx % 10;
    randy = Math.floor(Math.random() * 290);
    randy -= randy % 10;
}
function drawsnake(){
    for (let i = 0; i < l;i++){
        ctx.beginPath()
        ctx.rect(snakes[i].x, snakes[i].y, 10, 10);
        //occ[snakes[i].x][snakes[i].y] = true;
        ctx.fillStyle = "brown";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

function eat() {
    if (snakes[0].x == randx && snakes[0].y == randy) {
        score++;
        create_rand();
        snakes.push({ x: lastx, y: lasty });
        l++;
    }
}
function induction(tmp){
    for(let i = l-1; i >= 1; i--){
        snakes[i].x = snakes[i-1].x+tmp;
        snakes[i].y = snakes[i - 1].y+tmp;
    }
}

function endgame() {
    if (snakes[0].x + 10 > canvW || snakes[0].x < 0 || snakes[0].y + 10 > canvH || snakes[0].y < 0) {
        alert("game over");
        clearInterval(interval);
        interval = null;
        snakes = [{ x: 10, y: 20 }];
        flagl = false;
        flagr = false;
        flagu = false;
        flagd = false;
        dispx = 10;
        dispy = 10;
        create_rand();
        drawsnake();
        layfood();
        scr.innerHTML = `<li>${score}</li>`
        score = 0;
    }
}
/*function drawsnakeP() {
    ctx.beginPath()
    ctx.rect(x,y,10,10);
    ctx.fillStyle = "brown";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}*/
window.addEventListener('keydown', function (e) {
    if (e.code == 'ArrowRight') {
        flagr = true;
    }
    else if (e.code == 'ArrowLeft') {
        flagl = true;
    }
    else if (e.code == 'ArrowUp') {
        flagu = true;
    }
    else if (e.code == 'ArrowDown') {
        flagd = true;
    }
});         
window.addEventListener('keyup', function (e) {
    flagl = false;
    flagr = false;
    flagu = false;
    flagd = false;
}); 
function startgame() {                                     //function to start game  game always runs in intervals
    if (!interval) {
        interval = setInterval(() => {
            interval = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (flagl || flagr || flagu || flagd) {
                lastx = snakes[l-1].x;   //adds at the tail
                lasty = snakes[l-1].y;
                induction(t);
                if (flagl == true){
                    snakes[0].x -= dispx;
                }
                else if (flagr == true){
                    snakes[0].x += dispx;
                }
                else if (flagu == true){
                    snakes[0].y -= dispy;
                }
                else if (flagd == true){
                    snakes[0].y += dispy;
                }
            }
            eat();
            drawsnake();
            endgame();
            layfood();
        },50);
    }
}
str.addEventListener('click', startgame);
