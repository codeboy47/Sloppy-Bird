$(function(){

    var mainBody = $('#main');
	var container=$('#container');
	var bird=$('#bird');
	var tube=$('.tube');
	var tube1=$('#tube1');
	var tube2=$('#tube2');
	var score = $('#score');
    var speedSpan = $('#speed');
    var high_score=$('#highscore');
    var restartButton = $('#restartButton');


	var container_width = parseInt(container.width()); // parseInt convert string into integer
    var container_height = parseInt(container.height());
    var tube_initial_position = parseInt(tube.css('right'));
    var tube_initial_height = parseInt(tube.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var speed = 10;

    var scores = 0;
    var go_up = false;
    var scoreUpdated = false;
    var game_over = false;
    var points=0;
    var highscore1 = localStorage.getItem("myhighscore");
    //localStorage.setItem("highscore",0);


    // game runs here
    var gameLogic= setInterval(function () {
    	 
    	if (collision(bird, tube1) || collision(bird, tube2) || 
            parseInt(bird.css('top')) <= 0 || 
            parseInt(bird.css('top')) > container_height - bird_height) {
            game_over = true;
            stop_the_game();
        }else{
        	
        	var tube_current_position=parseInt(tube.css('right'));

        	if(tube_current_position>container_width-75 && game_over == false)
        	{
        		var newHeight=parseInt(Math.random()*200);

        		//change tube height(before reseting it);
        		tube_current_position=tube_initial_position;
                if(newHeight > 100){
                    tube1.css('height',tube_initial_height-newHeight);
                    tube2.css('height',tube_initial_height+newHeight);
                }
                if(newHeight < 100){
        		    tube1.css('height',tube_initial_height+newHeight);
        		    tube2.css('height',tube_initial_height-newHeight);
                }

    			//update the score when the poles have passed the bird successfully
                /*if (tube_current_position > container_width - bird_left) {
                    if (scoreUpdated === false) {
                        score.text(parseInt(score.text()) + 1);
                        scoreUpdated = true;
                    }
                }
                scoreUpdated = false;*/

        		//change speed
        		speed=speed+0.5;
        		speedSpan.text(speed);
        		points=points+1;
                scores = points;

        		//add score through local storage
        		//if(highscore !== null){
      				 //if (points > parseInt(localStorage.getItem("highscore"))) {
          				localStorage.setItem("highscore", points );
          				//high_score.text(localStorage.getItem("highscore"));
          			//}
    			//}
                //else{
      				localStorage.setItem("highscore", points );
                    //localStorage.setItem("myscore1",score);
    			//}
                //high_score = localStorage.getItem("highscore");

          		//high_score.text(highscore);

        		score.text(points);

    	   }
    	   tube.css('right',tube_current_position + speed);
            if (go_up === false && game_over == false) {
                go_down();
            }
        }

    },30);

    //functions defined here
      
    //for keyboard
    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 32 && go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
    });

    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32 && game_over == false) {
            clearInterval(go_up);
            go_up = false;
        }
    });

    //for touch
     mainBody.mousedown(function(){
     	 if (go_up === false && game_over === false) {
            go_up = setInterval(up, 10);
        }
        
    });

     mainBody.mouseup(function(){
        //if(game_over === false)
     	 clearInterval(go_up);
            go_up = false;
        });


    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 5);
    }

    function up() {
        bird.css('top', parseInt(bird.css('top')) - 2.2);
    }



    function stop_the_game() {
        high_score.text(scores);
        clearInterval(gameLogic);
        // go_up is the var for calling function up continuously after every 10ms
        clearInterval(go_up); // this is done so that bird does not move upward continuously
        //clearInterval(up);
        game_over = true;
        restartButton.slideDown();
        localStorage.setItem("myhighscore",scores);
        window.alert("\n\n   GAME OVER  !!!! \n\n   YOUR SCORE IS : " + scores +"\n\n");
    }


    restartButton.click(function () {
        location.reload();
    });

    function collision($div1, $div2) {
        var x1 = $div1.offset().left; // offset returns coordinates(top,left) of element(p,h1,h2)
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1 - 5;
        var r1 = x1 + w1 - 5; // exactly touch the obstacle
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2 - 5;
        var r2 = x2 + w2 - 5;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

}); //Program terminates here
