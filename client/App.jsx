import { Grid, Row } from 'react-flexbox-grid'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'

import * as api from './api.jsx'
import PictureInfo from './PictureInfo.jsx'

const defaultSeconds = 60;

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      count: defaultSeconds
    }
  }

  componentWillMount() {
    return this.fetchData()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  onStartClick() {
    clearInterval(this.timer)
    this.reFetchData()
    this.timer = setInterval(this.tick.bind(this), 1000)
  }

  startTimer() {
    clearInterval(this.timer)
    this.timer = setInterval(this.tick.bind(this), 1000)
  }

  tick() {
    if (this.state.count > 0) {
      this.setState({ count: (this.state.count - 1) })
    }
  }

  fetchData() {
    return api.getImageObject().then((json) => {
      this.setState({
        data: json,
        count: defaultSeconds
      })
      this.startTimer()
    })
  }

  reFetchData() {
    return api.getImageObject().then((json) => {
      this.setState({
        data: json,
        count: defaultSeconds
      })
    })
  }

  pauseTimer() {
    clearInterval(this.timer)
  }

  render() {
    const { data } = this.state
    const styles = {
      div: {
        position: 'relative',
        width: '25%',
        'padding-bottom': '25%',
        float: 'left',
        height: 0
      },
      img: {
        width: '100%',
        height: '100%',
        position: 'absolute'
      }
    }
    if (data) {
      return (
        <Grid>
          <Row center={'xs'}>
            <div style={styles.div}>
              <img
                src={data.filename}
                role={'presentation'}
                style={styles.img}
              />
            </div>
          </Row>
          <br />
          <Row center={'xs'}>
            <PictureInfo data={data} />
          </Row>
          <Row center={'xs'}>
            <h1>{this.state.count} seconds remaining</h1>
          </Row>
          <Row center={'xs'}>
            <div>
              <RaisedButton label={'Start'} primary onClick={this.onStartClick.bind(this)} />
              &nbsp;
              <RaisedButton label={'Pause'} primary onClick={this.pauseTimer.bind(this)} />
            </div>
          </Row>
        </Grid>
      )
    }
    return (
      <Grid>
        <Row center={'xs'}>
          <CircularProgress size={80} thickness={5} />
        </Row>
      </Grid>
    )
  }
}
