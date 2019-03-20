### 枚举

- 数字枚举
```js
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
```

- 字符串枚举
```js
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```
- 异构枚举
```js
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```