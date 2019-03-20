### CSS部分

1、[盒模型](https://cloud.tencent.com/developer/news/299250)  [盒模型MDN](http://www.w3school.com.cn/css/css_boxmodel.asp)

2、BFC：

​	块级格式化上下文，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元 素的定位不会相互影响。 

### JS 部分

**一、instanceof**

​	instanceof ：运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置 ，通俗讲就是	查看某一对象是否是某一构造函数实例化来的

**二、一个函数的定义以及构成**

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var auto = new Car('Honda', 'Accord', 1998);

console.log(Car instanceof Object) // true

console.log(auto instanceof Car);
// expected output: true

console.log(auto instanceof Object);
```

函数Car定义后默认存在的六个属性（不含原型链上的属性）

- arguments：函数参数集合形成的伪数组
- caller：caller返回一个函数的引用，这个函数调用了当前的函数。

```js
var a = function() { 
	alert(a.caller);  // 弹出b函数整体
} 
var b = function() { 
	a(); 
} 
b();
```

- length：参数个数

- name：函数名称

- prototype：原型属性

  1、原型属性本身是一个对象，含有constructor(指向函数本身)与\__proto__两个属性

  2、当函数被实例化后，实例对象的原型指针\__proto__会指向函数的prototype属性，借此形成实例对象的原型链。

  ```js
  new Car(1,2,3)
   make: 1
   model: 2
   year: 3 // 实例属性
   __proto__: // 指向Car的原型属性
    constructor: ƒ Car(make, model, year)
    __proto__: Object
  ```

  

- \__proto__：原型链指向

  创建一个函数实际上是实例化一个Function构造函数，函数实例属性以及原型属性都来自对Function的实例化

  ```JS
  Car instanceof Function ==> true
  Function instanceof Object ==> true
  所以由于原型链的原因
  Car instanceof Object ==> true
  ```

> Note：js中创建任何对象，都是在对构造函数的实例化过程，一切都遵循构造函数实例化的流程
>
> ```JS
> const obj = {};
> obj instanceof Object ==> true
> 1、Object 实际是 ƒ Object() { [native code] }
> 2、所以即便是一个普通对象，也是对Object原生构造函数的实例化，获取实例属性以及__proto__指向原型属性
> ```

**三、函数执行上下文**

​	执行上下文又称执行环境，分全局执行环境与函数执行环境、eval三种，每个执行环境都包含三部分内容：

- 变量对象/活动对象

  (1) 变量对象(VO)中存储了在上下文（环境）中定义的变量和函数声明，声明提升是就是发生在创建变量对象的过程中。

  (2) 活动对象：函数执行时产生	

- 作用域链

  > 闭包中的作用域链为静态作用域，指向所处函数上下文，因此闭包函数中访问外界变量时首先去所处函数环境中的变量对象中取对应的属性

- this

参考链接：[javas核心](http://www.cnblogs.com/TomXu/archive/2012/01/12/2308594.html)、[执行上下文](http://www.cnblogs.com/TomXu/archive/2012/01/13/2308101.html)、[变量对象](http://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html)、[this](http://www.cnblogs.com/TomXu/archive/2012/01/17/2310479.html)、[作用域链](http://www.cnblogs.com/TomXu/archive/2012/01/18/2312463.html)、[尾调用](https://www.jb51.net/article/104875.htm)

**四、尾调用与尾调用优化**

1、何为尾调用：通俗讲是在函数的最后一步调用另一函数

```js
'use strict'  // 以下测试只在js严格模式下，且必须safari浏览器才生效
funtion originCall(n) {
	return n;
}
function callerCallA(m) {
    const c = originCall(m); // 犹豫originCall执行结果赋值给c，所以函数执行上下文不会从执行栈中移除
    return c; // 非尾调用，
}
function callerCall(m) {
    return m + originCall(m); // 函数最后一句并非单纯调用另一函数，所以非尾调用
}
function recursionCall(v) {
    return originCall(v) // 尾调用
}
```

理解尾调用首先需要了解js执行栈与执行上下文相关知识

- 执行上下文：每次当控制器转到ECMAScript可执行代码的时候，即会进入到一个执行上下文(EC)

- 执行栈：js代码进入执行后，会形成一个call stack(以下简写CS)，CS栈首先压入栈底的是global EC-->全局执行上下文(内容包含变量对象、作用域链以及this)，global EC执行的过程中当遇到方法时，会产生该方法的执行上下文，然后方法执行上下文被压入栈，执行该方法，该方法执行过程中若遇到其它方法，重复以上过程……，当方法执行完毕，call stack会移除当前方法执行上下文，执行权交给放在栈顶的执行上下文……

​        **尾调用**就是利用执行栈对执行上下文push与pop做优化的，Call Stack会在函数执行完毕后将函数执行上下文移除栈顶(return或抛出异常都可以结束函数上下文，也就是函数执行结束)，所以尾调用就是在函数最后一步调用另一函数，原函数执行完毕被移除栈，并将return之后执行的函数压入栈中。

​	利用尾调用可以在递归时做一些优化，防止栈溢出。

```js
'use strict'; // 以下测试只在js严格模式下，且必须safari浏览器才生效
function recursion(n) {
  if (n === 0) {
    return 0;
  }
  return recursion(n - 1) + n;
}

const sum = recursion(100000); // 栈溢出
console.log(sum)

function recursionTail(n, sum) {
  if (n === 0) {
    return sum;
  }
  return recursionTail(n - 1, n + sum);
}

const sumTail = recursionTail(100000, 0); // 运行正常
console.log(sumTail)
```

> Note：ES6尾调用优化只在严格模式下开启，正常模式无效，且经过测试尾调用优化只在safari浏览器中实现了，其他浏览器暂未实现
>
> V8引擎官方团队对此官方解释：Proper tail calls have been implemented but not yet shipped given that a change to the feature is currently under discussion at TC39. (实际已实现，但未发布)

参考链接：[详解JavaScript调用栈、尾递归和手动优化](https://www.jb51.net/article/115303.htm)、[尾调用优化](http://www.ruanyifeng.com/blog/2015/04/tail-call.html)

**五、从执行上下文与变量对象角度去分析JS变量提示与函数提升**

先看一个简单的例子

```js
console.log(a);  // 输出a方法
console.log(c);  // 输出undefined
var c = a;
var a = 10;

function a(b) {
  console.log(b) // 输出b的形参值
  var b = 20;
  console.log(b) // 输出20
}

console.log(a);  // 输出10
c(5)
```

分析：当代码执行时，首先形成全局执行上下文，而变量对象(VO)属于全局执行上下文的一部分，变量对象包括了：变量声明、函数声明(声明提升其实就是发生在变量对象定义过程中的)，在变量声明时若已存在相同名称的形参或函数，则变量声明不会干扰已存在的这类属性，也就是说变量对象中只存在相应的形参或函数声明，而同样名称变量声明不会再放入变量对象中，之后当代码执行到对应的变量赋值时，相当于为当前变量对象中已存在的函数声明或形参重新赋予新的值。

填充VO的顺序是: 函数的形参 -> 函数申明 -> 变量申明。 

```js
// 伪代码：全局环境变量对象
Global(VO) = {
	a: <reference to FunctionDeclaration "d">,
	c: undefined,
}
// 伪代码：函数a执行环境中的活动对象(在函数执行上下文，VO不能直接访问，所以实际上由活动对象(AO)代替VO)
// VO是创建阶段生成的，AO则是执行阶段已VO为基准生成的。
// AO相比较VO而言，多了arguments、形参等属于函数特征的变量(此处暂无法确定，网上查询AO与VO解释不唯一)
a(AO) = {
    arguments: {
        0: [b],
        length: 1,
        callee: a
    }
    b: undefined
}
```

最终，上述代码实际执行形式为：

```js
function a(b) {
  console.log(b) // 输出b的形参值
  var b = 20;
  console.log(b) // 输出20
}
var c = undefined;

console.log(a);  // 输出a方法
console.log(c);  // 输出undefined

c = a;
a = 10;

console.log(a);  // 输出10
c(5)
```

参考链接：[变量对象](http://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html)

**六、论作用域链**

​	JS代码在执行过程中每个执行上下文都存在一个作用域链属性，该属性描述了当前执行上下文与上级执行上下文的关系，从而实现访问上级执行上下文定义的变量或函数。

```js
function too(){}

// 从全局上下文开始分析too的作用域链形成过程
1、首先js代码执行，形成全局上下文环境
Global Context = {
    VO,	// 变量对象
    scope, // 作用域链
    this  // this引用
}
2、生成函数too，并且赋予too函数自身属性
{
	arguments: null,
	caller: null,
	length: 0,
	name: "too",
	prototype: {constructor: ƒ},
	__proto__:	ƒ (),
	[[FunctionLocation]]: VM883:1,
	[[Scopes]]: Scopes[1]  // 此处Scopes属性就是Global上下文中的VO集合
}
3、形成函数执行上下文
Too Context = {
    VO/AO,
    scope: [Too.AO, too.[[Scopes]]], // 此处形成函数执行上下文作用域链
    this
}
```

参考链接：[作用域链](http://www.cnblogs.com/TomXu/archive/2012/01/18/2312463.html)

**七、闭包**：闭包其实就是函数上下文与自身作用域链形成的一种静态作用域

```
function closePlugin() {
    var x = 1;
    return function(){  
        console.log(1)
    }
}
```

**八、函数实参与arguments关系**

```js
function b(x, y, a) {
    arguments[2] = 10;
    alert(a);  // 10（由于实参与arguments同步，所以a = 10）
}
b(1, 2, 3);
```

函数arguments与函数调用实际传进的参数是共享的，但此共享非内存共享，而是js引擎实现实参与arguments数据同步，若某个参数在函数调用未传入，但是通过arguments赋值，这时相对应的参数值是不共享的

```js
function b(x, y, a) {
    arguments[2] = 10;
    alert(a);  // undefined(未传入对应实参时，arguments对应位置的值与实参值不同步)
}
b(1, 2);
```

**九、构造函数**

1、调用构造函数时，所有实例共享同一个原型

```js
function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
}

Car.prototype.output= function () {
    return this.model + "走了" + this.miles + "公里";
};

var tom = new Car("大叔", 2009, 20000);
var dudu = new Car("Dudu", 2010, 5000);

console.log(tom.output());
console.log(dudu.output());
```

2、不用new实例构造函数

```js
function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
    // 自定义一个output输出内容
    this.output = function () {
        return this.model + "走了" + this.miles + "公里";
    }
}

//方法1：作为函数调用
Car("大叔", 2009, 20000);  //添加到window对象上
console.log(window.output());

//方法2：在另外一个对象的作用域内调用
var o = new Object();
Car.call(o, "Dudu", 2010, 5000);
console.log(o.output()); 
```
**十、设计模式**

单例模式、构造函数模式、建造者模式、工厂模式、装饰着模式、观察者模式、策略模式