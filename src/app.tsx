/// <reference path="../typings/index.d.ts"/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import * as components from 'antd/es';
// import { Builder } from './utils/builder';
// import tree from '../mock/layout';
// import Dog from './assets/dog';
import StateComponent from './components/StateComponent';

// import './practice'
// ReactDOM.render(<div className="test">
//   <Builder componentTree={tree} components={components} />
// </div>, document.getElementById("root"));

// console.log( <Builder componentTree={tree} components={components} />)

// ReactDOM.render(<div className="test">
//   <img src={Dog} />
// </div>, RootID);
// console.log(<StateComponent />)
// ReactDOM.render(<StateComponent />, RootID);
// ReactDOM.render(<div />, RootID);
// console.dir(RootID, "^&^&")
// class Greeter {
//   greeting: string;
//   constructor(message: string) {
//       this.greeting = message;
//   }
//   greet() {
//       return "Hello, " + this.greeting;
//   }
// }

// let greeter: Greeter = new Greeter("world");;
// // greeter = 
// console.log(greeter.greet());
interface ProviderProps {
  store: any
}

const store = {
  a: 1
}

setInterval(() => {
  console.log('this is interval function')
  store.a = store.a + 1;

  console.log(store)
}, 1000);

const StoreContext = React.createContext(null);

class Provider extends React.Component<ProviderProps, any> {
  store: any = null;

  constructor(props: any) {
    super(props);
    this.store = props.store;
  }

  componentWillReceiveProps() {
    console.log(99999)
  }

  render() {
    console.log('this is render function');
    return (
      <StoreContext.Provider value={this.props.store}>
        <StoreContext.Consumer>
          {(store) => <div>{store.a}</div>}
        </StoreContext.Consumer>
      </StoreContext.Provider>)
    // return React.Children.only(this.props.children);
  }
}

const RootID = document.getElementById("root");

ReactDOM.render(<Provider store={store} />, RootID);

// ReactDOM.render(<div className="test">
//   <img src={Dog} />
// </div>, RootID);

// console.dir(RootID, "^&^&")
// class Greeter {
//   greeting: string;
//   constructor(message: string) {
//       this.greeting = message;
//   }
//   greet() {
//       return "Hello, " + this.greeting;
//   }
// }

// let greeter: Greeter = new Greeter("world");;
// // greeter = 
// console.log(greeter.greet());
