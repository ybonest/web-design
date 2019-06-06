### Promise

1、有三种状态：pending、fulfilled、rejected
      状态变化结果只有两种:pending-->fulfilled与pending-->rejected

2、用法

```js
new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

3、Promise实例后的对象拥有属性

- then/catch

```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
}).catch(function(error) {
    // failure
});
```

