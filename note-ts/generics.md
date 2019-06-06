### 泛型
- 基本定义
```js
function identity<T>(arg: T): T {
    return arg;
}
// 一、传入类型
let output = identity<string>("myString");
// 二、利用类型推断
let output = identity("myString");  // type of output will be 'string'
```

- 泛型接口
```js
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

- 泛型类
```js
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

- 泛型约束
使用泛型时，若访问泛型修饰的变量下的属性，会提示错误，例如
```js
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
```
处理上例情况，我们可以定义一个接口描述约束条件
```js
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```
