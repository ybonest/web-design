type functionType = (params: any) => any

interface PromiseCallBack {
  (resolve: functionType, reject: functionType): any
}

class PromisePolyfill {
  constructor(callback?: PromiseCallBack) {
    callback && callback(this.resolve, this.reject);
  }
  private storeResolve: Array<any> = []; // 存储fulfilled结果数据
  private storeReject: Array<any> = []; // 存储rejected结果数据
  private resolve(params: any) {
    this.storeResolve.push(params);
  }
  private reject(params: any) {
    this.storeReject.push(params);
  }
  then(onFulfilled?: functionType, onRejected?: functionType) {
    
  }
  catch (onRejected: functionType) {

  }
}

new PromisePolyfill(function (resolve, reject) {
  setTimeout(function () {
    resolve(123);
    reject(321);
  })
}).then(function () {
  console.log(12323);
})