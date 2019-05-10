import React from 'react'
import BeatLoader from 'react-spinners/BeatLoader'

class Loader extends React.Component {
  render () {
    const { isLoading } = this.props
    return (
      <React.Fragment>
        <BeatLoader
          loading={isLoading}
          size={30}
          sizeUnit={'px'}
        />
      </React.Fragment>
    )
  }
}

export default Loader
