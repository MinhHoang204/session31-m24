import { Component } from 'react'
interface ClockState {
    date: Date;
}

export default class Bai9 extends Component<{}, ClockState> {
    private timerID?: NodeJS.Timeout;

    constructor(props: {}) {
       super(props);
       this.state = { date: new Date() };
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
        this.setState({ date: new Date() });
    }
  render() {
    return (
      <div>Bai9
        <h1>Thoi gian hien tai</h1>
        <h2>{this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}
