#### 函数
- 基本定义
- 推断类型
```js
// The parameters `x` and `y` have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; }; // 会自动推断x为number，y为number
```
- 参数
  - 可选参数
```js
function buildName(firstName: string, lastName?: string) {
    // ...可选参数必须放在必选参数末尾
}
```
  - 默认参数
```js
function buildName(firstName: string, lastName = "Smith") {
    // ... 默认参数位置随意
}
```
  - 剩余参数
```js
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

- this
  - 在对象字面量中的this问题
当设置noImplicitThis标记时，对象字面量函数属性中的this需指明类型，否则默认指向any，会产生警告
```js
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card; // Note: 这里this类型特意指向了Deck
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) { // Note: 这里this类型特意指向了Deck
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```