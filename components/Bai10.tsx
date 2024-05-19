import { Component } from 'react'
interface CounterState {
    count: number;
}

export default class Bai10 extends Component<{}, CounterState> {
    private timerID?: NodeJS.Timeout;

    constructor(props: {}) {
        super(props);
        this.state = { count: 0 };
    }
    
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    
    componentWillUnmount() {
        if (this.timerID) {
          clearInterval(this.timerID);
        }
    }
    
    tick() {
        this.setState(prevState => ({
          count: (prevState.count + 1) % 11
        }));
    }
    
  render() {
    return (
      <div>Bai10
        <h1>Counter</h1>
        <h2>{this.state.count}</h2>
      </div>
    )
  }
}
