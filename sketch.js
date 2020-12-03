var dog;
var dog_Img, happyDog_Img;
var database;
var foodS;
var foodStock;
var button1, button2;
var fedTime, lastFed;
var foodObj;

function preload(){
  dog_Img = loadImage("images/dogImg.png");
  happyDog_Img = loadImage("images/dogImg1.png");
}

function setup(){
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250, 250);
  dog.addImage("dog_Img");
  dog.addImage("happyDog_Img");
  foodStockRef = database.ref('Food');
  foodStockRef.on("value", readStock);
}

function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

  drawSprites();
  textSize(15);
  fill("white");
  text(" Note Press UP_ARROW Key To Feed Dragon Milk");
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }else{
    x = x-1;
  }

  database.ref('/').update({
    Food: x
  })
}