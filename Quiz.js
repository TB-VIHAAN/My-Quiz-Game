class Quiz{
    constructor(){

    }
    getState(){
        database.ref('gameState').on("value",(data)=>{
            gameState=data.val();
        })
    }

    update(state){
        database.ref('/').update({
            gameState:state
        })
    }

    async start(){
        if(gameState===0){
            contestant=new Contestant();
            var contestantCountRef=await database.ref('contestantCount').once("value");
            if(contestantCountRef.exists()){
                contestantCount=contestantCountRef.val()
            }
            question=new Question();
            question.display();
        }
    }

    play(){
        question.title.hide();
        question.input1.hide();
        question.input2.hide()
        question.button.hide();
        background("yellow");
        var title=createElement('h2');
        title.html("Result of the Quiz");
        title.position(350, 0);
        Contestant.getContestantInfo();
        if(allContestant!=undefined){
            var title1=createElement('h4');
            title1.html("*NOTE: Contestant who answered correct are highlighted in green color!");
            title1.position(150, 200);
            var display_position=230;
            for(var person in allContestant){
                var correctAns="2";
                if(correctAns===allContestant[person].answer)
                fill("green")
                else
                fill("red");
                display_position+=20;
                textSize(15);
                text(allContestant[person].name +": " +allContestant[person].answer,200,display_position)
            }
        }
    }
}