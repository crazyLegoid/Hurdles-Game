class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    //player = new Player();
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(200, 100);
    //player1.addImage("player1",player1_img);
    player2 = createSprite(200, 250);
    //player2.addImage("player2",player2_img);
    player3 = createSprite(200,400);
    //player3.addImage("player3",player3_img);
    player4 = createSprite(200, 550);
    //player4.addImage("player4",player4_img);
    players = [player1, player2, player3, player4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(255);
      var index = 0;

      //x and y position of the players
      var x = 0 ;
      var y = 175;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the players a little away from each other in x direction
        y = y + 150;
        //use data form the database to display the players in y direction
        x = displayHeight - allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;

        if (index === player.index){
          
          stroke(10);
          fill("yellow");
          ellipse(x, y - 100, 20, 20);
          players[index - 1].shapeColor = "red";
          //camera.position.x = displayWidth/2;
          //camera.position.y = players[index-1].y;

        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }


    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    // if(player.distance > 3860){
    //   gameState = 2;
    // }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
