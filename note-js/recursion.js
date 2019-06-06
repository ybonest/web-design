/**
 * 程序执行栈与尾调用
 */
'use strict';
function recursion(n) {
  if (n === 0) {
    return 0;
  }
  return recursion(n - 1) + n;
}

const sum = recursion(100000);

console.log(sum)

function recursionTail(n, sum) {

  if (n === 0) {
    return sum;
  }
  return recursionTail(n - 1, n + sum);
}

const sumTail = recursionTail(100000, 0);
console.log(sumTail)