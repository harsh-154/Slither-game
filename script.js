let inputDir = { x: 0, y: 0 };
const moveSound = new Audio("bone-crack.mp3");
const foodSound = new Audio("error_CDOxCYm.mp3");
const gameOverSound = new Audio("roblox-death-sound_1.mp3");
let speed = 6;
let score=0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };

//Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1/speed) {
        return;
    }

    lastPaintTime = ctime;
    game_engine();

}
function collide(snake){
    // If you bump into yourslef

    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // If you bump into the wall

    if (snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0) {
        return true;
    }
    return false;
}
function game_engine() {
    //part1
    if(collide(snakeArr)){
        foodSound.play();
        inputDir={x:0,y:0};
        alert("GAME OVER:(press ctrl+r) to refresh");
        snakeArr = [{ x: 13, y: 15 }];
        score=0;
    }
    //regenrate food after eaten up 
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        gameOverSound.play();
        score++;
        /*if(score>hiscoreval)
            {
                hiscoreval=score;
                localStorage.setItem("highscore",JSON.stringify(hiscoreval));
                highscore.innerHTML="High Score:" + hiscoreval;
            }*/
        score.innerHTML="Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    //move snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    playarea.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        playarea.appendChild(snakeElement);
    })

    //part2
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    playarea.appendChild(foodElement);
}



//Main logic behind the game
/*let hiscore = localStorage.getItem("highscore");

if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(hiscoreval))
} else {
    hiscoreval = JSON.parse(hiscore);
    hiscore.innerHTML = "High Score: " + hiscore;
}*/
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir={x:0,y:1};
    switch (e.key) {
        case "ArrowUp": console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown": console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft": console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight": console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default: break;
    }
})