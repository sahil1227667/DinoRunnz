//board
let board;
let boardwidth= 750;
let boardheight= 250;
let context;

//dino
let dinowidth=88;
let dinoheight=94;
let dinox=70;
let dinoy=boardheight-dinoheight;
let dinoimg;

let dino={
    x: dinox,
    y: dinoy,
    width: dinowidth,
    height: dinoheight
}
//cactus
let cactusArray=[];
let cactus1width=34;
let cactus2width=69;
let cactus3width=102;
/*let cactus4width=50;
let cactus5width=69;*/

let cactusheight=70;
let cactusx=700;
let cactusy=boardheight-cactusheight;

let cactus1img;
let cactus2img;
let cactus3img;
//let cactus4img;
//let cactus5img;

//physics
let velocityx=-8; //cactus moving left
let velocityy=0;
let gravity=0.4;


let gameOver=false;
let score=0;


window.onload=function(){
    board= document.getElementById("board");
    board.height=boardheight;
    board.width=boardwidth;

    context=board.getContext("2d");//used for drawing on the board

    //draw initial dino
    //context.fillStyle="green";
    //context.fillRect(dino.x,dino.y,dino.width,dino.height);

    dinoimg=new Image();
    dinoimg.src="./image.png";
    dinoimg.onload= function(){
    context.drawImage(dinoimg, dino.x, dino.y, dino.width, dino.height);
}

cactus1img = new Image();
cactus1img.src="./cactus1.png";

cactus2img = new Image();
cactus2img.src="./cactus2.png";

cactus3img = new Image();
cactus3img.src="./cactus3.png";


/*cactus4img = new Image();
cactus4img.src="./cactus4.png";

cactus5img = new Image();
cactus5img.src="./cactus5.png";*/


requestAnimationFrame(update);
setInterval(placecactus, 1000);//time in ms
document.addEventListener("keydown",movedino);//cheking if any key is being pressed and if it is then calling the function
}

function update(){
requestAnimationFrame(update);
if(gameOver){
    return;
}

context.clearRect(0,0, board.width, board.height);

//dino
velocityy+=gravity;
dino.y=Math.min(dino.y+velocityy,dinoy);//apply velocity to current dino y, making sure it doesn't exceed the ground
context.drawImage(dinoimg, dino.x, dino.y, dino.width, dino.height);

//cactus
//looping through cactus array
for(let i=0;i<cactusArray.length;i++){
    let cactus=cactusArray[i];
    cactus.x+=velocityx;
    context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width,cactus.height);

    if(detectcollision(dino,cactus)){
        gameOver=true;
        dinoimg.src="./dead.png";
        dinoimg.onload=function(){
            context.drawImage(dinoimg, dino.x,dino.y, dino.width,dino.height);
        }
    }
}
//score
context.fillStyle="black";
context.font="20px courier";
score++;
context.fillText(score,5,20);
}

function movedino(e){
    if(gameOver){
        return;
    }

    if((e.code=="Space"||e.code=="ArrowUp")&& dino.y==dinoy){
        //jump
        velocityy=-10;
    }

}

function placecactus(){
//placing the cactus

if(gameOver){
    return;
}
let cactus={
    img: null,
    x: cactusx,
    y:cactusy,
    width: null,
    height:cactusheight
}

let placecactuschance=Math.random();//no b/w 0-0.9999
if(placecactuschance> .90){
    //10% you get cactus3
    cactus.img=cactus3img;
    cactus.width=cactus3width;
    cactusArray.push(cactus);
}
else if(placecactuschance> .70){
    //30% you get cactus2
    cactus.img=cactus2img;
    cactus.width=cactus2width;
    cactusArray.push(cactus);
}
else if(placecactuschance> .50){
    //50% you get cactus1
    cactus.img=cactus1img;
    cactus.width=cactus1width;
    cactusArray.push(cactus);
}

/*else if(placecactuschance> .30){
    //70% you get cactus4
    cactus.img=cactus4img;
    cactus.width=cactus4width;
    cactusArray.push(cactus);
}

else if(placecactuschance> .10){
    //90% you get cactus5
    cactus.img=cactus5img;
    cactus.width=cactus5width;
    cactusArray.push(cactus);
}
*/

if(cactusArray.length>5){
    cactusArray.shift();//remove the first element fom the array so that the array doesn't constantly grow
}

}

function detectcollision(a,b){
    return a.x<b.x+b.width && //sp a's top left corner doesn't reach b's top right corner
a.x+a.width>b.x &&//a's top right corner passes b's top left corner
a.y<b.y+b.height &&//a's top left corner doesn't reach b's bottom left corner
a.y+a.height>b.y;//a's bottom lest corner passes b's top left corner

}
