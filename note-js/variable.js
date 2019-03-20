console.log(a);
console.log(c);
var c = a;
var a = 10;

function a(b) {
  console.log(b)
  var b = 20;
  console.log(b)
}

console.log(a);

c(5)