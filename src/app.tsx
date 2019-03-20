/// <reference path="../typings/index.d.ts"/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as components from 'antd/es';
import { Builder } from './utils/builder';
import tree from '../mock/layout';
import Dog from './assets/dog';

import './practice'
// ReactDOM.render(<div className="test">
//   <Builder componentTree={tree} components={components} />
// </div>, document.getElementById("root"));

console.log( <Builder componentTree={tree} components={components} />)

const RootID = document.getElementById("root");

ReactDOM.render(<div className="test">
  <img src={Dog} />
</div>, RootID);

console.dir(RootID, "^&^&")
class Greeter {
  greeting: string;
  constructor(message: string) {
      this.greeting = message;
  }
  greet() {
      return "Hello, " + this.greeting;
  }
}

let greeter: Greeter = new Greeter("world");;
// greeter = 
console.log(greeter.greet());