import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'

export default class ImageInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false
    }
  }

  onClick() {
    this.setState({
      showInfo: !this.state.showInfo
    })
  }

  render() {
    const { image } = this.props
    const info = (
      <div>
        <p><strong>Title</strong>: {image.title}</p>
        <p><strong>Period</strong>: {image.period}</p>
        <p><strong>Medium</strong>: {image.medium}</p>
        <p><strong>Artist</strong>: {image.artist}</p>
      </div>
    )
    return (
      <div>
        <RaisedButton label={'show info'} 
        onClick={this.onClick.bind(this)}/>
        {this.state.showInfo && info}
      </div>
    )
  }
}

ImageInfo.propTypes = {
  image: React.PropTypes.object
}
