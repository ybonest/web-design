// 简单工厂
const CreateXHRFactory = function() {}

CreateXHRFactory.prototype.createXHRRequest = function() {
  const XMLHttpRequest = (window as any).XMLHttpRequest || (window as any).ActiveXObject("Microsoft.XMLHTTP");
  return new XMLHttpRequest();
}

const AjaxHander = function() {
  const XMLHttp = (CreateXHRFactory as any).createXHRRequest();
  // 具体操作
}

// 复杂工厂

const XMLHttpFactory = function() {}

XMLHttpFactory.prototype = {
  createFactory: function() {
    throw new Error('this is an abstract class');
  }
}

const XHRHandler = function() {
  XMLHttpFactory.call(this);
}

XHRHandler.prototype = new XMLHttpFactory();
XHRHandler.prototype.constructor = XHRHandler;

XHRHandler.prototype.createFactory = function() {
  const XMLHttpRequest = (window as any).XMLHttpRequest || (window as any).ActiveXObject("Microsoft.XMLHTTP");
  return new XMLHttpRequest();
}