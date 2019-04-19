let simonSaysArray = [];
let userInput = [];
let currentRound = 0;
let score = 0;
let sequence = 0;
let started = true;
let quit = false;

// setting interval
let simonSays = function(simonSaysArray) {
    let x = 0
    let flashColor = setInterval( // flashing circles
        function(){
            $('#circle' + simonSaysArray[x]).fadeTo('fast', 0.5).fadeTo('fast', 1);
            x++;
            if(x >= simonSaysArray.length){
                clearInterval(flashColor)
            }
        }, 1000
    )
}

// starting sequence
let roundStart = function() {
    let circles = document.getElementsByClassName('button');
    if(started && !quit){
        for(let i = 0; i < circles.length; i++){
            circles[i].addEventListener('click', function(){
                $(this).fadeTo('fast', 0.5).fadeTo('fast', 1);
                let circleId = this.getAttribute('id'); // this circle
                userInput.push(parseInt(circleId.charAt(circleId.length - 1))); // grabbing last user input's circle array
                roundStart(); // running program again
            });
        }
        quit = true;
    }

// checks if the game has started
    if(started){
        simonSaysArray.push(Math.floor(Math.random()*4)+1);
        simonSays(simonSaysArray); // flashing circles
        started = false;
    }

// checking userInput and simonSaysArray
    for(let i = 0; i < userInput.length; i++){
        if(JSON.stringify(userInput) === JSON.stringify(simonSaysArray)){  // array becomes a string
            userInput = [];
            simonSaysArray.push(Math.floor(Math.random()*4)+1);
            simonSays(simonSaysArray); // simonSaysArray takes the array and flashs circles
            score++;
            let scoretext = document.getElementById('score'); // score
            scoretext.innerText = '' + score;
            roundStart(); // runs program again
            break;
        }

        // checking userInput and simonSaysArray if they do not match up
        if(userInput[i] !== simonSaysArray[i]){
            userInput = [];
            simonSaysArray = [];
            score = 0;
            let scoretext = document.getElementById('score');
            scoretext.innerText = '' + score;
            started = true;
            alert('You lose')
            break;
        }
    }
}

// start sequence button
let start = document.getElementById('start').addEventListener('click', function () {
    roundStart();
});

// quit button
let quit = document.getElementById('quit').addEventListener('click', function () {
    userInput = [];
    simonSaysArray = [];
    score = 0;
    let scoretext = document.getElementById('score');
    scoretext.innerText = '' + score;
    started = true;
});
