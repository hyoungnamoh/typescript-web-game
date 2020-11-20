interface Player {
  hero: HTMLDivElement,
  deck: HTMLDivElement,
  field: HTMLDivElement,
  cost: HTMLDivElement,
  deckData: Card[],
  heroData: Card | null,
  fieldData: Card[],
  chosenCard: HTMLDivElement | null,
  chosenCardData: Card | null,
}

const opponent = {
  hero: document.getElementById('rival-hero'),
  deck: document.getElementById('rival-deck'),
  field: document.getElementById('rival-cards'),
  cost: document.getElementById('rival-cost'),
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCardData: null,
};
const me = {
  hero: document.getElementById('my-hero'),
  deck: document.getElementById('my-deck'),
  field: document.getElementById('my-cards'),
  cost: document.getElementById('my-cost'),
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCardData: null,
};