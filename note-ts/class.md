#### 类

- 继承
- 公共、私有、保护修饰符
 - public:默认类型
 - private：只能在本类中访问，实例对象与派生类皆不可以
 - protected：只能在本类和派生类中访问，实例对象不可以
- readonly修饰符：声明时必须初始化
- 存取器：set get
```js
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```

- 静态属性：static
- 抽象类：abstract

- 高级技巧
```js
class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}

let greeter1: Greeter; // Note: Greeter类的实例的类型是 Greeter
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter; // Note: 意思是取Greeter类的类型，而不是实例的类型
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());
```
> Note:注意两者区别，一为实例化后调用实例属性，二为调用类本是的静态方法