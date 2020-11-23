// interface Card {
//   att: number;
//   hp: number;
//   cost: number;
// }

// 기존 자바스크립트 방식 클래스
// class Card {
//   constructor(hero, mine) {
//     if (hero) {
//       this.att = Math.ceil(Math.random() * 2);
//       this.hp = Math.ceil(Math.random() * 5) + 25;
//       this.hero = true;
//       this.field = true;
//     } else {
//       this.att = Math.ceil(Math.random() * 5);
//       this.hp = Math.ceil(Math.random() * 5);
//       this.cost = Math.floor((this.att + this.hp) / 2);
//     }
//     if (mine) {
//       this.mine = true;
//     }
//   }
// }

// class의 틀을 잡아주는 상위 interface, 앞에 I를 붙여주는 관습이 좀 있음
// 실제로 쓰이진 않지만 규정을 주고 싶을 때 주로 사용 (실제로 쓰이면 class로 사용)
interface ICard {
  // impliments하는 곳에서 얘네를 private이나 protected로 선언하는 경우 사용할 수 없음.. 당연히..
  att?: number;
  hp?: number;
}
// class Card implements ICard {
//   // private class 안에서만 접근 가능
//   // protected 상속받은 친구들까지 접근 가능
//   // public 어떤 인스턴스에서도 접근 가능
//   public att?: number;
//   public hp?: number;
//   private cost?: number;
//   private mine?: boolean;
//   constructor(hero: boolean, mine: boolean) {
//     if (hero) {
//       return new Hero(mine);
//     } else {
//       this.att = Math.ceil(Math.random() * 5);
//       this.hp = Math.ceil(Math.random() * 5);
//       this.cost = Math.floor((this.att + this.hp) / 2);
//     }
//     if (mine) {
//       this.mine = true;
//     }
//   }
// }

interface Card {
  att: number;
  hp: number;
  mine: boolean;
  field: boolean;
  cost?: number;
  hero?: boolean;
}
class Hero implements Card {
  public att: number;
  public hp: number;
  public hero: boolean;
  public field: boolean = true;
  public mine: boolean;
  constructor(mine: boolean) {
    this.mine = mine;
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
    this.field = true;
  }
}

class Sub implements Card {
  public att: number;
  public hp: number;
  public field: boolean = false;
  public mine: boolean;
  public cost: number;
  constructor(mine: boolean) {
    this.mine = mine;
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.cost = Math.floor((this.att + this.hp) / 2);
  }
}


interface Player {
  hero: HTMLDivElement,
  deck: HTMLDivElement,
  field: HTMLDivElement,
  cost: HTMLDivElement,
  deckData: Card[],
  heroData: Card | null,
  fieldData: Card[],
  chosenCard: HTMLDivElement | null, // 내가 선택한 상태일 수도 있고 선택하지 않은 상태일 수도 있으므로 null이 필요함
  chosenCardData: Card | null,
}

const opponent: Player = {
  // hero: document.getElementById('rival-hero'),
  // deck: document.getElementById('rival-deck'),
  // field: document.getElementById('rival-cards'),
  // cost: document.getElementById('rival-cost'),
  hero: document.getElementById('rival-hero') as HTMLDivElement,
  deck: document.getElementById('rival-deck') as HTMLDivElement,
  field: document.getElementById('rival-cards') as HTMLDivElement,
  cost: document.getElementById('rival-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};
const me: Player = {
  hero: document.getElementById('my-hero') as HTMLDivElement,
  deck: document.getElementById('my-deck') as HTMLDivElement,
  field: document.getElementById('my-cards') as HTMLDivElement,
  cost: document.getElementById('my-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};

const turnButton = document.getElementById('turn-btn') as HTMLButtonElement;
let turn = true; // true 내 턴

const initiate = () => {
  [opponent, me].forEach((item) => {
    item.deckData = [];
    item.heroData = null;
    item.fieldData = [];
    item.chosenCard = null;
    item.chosenCardData = null;
  });
  createDeck({ mine: true, count: 5 });
  createDeck({ mine: false, count: 5 });
  createHero({ mine: true });
  createHero({ mine: false });
  redrawScreen({ mine: true });
  redrawScreen({ mine: false });
}

const redrawDeck = (target: Player) => {
  target.deck.innerHTML = '';
  target.deckData.forEach(data => {
    connectCardDOM({ data, DOM: target.deck });
  });
}

const createDeck = ({ mine, count }: { mine: boolean, count: number }) => {
  const player = mine ? me : opponent;
  for (let i: number = 0; i < count; i++) {
    player.deckData.push(new Sub(mine));
  }
  redrawDeck(player);
}

const createHero = ({ mine }: { mine: boolean }) => {
  const player = mine ? me : opponent;
  player.heroData = new Hero(mine);
  connectCardDOM({ data: player.heroData, DOM: player.hero, hero: true });
}

interface connect {
  data: Card,
  DOM: HTMLDivElement,
  hero?: boolean
}
const connectCardDOM = ({ data, DOM, hero = false }: connect) => {
  const cardEl = document.querySelector('.card-hidden .card')!.cloneNode(true) as HTMLDivElement;
  cardEl.querySelector('.card-att')!.textContent = String(data.att);
  cardEl.querySelector('.card-hp')!.textContent = String(data.att);

  if (hero) {
    (cardEl.querySelector('.card-cost') as HTMLDivElement).style.display = 'none';
    const name = document.createElement('div');
    name.textContent = '영웅';
    cardEl.appendChild(name);
  } else {
    cardEl.querySelector('.card-cost')!.textContent = String(data.cost);
  }
  DOM.appendChild(cardEl);
}

const redrawScreen = ({ mine }: { mine: boolean }) => {
  const player = mine ? me : opponent;
  redrawHero(player);
}

const redrawHero = (target: Player) => {
  // hero null error 잡기
  if (!target.heroData) {
    throw new Error('히어로 데이터가 없습니당');
  }
  target.hero.innerHTML = '';
  connectCardDOM({ data: target.heroData, DOM: target.hero, hero: true });
}

initiate();