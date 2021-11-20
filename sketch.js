var skyImg, sky;
var planeImg, plane;
var planeImgDwn, planeDwn;
var planeImgUp, planeUp;
var birdImg, birds;
var bronzeImg, bronze;
var silverImg, silver;
var goldImg, gold;
var gameState = "menu"
var score

function preload(){
    skyImg = loadImage("background.jpg");
    planeImg = loadImage("plane10.png");
    bronzeImg = loadImage("bronze coin.png");
    silverImg = loadImage("silver coin.png");
    goldImg = loadImage("gold coin.png");
    birdImg = loadImage("bird.png");
    planeImgDwn = loadImage("plane tilted down.png");
    planeImgUp = loadImage("plane tilted up.png");
}

function setup() {
 createCanvas(500, 200);

 sky = createSprite(300,100);
 sky.addImage("sky", skyImg);
 sky.velocityX = -1

 plane = createSprite(100,100);
 plane.addImage(planeImg);
 plane.scale = 0.1

 plane.setCollider("circle", 0, 0, 70);
 plane.debug = true

 score = 0

 birdsGroup = new Group();
 bronzeCoinGroup = new Group();
 silverCoinGroup = new Group();
 goldCoinGroup = new Group();
}

function draw() {
 background(200);
 drawSprites();

 if(gameState==="menu"){
    fill("Green");
    textSize(20);
    text("Score:"+ score, 10, 20);
    textSize(25);
    text("Press Space to Start",120,100);
    text("Avoid Birds, Collect Coins", 100, 150);

    if(sky.x < 100){
        sky.x = sky.width/2
    }

    if(keyDown("SPACE")){
        gameState="play"
    }
 }
 if(gameState==="play"){
    
    //background infinite
    if(sky.x < 100){
        sky.x = sky.width/2
    }

    fill("Green");
    textSize(20);
    text("Score:"+ score, 10, 20);

    birds();
    coins();

    if(score>50){
        harderBirds();
    }

    //controls for plane
    if(keyDown("UP_ARROW")){
        plane.y=plane.y -3
        plane.addImage(planeImgUp);
        plane.scale = .2
    }
    if(keyDown("DOWN_ARROW")){
        plane.y=plane.y +3
        plane.addImage(planeImgDwn);
        plane.scale = .2
    }


    //point system
    if(bronzeCoinGroup.isTouching(plane)){
        score = score +1
        bronzeCoinGroup.destroyEach();
    }
    if(silverCoinGroup.isTouching(plane)){
        score = score +3
        silverCoinGroup.destroyEach();
    }
    if(goldCoinGroup.isTouching(plane)){
        score = score +5
        goldCoinGroup.destroyEach();
    }

    //coin debug
    if(birdsGroup.isTouching(bronzeCoinGroup)){
        bronzeCoinGroup.destroyEach();
    }
    if(birdsGroup.isTouching(silverCoinGroup)){
        silverCoinGroup.destroyEach();
    }
    if(birdsGroup.isTouching(goldCoinGroup)){
        goldCoinGroup.destroyEach();
    }

    //codeblock for game end (Loss)
    if(birdsGroup.isTouching(plane)||plane.y>190||plane.y<10){
        plane.destroy();
        gameState="end"
    }

    //codeblock for game end (Win)
    if(score>100){
        gameState="win"
    }
}

    if(gameState==="end"){
        fill("Green");
        textSize(35);
        text("Game Over", 150, 100);
        birdsGroup.destroyEach();
        sky.velocityX = 0
    }

    if(gameState==="win"){
        fill("Green");
        textSize(35);
        text("You Won!", 150, 100);

        sky.velocityX=0
        birdsGroup.destroyEach();
        goldCoinGroup.destroyEach();
        silverCoinGroup.destroyEach();
        bronzeCoinGroup.destroyEach();
    }
}

function birds(){
    if(frameCount% 30===0){
        bird = createSprite(500,100)
        bird.addImage(birdImg);
        bird.velocityX = -6
        bird.y=Math.round(random(10, 190));
        bird.scale=.05

        bird.lifetime = 130

        birdsGroup.add(bird);

        bird.setCollider("circle", 0, 0, 80);
        bird.debug = true;

    }
}

function harderBirds(){
    if(frameCount% 10===0){
        bird = createSprite(500,100)
        bird.addImage(birdImg);
        bird.velocityX = -6
        bird.y=Math.round(random(10, 190));
        bird.scale=.05

        bird.lifetime = 130

        birdsGroup.add(bird);

        bird.setCollider("circle", 0, 0, 80);
        bird.debug = true;

    }
}


function coins(){
    if(frameCount% 80===0){
        bronzeCoin = createSprite(500,100)
        bronzeCoin.addImage(bronzeImg);
        bronzeCoin.velocityX = -6
        bronzeCoin.y=Math.round(random(10,190));
        bronzeCoin.scale = .2

        bronzeCoin.lifetime = 200

        bronzeCoinGroup.add(bronzeCoin);

        bronzeCoin.setCollider("circle", 0, 0, 80);
        bronzeCoin.debug = true;
    }
    if(frameCount% 100===0){
        silverCoin = createSprite(500,100)
        silverCoin.addImage(silverImg);
        silverCoin.velocityX = -7
        silverCoin.y=Math.round(random(10,190));
        silverCoin.scale = .1

        silverCoin.lifetime = 200

        silverCoinGroup.add(silverCoin);

        silverCoin.setCollider("circle", 0, 0, 80);
        silverCoin.debug = true;
    }
    if(frameCount% 200===0){
        goldCoin = createSprite(500,100)
        goldCoin.addImage(goldImg);
        goldCoin.velocityX = -8
        goldCoin.y=Math.round(random(10,190));
        goldCoin.scale = .2

        goldCoin.lifetime = 200

        goldCoinGroup.add(goldCoin);

        goldCoin.setCollider("circle", 0, 0, 80);
        goldCoin.debug = true;
    }
}