import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'

export default class PictureInfo extends React.Component {
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
    const { data } = this.props
    const info = (
      <div>
        <p>Title: {data.title}</p>
        <p>Period: {data.period}</p>
        <p>Medium: {data.medium}</p>
        <p>Artist: {data.artist}</p>
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

PictureInfo.PropTypes = {
  data: React.PropTypes.object
}
