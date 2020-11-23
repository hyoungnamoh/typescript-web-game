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
// 주로 객체에 많이 사용
// 같은 이름 여러개로 분리할 수 있음 컴파일 시 모두 합쳐짐
interface RSP {
  readonly ROCK: '0',
  readonly SCISSORS: '-142px',
  readonly PAPER: '-284px',
}

interface Example { //뭐가 들어올지 모를 때 이렇게 널널하게 줄 수 있음
  a: 3,
  b: 7,
  [key: string]: number,
}
const ex: Example = {
  a: 3,
  b: 7,
}
const ex2: Example = {
  a: 3,
  b: 7,
  dasdd: 12514124123,
}

// type alias
// interface 보다 좀 더 넓은 범위
// 커스텀 타입같은 느낌?
// | 많이 씀
// 객체는 웬만하면 interface로, 타입 여러개 만들면 복잡해짐
type Hello = string | number;
type Hello2 = string | {
  ROCK: string
  SCISSORS: string
  PAPER: string
}
const hi: Hello2 = {
  ROCK: '0',
  SCISSORS: '-142px',
  PAPER: 'ze',
}
const hi2: Hello2 = 'hello2';

// keyof interface명 === interface 키값들을 가져옴
// interface명[keyof interface명] === interface 값들을 가져올 수 있음

// 이벤트 함수에서 이벤트를 거는 대상 자체를 넘기려면 일반함수에선 this를 넣어주고 타입을 명시해줌. 이 this가 이벤트 대상이 됨 이렇게 해야 this의 타입추론이 명확하게 됨
document.querySelector('#btn')?.addEventListener('click', function (this: HTMLButtonElement) {
  // this === document.querySelector('#btn')
});

// 리턴값이 string | null 이런애들의 경우 null이 올 수도 있다고 에러잡히는 경우가 있는데 이럴 경우
if (document.querySelector('#btn')) { // 이런식으로 잡아줄 수 있음
  let btn = document.querySelector('#btn');
} // 이렇게 해도 안되는 경우가 있는데 이럴 땐
let btn = document.querySelector('#btn'); // 이런식으로 변수에 담아서 사용하면 잡힌다,, 이럴빠엔 느낌표 사용하는것도 고려해보자..
if (btn) {
  let btn2 = btn;
}

// 실행 시
// tsc 파일명.ts -w 이런식으로 파일을 명시하면 tsconfig가 적용되지 않음
// => npx tsc -w 이렇게 전체를 그냥 tsc하게 함

// 제네릭
// 들어오는 타입의 위치를 정해주고 싶을 때 사용, 짝 맞추기
type T = string | number;

interface obj<T> {
  add: (a: T, b: T) => T;
}

const g1: obj<number> = {
  add: (a, b) => a + b,
}
const g2: obj<string> = {
  add: (a, b) => a + b,
}

g1.add(1, 2);
g2.add('a', 'b');
g1.add(1, 'a');
g2.add('1', 2);

// 제네릭에 넣는 타입에 제약을 둘 때 extends를 쓸 수 있음
interface extObj<T extends string> { //string과 string을 extends한 타입만 들어오게
  add: (a: T, b: T) => T;
}

const extObj1: extObj<number> = {
  add: (a, b) => a + b,
}
const extObj2: extObj<string> = {
  add: (a, b) => a + b,
};

[1, 'a', 2, null, undefined].forEach(element => {

});

// 구조분해할당 했을 경우엔 타입을 객체 뒤에 써줘야 함 +추가로 인자에 각 벨류를 하나씩 넣는거보다 저렇게 객체 형태로 넣는게 이 값이 어떤값인지 힌트를 줄 수 있고 가독성이 한결 좋아짐
const createDeck = ({ mine, count }: { mine: boolean, count: number }) => {
  
}


