class Quiz {
  constructor(){}

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
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    
    question.hide();
  
    Contestant.getPlayerInfo();

    if(allContestants !== undefined){
      background("yellow");
      fill("blue");
      textSize(20);
      text("NOTE: Contestant who answered correctly will be highlighted in green.", 130,230);
      for(var plr in allContestants){
        var correctAns="2"
        if(correctAns === allContestants[plr].answer){
          fill("green");
        }

        else{
          fill("red");
        }
      }
    }
    
  }

}
