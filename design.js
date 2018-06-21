
$(function(){
    var audio1 = $("#aud1")[0];
    //var audio1 = document.getElementById("aud1");
    audio1.play();
    var audio2 = $('#aud2')[0];
    var audio3 = $('#aud3')[0];
    var audio4 = $('#aud4')[0];
    var mainBody = $('#main');
	var container = $('#container');
	var bird = $('#bird');
	var tube = $('.tube');
	var tube1 = $('#tube1');
	var tube2 = $('#tube2');
	var score = $('#score');
    var speedSpan = $('#speed');
    var high_score = $('#highscore');
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
    var points = 0;
    var highscoring = localStorage.getItem("myhighscore"); // local storage stores as key value pair
    if(highscoring !== null)
        high_score.text(localStorage.getItem("myhighscore"));

    // game runs here
    var gameLogic = setInterval(function () {
        // if collision happens
    	if (collision(bird, tube1) || collision(bird, tube2) ||
            parseInt(bird.css('top')) <= 0 ||
            parseInt(bird.css('top')) > container_height - bird_height) {
            audio4.play();
            game_over = true;
            stop_the_game();
        }else{
        	var tube_current_position = parseInt(tube.css('right'));

            // if we have passed the tube successfully
            if(tube_current_position > container_width - 100 && game_over == false){
                audio3.play();
            }

        	if(tube_current_position > container_width-75 && game_over == false)
        	{

        		tube_current_position = tube_initial_position;

                //change tube height(before reseting it);
        		var newHeight=parseInt(Math.random()*200);
                if(newHeight > 100){
                    tube1.css('height',tube_initial_height-newHeight);
                    tube2.css('height',tube_initial_height+newHeight);
                }
                if(newHeight < 100){
        		    tube1.css('height',tube_initial_height+newHeight);
        		    tube2.css('height',tube_initial_height-newHeight);
                }


        		speed=speed+0.5;
        		speedSpan.text(speed);
        		points=points+1;
                scores = points;

        		score.text(points);

    	    }

            // increasing the speed of tube
            tube.css('right',tube_current_position + speed);

            // move bird downwards
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
            go_up = setInterval(up, 10);
        }
    });

    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32 && game_over == false) {
            //audio4.play();
            clearInterval(go_up);
            go_up = false;
        }
    });

    //for mouse
     mainBody.mousedown(function(){
     	 if (go_up === false && game_over === false) {
            go_up = setInterval(up, 10);
        }

    });

     mainBody.mouseup(function(){
         clearInterval(go_up);
         go_up = false;
     });

     // for touch
     $(document).on('touchstart', function (e) {
        if (go_up === false && game_over === false) {
            go_up = setInterval(up, 10);
        }
     });

     $(document).on('touchend', function (e) {
            clearInterval(go_up);
            go_up = false;
     });



    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 8);
    }

    function up() {
        //audio4.play();
        bird.css('top', parseInt(bird.css('top')) - 4);
    }



    function stop_the_game() {
        audio1.pause();
        audio2.play();
        if(highscoring !== null){
            if(scores > highscoring){
                high_score.text(scores);
                localStorage.setItem("myhighscore",scores);
            }
        }else{
            high_score.text(scores);
            localStorage.setItem("myhighscore",scores);
        }

        clearInterval(gameLogic);
        // go_up is the var for calling function up continuously after every 10ms
        clearInterval(go_up); // this is done so that bird does not move upward continuously
        game_over = true;
        audio2.addEventListener("ended", function(){
            audio2.currentTime = 0;
            //window.alert("\n\n   GAME OVER  !!!! \n\n   YOUR SCORE IS : " + scores +"\n\n");
            console.log("ended");
            if (confirm("\n\n   GAME OVER  !!!! \n\n   YOUR SCORE IS : " + scores +"\n\n")) {
                restartButton.slideDown();
            }
        });



    }

    restartButton.click(function () {
        location.reload();
    });

    function collision($div1, $div2) {
        var x1 = $div1.offset().left; // offset returns coordinates(top,left) of element(p,h1,h2)
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true); // outer width (if true margin is included)
        var w1 = $div1.outerWidth(true); // width of bird is 45
        var b1 = y1 + h1 - 5;
        var r1 = x1 + w1 - 5; // exactly touch the obstacle
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true); // width of tube is 53
        var b2 = y2 + h2 - 5;
        var r2 = x2 + w2 - 5;
        //alert("x1= " + x1 + " w1= " + w1 + " r1= " + r1 + " x2= " + x2 + " w2= " + w2 + " r2= " + r2);
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

}); //Program terminates here
