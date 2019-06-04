// js之面向切面编程

const extendsObjs: any = Function.prototype;

extendsObjs.before = function(Func: Function) {
  const _self = this;

  return function() {
    Func.apply(this, arguments);
    return _self.apply(this, arguments);
  }
}

extendsObjs.after = function(Func: Function) {
  const _self = this;

  return function() {
    const yet = _self.apply(this, arguments)

    Func.apply(this, arguments);

    return yet;
  }
}

function Aop() {
  console.log('this is aop test');
}

function BeforeAop() {
  console.log('this is before aop function');
}

function AfterAop() {
  console.log('1 this is after aop function');
}

function AfterAop2() {
  console.log('2 this is after aop function');
}

(Aop as any).before(BeforeAop).before(BeforeAop)();

(Aop as any).after(AfterAop).after(AfterAop2);