const html = document.documentElement;

const bells = new Audio("./sounds/work-done.wav");
const startBtn = document.querySelector(".btn-start");
const session = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

const workBtn = document.getElementById("btn-work");
const breakBtn = document.getElementById("btn-break");
const longBreakBtn = document.getElementById("btn-long-break");

const addTaskBtn = document.getElementById("btn-add-task");
const subtractTaskBtn = document.getElementById("btn-subtract-tasks");

const workTime = 25;
const breakTime = 5;
const longBreakTime = 15;

let mode = 0; // 0 = work, 1 = break, 2 = long break

let myInterval;
let running = false;

const stopTimer = () => {
    clearInterval(myInterval);
    running = false;
    startBtn.innerText = "Start";
}

const appTimer = () => {
    const minutes = Number.parseInt(document.querySelector(".minutes").textContent);
    const seconds = Number.parseInt(document.querySelector(".seconds").textContent);

    if (!running) {
        running = true;

        startBtn.innerText = "Pause";

        let totalSeconds = minutes * 60 + seconds;

        const updateSeconds = () => {
            const minuteDiv = document.querySelector(".minutes");
            const secondDiv = document.querySelector(".seconds");

            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;

            if (secondsLeft < 10) {
                secondDiv.textContent = "0" + secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`;

            if (minutesLeft === 0 && secondsLeft === 0) {
                bells.play();
                stopTimer();
                if (mode === 0) {
                    session.textContent = workTime;
                } else if (mode === 1) {
                    session.textContent = breakTime;
                } else {
                    session.textContent = longBreakTime;
                }
            }
    };
    myInterval = setInterval(updateSeconds, 1000);
  } else {
    stopTimer();
  }
};

const chooseMode = (newMode) => {
    mode = newMode;
    seconds.textContent = "00";
    stopTimer();
    if (newMode === 0) {
        session.textContent = workTime;
        document.getElementsByClassName("circle")[0].style.borderColor = "#e8748a";
        document.getElementsByClassName("circle")[1].style.borderColor = "#e8748a";
        html.style.backgroundImage = "linear-gradient(0deg, #ffc4c4 0%, #e8748a 100%)";
    } else if (newMode === 1) {
        session.textContent = breakTime;
        document.getElementsByClassName("circle")[0].style.borderColor = "#8eaee8";
        document.getElementsByClassName("circle")[1].style.borderColor = "#8eaee8";
        html.style.backgroundImage = "linear-gradient(0deg, #d1d5e6 0%, #8eaee8 100%)";
    } else {
        session.textContent = longBreakTime;
        document.getElementsByClassName("circle")[0].style.borderColor = "#5b6dae";
        document.getElementsByClassName("circle")[1].style.borderColor = "#5b6dae";
        html.style.backgroundImage = "linear-gradient(0deg, #a5abc1 0%, #5b6dae 100%)";
    }
};

startBtn.addEventListener("click", appTimer);

workBtn.addEventListener("click", () => chooseMode(0));
breakBtn.addEventListener("click", () => chooseMode(1));
longBreakBtn.addEventListener("click", () => chooseMode(2));
