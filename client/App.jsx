import * as _ from 'lodash'
import { Grid, Row } from 'react-flexbox-grid'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'

import KeyHandler, {KEYPRESS, KEYDOWN, KEYUP} from 'react-key-handler';

import * as api from './api.jsx'
import ImageInfo from './ImageInfo.jsx'

const defaultSeconds = 60;

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      images: null,
      image: null,
      count: defaultSeconds,
      progress: 0,
      totalImages: null
    }
  }

  componentWillMount() {
    return this.fetchData()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  nextImage() {
    clearInterval(this.timer)
    const { images } = this.state
    const image = this.randomImages(images)
    this.setState({ image, count: defaultSeconds })
    this.timer = setInterval(this.tick.bind(this), 1000)
    this.state.progress = this.state.progress+1
  }

  onStartClick() {
    this.nextImage()
  }

  startTimer() {
    clearInterval(this.timer)
    this.timer = setInterval(this.tick.bind(this), 1000)
  }

  tick() {
    if (this.state.count > 0) {
      this.setState({ count: (this.state.count - 1) })
    }else{
      this.nextImage()
    }
  }

  randomImages(images) {
    const n = images.length
    var randomNumber = _.random(0, n-1)
    var index = images.indexOf(images[randomNumber])
    console.log("Progress: " + this.state.progress)
    console.log("remaining images: "+n)
    console.log("index: " + randomNumber)
    console.log("===========")
    images.splice(randomNumber,1)
    const image = images[randomNumber]
    return image
  }

  fetchData() {
    return api.getImages().then((json) => {
      const image = this.randomImages(json.images)
      this.setState({
        images: json.images,
        totalImages: json.images.length,
        image: image,
        count: defaultSeconds
      })
      this.startTimer()
      // this.initImagesArray(json.images)
    })
  }

  pauseTimer() {
    clearInterval(this.timer)
  }

  keyHandler(e){
    // console.log(e.key)
    switch (e.key) {
      case "ArrowLeft":
        // Do something for "left arrow" key press.
        break;
      case "ArrowRight":
        this.nextImage()
        // Do something for "right arrow" key press.
        break;
      case "Enter":
        this.nextImage()
        // Do something for "enter" or "return" key press.
        break;
      case " ":
        this.nextImage()
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
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
          <KeyHandler keyEventName={KEYUP} 
          keyValue="ArrowLeft"  
          onKeyHandle={this.keyHandler.bind(this)} />
          <KeyHandler keyEventName={KEYUP} 
          keyValue="ArrowRight"  
          onKeyHandle={this.keyHandler.bind(this)} />
          <KeyHandler keyEventName={KEYUP} 
          keyValue="Enter"  
          onKeyHandle={this.keyHandler.bind(this)} />
          <KeyHandler keyEventName={KEYUP} 
          keyValue=" "  
          onKeyHandle={this.keyHandler.bind(this)} />
          <Row center={'xs'}>
            {/*<div style={styles.div}>*/}
              <h1>{this.state.progress}/{this.state.totalImages}</h1>
            {/*</div>*/}
          </Row>
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
    }else{
      <h1>NO IMAGES</h1>
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
