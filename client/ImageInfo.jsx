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
        <p>Title: {image.title}</p>
        <p>Period: {image.period}</p>
        <p>Medium: {image.medium}</p>
        <p>Artist: {image.artist}</p>
      </div>
    )
    return (
      <div>
        <RaisedButton label={'show info'} onClick={this.onClick.bind(this)}/>
        {this.state.showInfo && info}
      </div>

    )
  }
}

ImageInfo.propTypes = {
  image: React.PropTypes.object
}
