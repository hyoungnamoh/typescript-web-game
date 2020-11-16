let str: string = 'hello';
let arr: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];
let arr3: [boolean, number, string] = [true, 1, 'hello'];
let arr4: [1, 2, 3] = [1, 2, 3];
let arr5: readonly [string] = ['hello'];
let arr6 = [1, 2, 3] as const;

const obj = {};
// obj = 'hello' 불가
// obj.a = 'hello' 가능
const obj2 = {} as const;
// obj2 = 'hello' 불가
// obj2.a = 'hello' 불가능
//프로퍼티까지 못바꾸게 할 수 있음

const obj3: { a: number, b: string } = { a: 1, b: '2' };
const obj4: { a: number, b?: string } = { a: 2 }; //? 있을 수도 있고 없을 수도 있고

enum Color { Red, Green, Blue }
Color['Red'] === 0;
Color[0] === 'Red';
Color['Green'] === 1;
Color[1] === 'Green';
Color['Blue'] === 2;
Color[2] === 'Blue';


const add = (a: number, b: number): number => {
  return a + b;
}

//하이오더펑션
const add2 = (a: number, b: number): (c: number) => number => {
  return (c: number) => {
    return 3;
  }
}