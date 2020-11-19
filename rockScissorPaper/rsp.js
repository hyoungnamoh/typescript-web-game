"use strict";
var imgCoords = '0';
var rsp = {
    ROCK: '0',
    SCISSORS: '-142px',
    PAPER: '-284px'
};
var score = {
    ROCK: 0,
    SCISSORS: 1,
    PAPER: -1
};
var computerChoice = function (imgCoords) {
    return Object.keys(rsp).find(function (k) { return rsp[k] === imgCoords; }); //타입 시스템에선 undefined가 나올 수 있다고 하지만 내가 확신할 수 있을 때 Type 'undefined' is not assignable to type 'ROCK | SCISSORS | PAPER'. 근디 어째 느낌표 빼도 에러가 안나냐
};
var interval;
document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        clearInterval(interval);
        setTimeout(intervalMaker, 2000);
        var myChoice = this.textContent; // 여기서 as 없애면 myChoice의 타입추론이 string이 되기때문에 밑에 줄에서
        var myScore = score[myChoice]; // myChoice === string이기 때문에 myScore까지 타입추론이 안 됨 any가 되어버림
        var computerScore = score[computerChoice(imgCoords)];
        var diff = myScore - computerScore;
        if (diff === 0) {
            console.log('ㅂㅣ김');
        }
        else if ([-1, 2].includes(diff)) {
            console.log('이김');
        }
        else {
            console.log('졌음');
        }
    });
});
function intervalMaker() {
    interval = setInterval(function () {
        if (imgCoords === rsp.ROCK) {
            imgCoords = rsp.SCISSORS;
        }
        else if (imgCoords === rsp.SCISSORS) {
            imgCoords = rsp.PAPER;
        }
        else {
            imgCoords = rsp.ROCK;
        }
        if (document.querySelector('#computer')) { // !사용 막기
            document.querySelector('#computer').style.background = "url(https://en.pimg.jp/023/182/267/1/23182267.jpg)" + imgCoords;
        }
    }, 100);
}
intervalMaker();
