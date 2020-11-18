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

// 타입 캐스팅
let hello: number = 222;

// 타입 강제 형변환
// 형변환 하기 전 타입과 할 타입이 겹치는 경우 unknown 안써도 됨(ex 부모자식 관계)
(hello as unknown as string).substr(1, 2);
(<string><unknown>hello).substr(1, 2);

const div = document.createElement('div');
const div2 = div as HTMLDivElement;

// 함수 오버로딩
const a = (b?: string) => {
  console.log('hi');
}
a();
a('b');

// 위 처럼 매개변수가 비슷하거나 옵셔널이 아닌 완전 다른 애들이 들어오는 경우엔 interface를 사용해 오버로딩 할 수 있다.
interface aa {
  bb(a: string, b: string): void;
  bb(a: number[], b: number): void;
}

// interface
// 객체의 타입을 인터페이스를 둠
