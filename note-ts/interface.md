#### 接口
- 基本定义
- 可选属性
- 只读属性：readonly、ReadonlyArray<T>
```js
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!

// Note: 使用ReadonlyArray后无法再赋值给另一普通数组，但可以通过类型断言重写：a = ro as number[];
a = ro as number[];
```
- 
>


- 额外的属性检查
typescript 中定义接口类型后，会检测是否含有定义类型，以及多余类型，不符合条件则报错

有多余接口定义类型时，ts提示错误，但可以绕过类型检测
```js
interface SquareConfig {
  color?: string;
  width?: number;
}
function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

// error: 'colour' not expected in type 'SquareConfig'
let mySquare = createSquare({ colour: "red", width: 100 });
```

绕过检测类型检测的方式有三种
其一：使用字符串索引签名
```js
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```
其二：使用类型断言
```js
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```
其三：先赋值给一变量，再由变量传入函数
```js
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```

- 函数类型
```js
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
```

- 可索引类型
  - 数字索引
  - 字符串索引
  - 只读索引：使用readonly修饰符修饰
```js
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

- 类类型
  - typescript 中类可以如同java等语言一样继承接口

```js
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```

  - 类类型检测
类中具有静态部分的类型和实例类型