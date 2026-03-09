// TIMER

let time = 59 * 60;

let timerElement = document.getElementById("timer");

let countdown = setInterval(function(){

let minutes = Math.floor(time / 60);
let seconds = time % 60;

if(seconds < 10) seconds = "0" + seconds;

timerElement.innerHTML = minutes + ":" + seconds;

time--;

if(time < 0){
clearInterval(countdown);
alert("Time's up! Quiz submitted automatically.");
calculateScore();
}

},1000);


// SCORE FUNCTION

function calculateScore(){

let score = 0;

for(let i=1;i<=15;i++){

let q = document.querySelector('input[name="q'+i+'"]:checked');

if(q){
score += Number(q.value);
}

}

document.getElementById("result").innerHTML =
"Your Score: " + score + " / 15";

}