"use strict";
// interface Card {
//   att: number;
//   hp: number;
//   cost: number;
// }
var Hero = /** @class */ (function () {
    function Hero(mine) {
        this.field = true;
        this.mine = mine;
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
    }
    return Hero;
}());
var Sub = /** @class */ (function () {
    function Sub(mine) {
        this.field = false;
        this.mine = mine;
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
    return Sub;
}());
var opponent = {
    // hero: document.getElementById('rival-hero'),
    // deck: document.getElementById('rival-deck'),
    // field: document.getElementById('rival-cards'),
    // cost: document.getElementById('rival-cost'),
    hero: document.getElementById('rival-hero'),
    deck: document.getElementById('rival-deck'),
    field: document.getElementById('rival-cards'),
    cost: document.getElementById('rival-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var me = {
    hero: document.getElementById('my-hero'),
    deck: document.getElementById('my-deck'),
    field: document.getElementById('my-cards'),
    cost: document.getElementById('my-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var turnButton = document.getElementById('turn-btn');
var turn = true; // true 내 턴
var initiate = function () {
    [opponent, me].forEach(function (item) {
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
};
var redrawDeck = function (target) {
    target.deck.innerHTML = '';
    target.deckData.forEach(function (data) {
        connectCardDOM({ data: data, DOM: target.deck });
    });
};
var createDeck = function (_a) {
    var mine = _a.mine, count = _a.count;
    var player = mine ? me : opponent;
    for (var i = 0; i < count; i++) {
        player.deckData.push(new Sub(mine));
    }
    redrawDeck(player);
};
var createHero = function (_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    player.heroData = new Hero(mine);
    connectCardDOM({ data: player.heroData, DOM: player.hero, hero: true });
};
var connectCardDOM = function (_a) {
    var data = _a.data, DOM = _a.DOM, _b = _a.hero, hero = _b === void 0 ? false : _b;
    var cardEl = document.querySelector('.card-hidden .card').cloneNode(true);
    cardEl.querySelector('.card-att').textContent = String(data.att);
    cardEl.querySelector('.card-hp').textContent = String(data.att);
    if (hero) {
        cardEl.querySelector('.card-cost').style.display = 'none';
        var name_1 = document.createElement('div');
        name_1.textContent = '영웅';
        cardEl.appendChild(name_1);
    }
    else {
        cardEl.querySelector('.card-cost').textContent = String(data.cost);
    }
    DOM.appendChild(cardEl);
};
var redrawScreen = function (_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    redrawHero(player);
};
var redrawHero = function (target) {
    // hero null error 잡기
    if (!target.heroData) {
        throw new Error('히어로 데이터가 없습니당');
    }
    target.hero.innerHTML = '';
    connectCardDOM({ data: target.heroData, DOM: target.hero, hero: true });
};
initiate();
