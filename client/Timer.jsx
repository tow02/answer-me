import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'

const defaultSeconds = 60

export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: defaultSeconds
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  tick() {
    if (this.state.count > 0) {
      this.setState({ count: (this.state.count - 1) })
    }
  }

  startTimer() {
    clearInterval(this.timer)
    this.timer = setInterval(this.tick.bind(this), 1000)
  }

  pauseTimer() {
    clearInterval(this.timer)
  }

  resetTimer() {
    this.pauseTimer()
    this.setState({
      count: defaultSeconds
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.count} seconds remaining</h1>
        <div>
          <RaisedButton label={'Start'} primary onClick={this.startTimer.bind(this)} />
          &nbsp;
          <RaisedButton label={'Pause'} primary onClick={this.pauseTimer.bind(this)} />
          &nbsp;
          <RaisedButton label={'Reset'} primary onClick={this.resetTimer.bind(this)} />
        </div>
      </div>
    )
  }
}
