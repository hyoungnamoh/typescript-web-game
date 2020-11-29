const horizontal: number = 4;
const vertical: number = 3;
const colors: string[] = ['red', 'orange', 'green', 'yellow', 'white', 'red', 'orange', 'green', 'yellow', 'white', 'pink', 'pink'];

let colorCandidate: string[] = colors.slice();
let color: string[] = [];
let clickFlag: boolean = true;
let clickCard: HTMLDivElement[] = [];
let completedCard: HTMLDivElement[] = [];
let startTime: Date | null;
const shuffle = (): void => {
  for (let i: number = 0; 0 < colorCandidate.length; i++) { //colorCandidate 자체 길이가 한 번 돌때마다 줄어들기 때문에 i로 for문을 제어할 필요가 없음
    color = color.concat(colorCandidate.splice(Math.floor(Math.random() * colorCandidate.length), 1));
  }
}

const setCard = (horizontal: number, vertical: number) => {
  clickFlag = false;
  for (let i: number = 0; i < horizontal * vertical; i++) {
    const card: HTMLDivElement = document.createElement('div');
    card.className = 'card';
    const cardInner: HTMLDivElement = document.createElement('div');
    cardInner.className = 'card-inner';
    const cardFront: HTMLDivElement = document.createElement('div');
    cardFront.className = 'card-front';
    const cardBack: HTMLDivElement = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = color[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    card.addEventListener('click', function (this: HTMLDivElement) {
      if (clickFlag && !completedCard.includes(this)) {
        this.classList.toggle('flipped');
        clickCard.push(this);
        if (clickCard.length === 2) {
          const firstBackground: string = (clickCard[0].querySelector('.card-back') as HTMLDivElement)!.style.backgroundColor;
          const secondBackground: string = (clickCard[1].querySelector('.card-back') as HTMLDivElement)!.style.backgroundColor;
          if (firstBackground === secondBackground) {
            completedCard.push(clickCard[0]);
            completedCard.push(clickCard[1]);
            clickCard = [];
            if (completedCard.length === horizontal * vertical) {
              const endTime: number = new Date().getTime();
              alert(`축하합니다! ${(endTime - startTime!.getTime()) / 1000}초 걸리셨습니다!`);
              (document.querySelector('#wrapper') as HTMLDivElement).innerHTML = '';
              colorCandidate = colors.slice();
              color = [];
              clickFlag = true;
              clickCard = [];
              completedCard = [];
              startTime = null;
              shuffle();
              setCard(horizontal, vertical);
            }
          } else {
            clickFlag = false;
            setTimeout(() => {
              clickCard[0].classList.remove('flipped');
              clickCard[1].classList.remove('flipped');
              clickFlag = true;
              clickCard = [];
            }, 1000);
          }
        }
      }
    });
    (document.querySelector('#wrapper') as HTMLDivElement).appendChild(card);
  }
  document.querySelectorAll('.card').forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(() => {
    document.querySelectorAll('.card').forEach((card, index) => {
      card.classList.remove('flipped');
    });
    clickFlag = true;
    startTime = new Date();
  }, 5000);
}

shuffle();
setCard(horizontal, vertical);