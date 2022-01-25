var Background19Img,Background19;
var girlrunningImg,girlrunning;
var stoneImg,stone,stonesGroup;
var gameState = "play";
var zombieImg,zombie; 
var score = 0;
var jumpsound , dieSound



function preload(){
girlrunningImg = loadImage("Girl running.png");
Background19Img = loadImage("Background19.png");
stoneImg = loadImage("Stone 1.png");
zombieImg = loadImage("Zombie.png");
jumpsound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");

}

function setup() {

createCanvas(1420,660); //max size possible without scroll
Background19 = createSprite(880,330);
Background19.addImage("Background19",Background19Img);

stonesGroup = createGroup(); 

girlrunning = createSprite(200,400);
girlrunning.addImage("Girlrunning",girlrunningImg);
girlrunning.scale = 0.13;

zombie = createSprite(60,400);
zombie.addImage("Zombie",zombieImg);
zombie.scale = 0.38;
 
}

function draw() {
 background(100); //color
 text("Score: "+ score, 500,50);
 
 if(gameState === "play"){
  Background19.x = Background19.x - 5;
 //Background19.velocityX =- 5;
 score = score + Math.round(frameCount/60);
  if(Background19.x < 520){
  Background19.x = 880;
  //Background19.velocityX = Background19.velocityX - 5;
 }

 //Resetting girl and zombie
 if((girlrunning.x === 1300)) {
  girlrunning.x = 200;
  zombie.x = 60;
}

 if((girlrunning.y === 300)) {
  girlrunning.y = 400;
}
if((zombie.y === 300)) {
  zombie.y = 400;
}

 girlrunning.velocityX = 5;
 zombie.velocityX = 4;
 spawnStones();


 //jump when the space key is pressed
 //if(keyDown("space")) {
  if(keyDown("space")&& girlrunning.y >= 100) {
  //girlrunning.velocityY = -12;
  girlrunning.y = 300;
  jumpsound.play(); 
}

//add gravity
//girlrunning.velocityY = girlrunning.velocityY + 0.8


 if(girlrunning.isTouching(stonesGroup)){
  //gameState = "end"
  girlrunning.velocityX =- 10;
  score = score - 50;
  //stone.velocityX = 0;
//      girlrunning.destroy()
}

if(zombie.isTouching(stonesGroup)){
  zombie.y = 300;
}

if(zombie.isTouching(girlrunning)){
  gameState = "end";
  dieSound.play();
//      girlrunning.destroy()
}
}
       
 if(gameState === "end"){
      text("Game Over",730,50);
                                
     // Background19.velocityX = 0;
      girlrunning.velocityX = 0;
      zombie.velocityX = 0;
       

      //set lifetime of the game objects so that they are never destroyed
    stonesGroup.setLifetimeEach(-1);   
    stonesGroup.setVelocityXEach(0);
      
 }

  drawSprites();
    
  }


function spawnStones(){
    if(frameCount % 180 === 0){
    var stone = createSprite(820,415);
    stone.addImage("Stone 1",stoneImg);
    stone.x= Math.round(random(200,1400));
    stone.scale = 0.05;
    stone.velocityX = -2;
    stone.lifetime = 150;
    stonesGroup.add(stone);
  }
}
 