import React from "react";

class StateComponent extends React.Component {
  state: { flag: number };

  constructor(props: any) {
    super(props);
    console.log(this.updater.enqueueReplaceState.toString());
    debugger;
    this.state = { flag: 1 };
  }

  componentDidMount() {
    debugger;
    this.setState({
      flag: this.state.flag + 1
    });
  }

  handleClick = () => {
    debugger
    this.setState({
      flag: this.state.flag + 1
    });
    console.log(this.state.flag);
    setTimeout(() => {
      console.log('setImmediate')
      this.setState({
        flag: this.state.flag + 2
      })
      console.log(this.state.flag)
    }, 0)
  };

  render() {
    return <div onClick={this.handleClick}>{this.state.flag}</div>;
  }
}

export default StateComponent;
