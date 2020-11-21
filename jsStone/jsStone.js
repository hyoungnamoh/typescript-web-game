"use strict";
// interface Card {
//   att: number;
//   hp: number;
//   cost: number;
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Card = /** @class */ (function () {
    function Card(hero, mine) {
        // private class 안에서만 접근 가능
        // protected 상속받은 친구들까지 접근 가능
        // public 어떤 인스턴스에서도 접근 가능
        this.att = 0;
        this.hp = 0;
        this.cost = 0;
        if (hero) {
            return new Hero(mine);
        }
        else {
            this.att = Math.ceil(Math.random() * 5);
            this.hp = Math.ceil(Math.random() * 5);
            this.cost = Math.floor((this.att + this.hp) / 2);
        }
        if (mine) {
            this.mine = true;
        }
    }
    return Card;
}());
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero(mine) {
        var _this = _super.call(this, true, mine) || this;
        _this.att = Math.ceil(Math.random() * 2);
        _this.hp = Math.ceil(Math.random() * 5) + 25;
        _this.hero = true;
        _this.field = true;
        return _this;
    }
    return Hero;
}(Card));
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
