var bananaImage, bananaGroup, stoneImage, stoneGroup, backGround,
backgroundImage, score, player, playerRunning, Ground;

function preload(){
	backgroundImage = loadImage("jungle.jpg");

	playerRunning = loadAnimation("Monkey_01.png", "Monkey_02.png", 
		"Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", 
		"Monkey_07.png", "Monkey_08.png", "Monkey_09.png");

	bananaImage = loadImage("banana.png");
	stoneImage = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 300);

  backGround = createSprite(400,75,10,10);
  backGround.addImage(backgroundImage);
  backGround.velocityX = -4;

  player = createSprite(100,240,20,20);
  player.addAnimation("run",playerRunning);
  player.scale= 0.10;

  Ground = createSprite(200,270,600,20);
  Ground.visible = false;

  score = 0;

  bananaGroup = new Group();
  stoneGroup = new Group();
}

function draw() {
  background(220);

  if (backGround.x < 100){
  	backGround.x = backGround.width/2;
  }

  player.velocityY += 0.8;

  if(keyDown("space")){
  	player.velocityY = -14.5;
  }

  if(player.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
  	score += 10;
  }

  if(player.isTouching(stoneGroup)){
  	player.scale = 0.10;
  	score = 0;
  }

  switch(score) {
  	case 10: player.scale = 0.12;
  		break;
  	case 20: player.scale = 0.14;
  		break;
  	case 30: player.scale = 0.16;
  		break;
  	case 40: player.scale = 0.18;
  		break;
  	default: break;
  }

  player.collide(Ground);

  spawnClouds();
  spawnObstacles();

  drawSprites();

  //text(player.y,100,100);

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,400,50);
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(100,180));
    banana.addImage("banana",bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,240,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles

    obstacle.addImage("stone",stoneImage)
    obstacle.scale = 0.18;

    obstacle.lifetime = 300;
    
    stoneGroup.add(obstacle);
  }
}