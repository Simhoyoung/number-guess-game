// 랜던번호 지정
// 유저가 번호를 입력, go 라는 버튼을 누름
// 유저가 랜던번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호, Down !
// 랜덤번호가 > 유저번호, Up
// Reset 버튼을 누르면 게임이 리셋
// 5번의 기회를 다 쓰면 게임이 끝난다 (더 이상 진행 X, 버튼 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려주고, 기회 깎지 않음
// 유저가 이미 입력한 숫자라면 알려주고, 기회 깎지 않음

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", () => {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답:", computerNum);
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1~100사이 숫자를 입력해주세요";
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요";
    return;
  }
  chances--;
  chanceArea.textContent = `남은 기회:${chances}번`;
  console.log("chance", chances);

  if (userValue < computerNum) {
    resultArea.textContent = "UP!!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down!!";
  } else {
    resultArea.textContent = "Great!!";
    gameOver = true;
  }

  history.push(userValue);
  console.log(history);

  if (chances < 1) {
    gameOver = true;
  }

  if (gameOver) {
    playButton.disabled = true;
  }
}

function reset() {
  // user input 창이 정리
  userInput.value = "";

  // 새로운 번호가 생성
  pickRandomNum();

  resultArea.textContent = "결과값이 여기 나옵니다";
}

pickRandomNum();
