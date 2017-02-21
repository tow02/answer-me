import * as _ from 'lodash'
import { Grid, Row } from 'react-flexbox-grid'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'

import * as api from './api.jsx'
import ImageInfo from './ImageInfo.jsx'

const defaultSeconds = 60;

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      images: null,
      image: null,
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
    const { images } = this.state
    const image = this.randomImages(images)
    this.setState({ image, count: defaultSeconds })
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

  randomImages(images) {
    const n = images.length
    const randomNumber = _.random(0, n-1)
    const image = images[randomNumber]
    return image
  }

  fetchData() {
    return api.getImages().then((json) => {
      const image = this.randomImages(json.images)
      this.setState({
        images: json.images,
        image: image,
        count: defaultSeconds
      })
      this.startTimer()
    })
  }

  pauseTimer() {
    clearInterval(this.timer)
  }

  render() {
    
    const { image } = this.state
    const styles = {
      div: {
        position: 'relative',
        float: 'left',
        height: 500,
      },
      img: {
        height: '100%',
      }
    }
    if (image) {
      return (
        <Grid>
          <Row center={'xs'}>
            <div style={styles.div}>
              <img
                src={image.filename}
                /*role={'presentation'}*/
                style={styles.img}
              />
            </div>
          </Row>
          <br />
          <Row center={'xs'}>
            <ImageInfo image={image} />
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
