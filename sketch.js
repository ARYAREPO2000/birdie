var groundImg, ground;
var ghost, ghostImg;
var invisibleBlock;
var invisibleBlock2;
var PLAY = 1
var END=0
var gameState = PLAY;
var score 
var cat, catImg, catsG
var obstacle, obstacleImg, obstaclesG;
var gameOver, gameOverImg
var checkPointSound, dieSound
var restart

function preload(){
  groundImg = loadImage("background0.png");  
  ghostImg  = loadImage("bird.png");
  obstacleImg = loadImage("birds-clipart-png.png")
  gameOverImg = loadImage("gameOver.png")
  catImg = loadImage("dog.png")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkpoint.mp3")
}

function setup() {
  createCanvas(600, 600);
  ground = createSprite(300,300);
  ground.addImage(groundImg);
  ground.velocityX = -2;
  ground.scale = 2

  invisibleBlock = createSprite(300,600,599,10);
  invisibleBlock.visible = false;

  invisibleBlock2 = createSprite(300,0,599,10);
  invisibleBlock.visible2 = false;

  gameOver = createSprite(300,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;


  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale=0.1;
  ghost.visible = true

  obstaclesG = new Group();
  catsG = new Group();
  score = 0

 

  imageMode(CENTER)

}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("score: "+ score,500,30)
 
  if (gameState===PLAY){ 
     ghost.visible = true;

  score = score + Math.round(getFrameRate()/60);    

   if (keyDown("space")) {
    ghost.velocityY = -5
  }

  ghost.velocityY = ghost.velocityY + 0.8
  

  if(score>0 && score%100===0){
    checkPointSound.play() 
 }


if (ground.x < 200){
  ground.x = 300;}

  
  
  if(obstaclesG.isTouching(ghost)){ 
    gameState  =  END
    dieSound.play()
    ghost.velocityY = 4
  }

  if(catsG.isTouching(ghost)){ 
    gameState  =  END
    dieSound.play()
    ghost.velocityY = -4
  }

  if(invisibleBlock.isTouching(ghost)){ 
    gameState  =  END
    dieSound.play()
    ghost.velocityY = -4
  }

  if(invisibleBlock2.isTouching(ghost)){ 
    gameState  =  END
    dieSound.play()
    ghost.velocityY = 4
  }

  
}

  if (gameState===END) {
    score = 0
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 150,200);
    gameOver.visible = true;
    ground.velocityX = 0;
    obstaclesG.destroyEach();
    catsG.destroyEach();

    if(invisibleBlock.isTouching(ghost)){ 
      ghost.velocityY = -4;
    }
  
    if(invisibleBlock2.isTouching(ghost)){ 
      ghost.velocityY = 4;
    }
   
    



    }
    
     if(keyDown("UP_ARROW")) {
       reset();
     }

    spawnObstacles();
    spawnObstacles2();  
}

  

  function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(700,random(100,400),10,40);
      obstacle.velocityX = -(6 + score/100);
      obstacle.addImage(obstacleImg);
      obstacle.scale = 0.2;
     obstacle.lifetime = 500;
    obstaclesG.add(obstacle);
    }   

  }

  function spawnObstacles2(){
    if (frameCount % 60 === 0){
      var cat = createSprite(-90,550,10,40);
      cat.velocityX = (6 + score/40);
      cat.addImage(catImg);
      cat.scale = 0.2;
     cat.lifetime = 500;
    catsG.add(cat);
    } 
  }  


    function reset(){
      gameState = PLAY;   
      obstaclesG.destroyEach();
      catsG.destroyEach();
      gameOver.visible = false;
      ground.velocityX = -2;
       score = 0;
    
    }
 